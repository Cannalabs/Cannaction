import { BaseHttpError } from '@/errors/base-http-error.dto';

export class StoreTargetNotFoundError extends BaseHttpError {
	constructor() {
		super(404, 'store-target-not-found', `Store Target not found.`);
	}
}
