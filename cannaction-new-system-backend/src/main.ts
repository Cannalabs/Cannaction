import multipart from '@fastify/multipart';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
	FastifyAdapter,
	NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { getCorsConfig } from './config/cors';
import env from './config/env';
import { AxiosExceptionFilter } from './errors/axios-exception.filter';
import { BaseHttpExceptionFilter } from './errors/base-http-exception.filter';
import { InternalExceptionFilter } from './errors/internal-exception.filter';

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter({ trustProxy: false }),
		{
			cors: getCorsConfig(),
			snapshot: env.NODE_ENV !== 'production',
		}
	);

	app.setGlobalPrefix('api');
	app.useGlobalFilters(new InternalExceptionFilter());
	app.useGlobalFilters(new AxiosExceptionFilter());
	app.useGlobalFilters(new BaseHttpExceptionFilter());
	app.useGlobalPipes(new ValidationPipe({ transform: true }));
	await app.register(multipart);

	const address = await app.listen(env.PORT, '0.0.0.0');
	Logger.log(`Server listening on ${address}`);
}
bootstrap();
