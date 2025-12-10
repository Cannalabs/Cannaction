import { Catch, RpcExceptionFilter } from '@nestjs/common';
import { throwError } from 'rxjs';
import { ErrorDto } from './error.dto';

@Catch()
export class InternalExceptionFilter implements RpcExceptionFilter {
	catch(exception: Error) {
		return throwError(
			() =>
				new ErrorDto({
					status: 500,
					code: exception.name,
					message: exception.message,
					data: exception.stack,
				})
		);
	}
}
