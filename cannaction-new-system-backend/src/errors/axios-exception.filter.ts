import { Catch, RpcExceptionFilter } from '@nestjs/common';
import { throwError } from 'rxjs';
import AxiosError from './axios.error';
import { ErrorDto } from './error.dto';

@Catch(AxiosError)
export class AxiosExceptionFilter implements RpcExceptionFilter {
	catch(exception: AxiosError) {
		return throwError(
			() =>
				new ErrorDto({
					status: exception.status,
					code: exception.name,
					message: exception.message,
					data: exception.data,
				})
		);
	}
}
