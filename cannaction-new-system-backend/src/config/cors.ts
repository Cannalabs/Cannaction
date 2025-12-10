import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import env from './env';

const getOrigin = () => env.ORIGIN.split(',').map((origin) => origin.trim());

const getAllowedMethods = () => [
	'GET',
	'POST',
	'PUT',
	'PATCH',
	'DELETE',
	'HEAD',
];

const getExposedHeaders = () => ['x-auto-logout'];

const getAllowedHeaders = () => [
	'x-auto-logout',
	'Authorization',
	'Content-Type',
	'Content-Length',
	'Access-Control-Allow-Origin',
	'Accept',
	'Accept-Encoding',
	'Referer',
	'User-Agent',
	'Connection',
	'Cache-Control',
	'X-Requested-With',
	'X-Forwarded-For',
	'X-Remote-Addr',
	'X-Real-IP',
	'X-Tenant',
	'X-Totem',
	'userCountry',
	'userType',
	'userId'
];

export const getCorsSocketConfig = () => {
	return {
		origin: getOrigin(),
		methods: getAllowedMethods(),
		exposedHeaders: getExposedHeaders(),
		allowedHeaders: getAllowedHeaders(),
		credentials: true,
		optionsSuccessStatus: 204,
	};
};

export const getCorsConfig = (): CorsOptions => {
	return {
		origin: getOrigin(),
		methods: getAllowedMethods(),
		exposedHeaders: getExposedHeaders(),
		allowedHeaders: getAllowedHeaders(),
		credentials: true,
		optionsSuccessStatus: 204,
	};
};
