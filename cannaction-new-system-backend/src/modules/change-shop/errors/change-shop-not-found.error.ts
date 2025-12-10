import { BaseHttpError } from '@/errors/base-http-error.dto';

export class ChangeShopNotFoundError extends BaseHttpError {
	constructor() {
		super(404, 'change-shop-not-found', `Request to change shop not found..`);
	}
}