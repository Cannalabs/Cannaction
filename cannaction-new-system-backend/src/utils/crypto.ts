import { compare as bCompare, hash as bHash } from 'bcrypt';
import { generate } from 'generate-password';

const SALT_ROUNDS = 10;

export const testPassword = (password: string) =>
	/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(password);

export const generatePassword = () =>
	generate({
		numbers: true,
		lowercase: true,
		uppercase: true,
		length: 8,
		symbols: true,
	});

export const generateUserCode = () =>
	generate({
		numbers: true,
		lowercase: false,
		uppercase: false,
		symbols: false,
		length: 6,
	});

export const generateTemporaryPassword = () =>
	generate({
		numbers: true,
		lowercase: true,
		uppercase: true,
		symbols: false,
		length: 8,
	});

export const generatePromotionCoupon = () =>
	generate({
		numbers: true,
		lowercase: false,
		uppercase: true,
		symbols: false,
		length: 8,
	});

export const hash = (plain: string) => bHash(plain, SALT_ROUNDS);

export const compare = (plain: string, encrypted: string) =>
	bCompare(plain, encrypted);
