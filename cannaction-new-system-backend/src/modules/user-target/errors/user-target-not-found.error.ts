import { BaseHttpError } from '@/errors/base-http-error.dto';

export class UserTargetNotFoundError extends BaseHttpError {
	constructor() {
		super(404, 'user-target-not-found', `Shopkeeper Target Not Found.`);
	}
}
