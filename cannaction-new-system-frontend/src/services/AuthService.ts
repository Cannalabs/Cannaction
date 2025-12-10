import ForgotPasswordRequest from '../dtos/requests/ForgotPasswordRequest';
import LoginRequest from '../dtos/requests/LoginRequest';
import LoginResponse from '../dtos/responses/LoginResponse';
import { getBasicAuth } from '../utils/auth';
import { api } from '../utils/axios';

export default class AuthService {
	public static async login(body: LoginRequest) {
		return api
			.post<LoginResponse>('auth', body, {
				headers: {
					Authorization: getBasicAuth(),
				},
			})
			.then((response) => response.data);
	}

	public static async forgotPassword(body: ForgotPasswordRequest) {
		await api.post('auth/forgot-password', body, {
			headers: {
				Authorization: getBasicAuth(),
			},
		});
	}
}
