import { IsOptional } from "class-validator";

export class PromotionUpdateRequest {
	@IsOptional()
	name?: string;

	@IsOptional()
	emailText?: string;

	@IsOptional()
	maxCoupons?: number;

	@IsOptional()
	countryId?: number;

	@IsOptional()
	beginDate?: string;

	@IsOptional()
	finalDate?: string;

	@IsOptional()
	itemId?: number;

	@IsOptional()
	storeIds?: number[];
}
