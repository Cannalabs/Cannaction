import { IsOptional, IsString } from 'class-validator';

export class SearchCouponsForRedeemedItemsRequest {
	@IsOptional()
	@IsString()
	search?: string;

	@IsOptional()
	@IsString()
	searchNotChecked?: string;
}
