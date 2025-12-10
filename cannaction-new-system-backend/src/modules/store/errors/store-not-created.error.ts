import { BaseHttpError } from '@/errors/base-http-error.dto';

export class StoreNotCreatedError extends BaseHttpError {
	constructor(error: string) {
		super(400, 'store-not-created', `Error creating Store. Reason: ${error}`);
	}
}
