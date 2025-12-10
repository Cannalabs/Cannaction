import { BaseHttpError } from '@/errors/base-http-error.dto';
import { HttpStatus } from '@nestjs/common';

export class UserNotFoundError extends BaseHttpError {
	constructor() {
		super(HttpStatus.NOT_FOUND, `user-not-found`, `User not found.`);
	}
}
