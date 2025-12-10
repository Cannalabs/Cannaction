import { BaseHttpError } from '@/errors/base-http-error.dto';

export class SaleNotFoundError extends BaseHttpError {
	constructor() {
		super(404, 'sale-not-found', `Sale not Found.`);
	}
}
