import { IsOptional, IsString } from 'class-validator';

export class FindCouponsForMarketingRequest {
	@IsOptional()
	@IsString()
	search?: string;

	@IsOptional()
	countryId?: number;

	@IsOptional()
	storeId?: number;

	@IsOptional()
	itemId?: number;

	@IsOptional()
	@IsString()
	dateBegin?: string;

	@IsOptional()
	@IsString()
	dateEnd?: string;
}
