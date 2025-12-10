import { IsNotEmpty } from "class-validator";

export class CreateCouponForExchangeRequest {
	@IsNotEmpty({ message: 'Item is mandatory for coupon generation.' })
	itemId: number;

	@IsNotEmpty({ message: 'Item amount is mandatory.' })
	amount: number;
}
