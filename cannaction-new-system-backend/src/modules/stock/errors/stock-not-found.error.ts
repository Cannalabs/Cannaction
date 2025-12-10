import { BaseHttpError } from '@/errors/base-http-error.dto';

export class StockNotFoundError extends BaseHttpError {
	constructor() {
		super(404, 'stock-not-found', `Stock register not found.`);
	}
}