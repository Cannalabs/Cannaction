import { HttpException, HttpStatus } from '@nestjs/common';

export class ItemNotFoundError extends HttpException {
	constructor() {
		super(`Item not found.`, HttpStatus.NOT_FOUND);
	}
}
