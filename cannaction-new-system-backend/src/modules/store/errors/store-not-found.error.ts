import { BaseHttpError } from '@/errors/base-http-error.dto';
import { HttpStatus } from '@nestjs/common';

export class StoreNotFoundError extends BaseHttpError {
	constructor() {
		super(HttpStatus.NOT_FOUND, 'store-not-found', `Store not found.`);
	}
}
