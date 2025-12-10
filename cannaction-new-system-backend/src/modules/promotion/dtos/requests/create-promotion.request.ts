import { IsNotEmpty } from "class-validator";

export class PromotionCreateRequest {
	@IsNotEmpty({ message: 'Promotion name is mandatory.' })
	name: string;

	@IsNotEmpty({ message: 'Email text is mandatory.' })
	emailText: string;

	@IsNotEmpty({ message: 'Coupon amount is mandatory' })
	maxCoupons: number;

	@IsNotEmpty({ message: 'Country is mandatory' })
	countryId: number;

	@IsNotEmpty({ message: 'Promotion start date is mandatory' })
	beginDate: string;

	@IsNotEmpty({ message: 'Promotion end date is mandatory' })
	finalDate: string;

	@IsNotEmpty({ message: 'Promotion item is mandatory' })
	itemId: number;

	storeIds: number[];
}
