import { HttpException, HttpStatus } from '@nestjs/common';

export class ItemClothingSizeError extends HttpException {
	constructor() {
		super(`Size is Mandatory for Clothing Items.`, HttpStatus.BAD_REQUEST);
	}
}
