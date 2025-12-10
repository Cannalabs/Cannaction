import { IsNotEmpty } from "class-validator";

export class CreateCouponForPromotionRequest {
	@IsNotEmpty({ message: 'Promotion is mandatory for coupon generation.' })
	promotionId: number;
}
