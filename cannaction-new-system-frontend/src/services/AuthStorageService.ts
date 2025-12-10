import env from '../config/env';
import Cookies from 'js-cookie';
import { DateTime } from 'luxon';
import { UserTypeEnum } from '../models/enums/userType.enum';
import { AuthKeys } from '../contexts/Auth/models/AuthKeys';

export default class AuthStorageService {
	public static setTokenCookie(token: string, expires: number) {
		Cookies.set(AuthKeys.APP_TOKEN, token, {
			secure: env.MODE === 'production',
			sameSite: 'strict',
			path: '/',
			// domain: env.VITE_COOKIE_DOMAIN,
			expires: DateTime.now().plus({ seconds: expires }).toJSDate(),
		});
	}

	public static getTokenCookie(): string | null {
		return Cookies.get(AuthKeys.APP_TOKEN) ?? null;
	}

	public static removeTokenCookie() {
		Cookies.remove(AuthKeys.APP_TOKEN);
	}

	public static setUserTypeCookie(userType: UserTypeEnum, expires: number) {
		Cookies.set(AuthKeys.USER_TYPE, userType, {
			secure: env.MODE === 'production',
			sameSite: 'strict',
			path: '/',
			// domain: env.VITE_COOKIE_DOMAIN,
			expires: DateTime.now().plus({ seconds: expires }).toJSDate(),
		});
	}

	public static getUserTypeCookie() {
		return Cookies.get(AuthKeys.USER_TYPE) ?? null;
	}

	public static removeUserTypeCookie() {
		Cookies.remove(AuthKeys.USER_TYPE);
	}

	public static getUserCountryCookie() {
		return Cookies.get(AuthKeys.USER_COUNTRY) ?? undefined;
	}

	// userData
	static setTokenSessionStorage(token: string) {
		sessionStorage.setItem(AuthKeys.APP_TOKEN, token);
	}

	static setUserIdSessionStorage(userId: string) {
		sessionStorage.setItem(AuthKeys.USER_ID, userId);
	}

	static setUserTypeSessionStorage(userType: string) {
		sessionStorage.setItem(AuthKeys.USER_TYPE, userType);
	}

	static setUserCountrySessionStorage(userCountry: string) {
		sessionStorage.setItem(AuthKeys.USER_COUNTRY, userCountry);
	}

	static setUserLanguageSessionStorage(userLanguage: string) {
		sessionStorage.setItem(AuthKeys.USER_LANGUAGE, userLanguage);
	}

	static getStoredToken(): string | null {
		return sessionStorage.getItem(AuthKeys.APP_TOKEN);
	}

	static getUserType(): string | null {
		return sessionStorage.getItem(AuthKeys.USER_TYPE);
	}

	static getUserId(): string | null {
		return sessionStorage.getItem(AuthKeys.USER_ID);
	}

	static getUserCountry(): string | null {
		return sessionStorage.getItem(AuthKeys.USER_COUNTRY);
	}
}
