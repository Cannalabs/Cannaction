import { config } from 'dotenv';
import { z } from 'zod';

config({
	path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const envSchema = z.object({
	NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
	PORT: z.coerce.number().default(3001),
	ORIGIN: z.string().default('http://localhost:3000/'),
	DB_HOST: z.string().optional(),
	DB_PORT: z.coerce.number().default(5432),
	DB_USERNAME: z.string().optional(),
	DB_PASSWORD: z.string().optional(),
	DB_DATABASE: z.string().optional(),
	JWT_SECRET: z.string(),
	BASIC_USER: z.string(),
	BASIC_PASS: z.string(),
	MAIL_HOST: z.string(),
	MAIL_PORT: z.string(),
	MAIL_USER: z.string(),
	MAIL_PASSWORD: z.string(),
	S3_BUCKET: z.string(),
	IAM_USER_KEY: z.string(),
	IAM_USER_SECRET: z.string(),
});

const envTestSchema = z.object({
	NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
	PORT: z.coerce.number().default(3001),
	ORIGIN: z.string().default('http://localhost:3000/'),
	DB_HOST: z.string().optional(),
	DB_PORT: z.coerce.number().default(5432),
	DB_USERNAME: z.string().optional(),
	DB_PASSWORD: z.string().optional(),
	DB_DATABASE: z.string().optional(),
	JWT_SECRET: z.string(),
	BASIC_USER: z.string(),
	BASIC_PASS: z.string(),
	MAIL_HOST: z.string(),
	MAIL_PORT: z.string(),
	MAIL_USER: z.string(),
	MAIL_PASSWORD: z.string(),
	S3_BUCKET: z.string(),
	IAM_USER_KEY: z.string(),
	IAM_USER_SECRET: z.string(),
});

const getEnv = () => {
	if (process.env.NODE_ENV === 'test') return envTestSchema.parse(process.env);
	return envSchema.parse(process.env);
};

const env = getEnv();

export default env;
