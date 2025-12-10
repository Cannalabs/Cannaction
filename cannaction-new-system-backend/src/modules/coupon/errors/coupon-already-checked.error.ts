import { BaseHttpError } from '@/errors/base-http-error.dto';
import { HttpStatus } from '@nestjs/common';

export class CouponAlreadyCheckedError extends BaseHttpError {
	constructor() {
		super(HttpStatus.BAD_REQUEST, 'coupon-checked', 'Coupon alredy checked.',);
	}
}
