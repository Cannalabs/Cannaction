import { BaseHttpError } from '@/errors/base-http-error.dto';

export class StoreTargetNotCreatedError extends BaseHttpError {
	constructor(message?: string) {
		super(401, 'error-creating-store', `Error creating Store Target. ${message || ''}`);
	}
}
