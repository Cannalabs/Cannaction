import { BaseHttpError } from '@/errors/base-http-error.dto';
import { HttpStatus } from '@nestjs/common';

export class CouponNotCreatedError extends BaseHttpError {
	constructor(error: string) {
		super(HttpStatus.BAD_REQUEST, 'coupon-not-created', `Error creating Coupon. Reason: ${error}`,);
	}
}
