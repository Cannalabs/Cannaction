import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { BaseHttpError } from './base-http-error.dto';
import { ErrorDto } from './error.dto';

@Catch(BaseHttpError)
export class BaseHttpExceptionFilter implements ExceptionFilter {
	constructor() {}

	catch(exception: BaseHttpError, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<FastifyReply>();

		response.status(exception.getStatus()).send(
			new ErrorDto({
				code: exception.code,
				message: exception.message,
				data: exception.data,
			})
		);
	}
}
