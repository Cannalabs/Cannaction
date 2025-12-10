import axios, { AxiosInstance } from 'axios';
import qs from 'qs';
import { getBaseUrl } from './string';
import AuthStorageService from '../services/AuthStorageService';
import { CannError, ECONNREFUSEDError, ERR_NETWORKError } from '../errors';

const configClient = (axiosClient: AxiosInstance): AxiosInstance => {
	axiosClient.interceptors.response.use(
		(response) => {
			try {
				const newAccessToken = response.headers['x-new-access-token'];
				const newExpires = parseInt(response.headers['x-new-expires']);
				if (newAccessToken) {
					AuthStorageService.setTokenCookie(newAccessToken, newExpires);
				}
			} catch (e: unknown) {
				console.error(e);
			}
			return response;
		},
		(error) => {
			// if (error.response?.status === 401) {
			// 	clearLoggedUser();
			// }
			if (!error.isAxiosError || !error.response?.data?.code) throw error;
			if (error.response.data.code === 'ECONNREFUSED')
				throw new ECONNREFUSEDError();
			if (error.response.data.code === 'ERR_NETWORK') throw new ERR_NETWORKError();

			const getMessage = (): string => {
				const { response } = error;
				if (response.data.data?.message) {
					if (
						Array.isArray(response.data.data.message) &&
						response.data.data.message.length > 0
					)
						return response.data.data.message[0];
					return response.data.data.message;
				}
				return response.data.message || error.message;
			};

			throw new CannError(
				error.response.status,
				error.response.data.code,
				getMessage(),
				error.response.data.data
			);
		}
	);
	return axiosClient;
};

export const api = configClient(
	axios.create({
		baseURL: getBaseUrl(),
		headers: {
			'Content-Type': 'application/json',
		},
		withCredentials: true,
		paramsSerializer: {
			serialize: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
		},
	})
);
