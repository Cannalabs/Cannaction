import env from '../config/env';
import AuthStorageService from '../services/AuthStorageService';
import { queryClient } from './query';

export const getBasicAuth = (): string => {
	return `Basic ${env.VITE_APP_BASIC_TOKEN}`;
};

export const getJWTAuthHeader = () => {
	const token = sessionStorage.getItem('accessToken');
	const userCountry = sessionStorage.getItem('userCountry');
	const userId = sessionStorage.getItem('userId');
	const userType = sessionStorage.getItem('userType');
	return {
		Authorization: token ? `Bearer ${token}` : '',
		userid: userId,
		usertype: userType,
		userCountry: userCountry,
	};
};

export const clearLoggedUser = () => {
	const currentLanguage = localStorage.getItem('i18nextLng');
	sessionStorage.clear();
	localStorage.clear();
	if (currentLanguage) {
		localStorage.setItem('i18nextLng', currentLanguage);
	}
	queryClient.clear();
	AuthStorageService.removeTokenCookie();
	AuthStorageService.removeUserTypeCookie();
};
