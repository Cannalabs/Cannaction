import { IsOptional, IsString } from 'class-validator';

export class FilterPromotionReportDto {
	@IsOptional()
	@IsString()
	search?: string;

	@IsOptional()
	storeId?: number;
}
