import { HttpException, HttpStatus } from '@nestjs/common';

export class PromotionNotFoundError extends HttpException {
	constructor() {
		super(`Promotion not found.`, HttpStatus.NOT_FOUND);
	}
}
