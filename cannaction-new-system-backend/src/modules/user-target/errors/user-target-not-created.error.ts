import { BaseHttpError } from '@/errors/base-http-error.dto';

export class UserTargetNotCreatedError extends BaseHttpError {
	constructor(reason?: string) {
		super(400, 'error-creating-user-target', `Error creating Shopkeeper Target. ${reason}`);
	}
}
