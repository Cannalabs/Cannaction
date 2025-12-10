import { HttpException, HttpStatus } from '@nestjs/common';

export class CouponNotFoundError extends HttpException {
	constructor() {
		super(`Coupon not found.`, HttpStatus.NOT_FOUND);
	}
}
