import { useTranslation } from 'react-i18next';
import env from '../config/env';

export const getBaseUrl = () => {
	return env.VITE_APP_BASE_URL;
};

export const getRandomColor = () => {
	const chars = '0123456789'.split('');
	let color = '#';
	for (let i = 0; i < 6; i++) {
		const randomChar = Math.floor(Math.random() * chars.length);
		color += chars[randomChar];
	}
	return color;
};

export const formatDate = (date?: string) => {
	if (!date) return '---';
	const cleanDate = date.split('T')[0];
	return cleanDate.replace(/-/g, '/');
};

export const getCurrentYear = () => {
	return new Date().getFullYear();
};

export const usePasswordValidator = () => {
	const { t } = useTranslation();
	const validatePasswordStrenght = (password: string) => {
		const errors: string[] = [];
		if (!/[A-Z]/.test(password)) {
			errors.push(t('passwordValidation.upperCase'));
		}
		if (!/[a-z]/.test(password)) {
			errors.push(t('passwordValidation.lowerCase'));
		}
		if (!/[0-9]/.test(password)) {
			errors.push(t('passwordValidation.numbers'));
		}
		if (!/[^a-zA-Z0-9]/.test(password)) {
			errors.push(t('passwordValidation.specialCharacters'));
		}
		if (password.length < 6) {
			errors.push(t('passwordValidation.length'));
		}
		return errors.length > 0
			? `${t('passwordValidation.shouldContain')} ${errors.join(', ')}`
			: null;
	};

	const validateEmail = (email: string) => {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if (!emailRegex.test(email)) {
			return t('passwordValidation.validEmail');
		}
		return null;
	}

	return { validatePasswordStrenght, validateEmail };
};
