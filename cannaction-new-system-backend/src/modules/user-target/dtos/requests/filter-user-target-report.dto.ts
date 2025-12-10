import { IsOptional, IsString } from 'class-validator';

export class FilterUserTargetReportDto {
	@IsOptional()
	countryId?: number;

	@IsOptional()
	storeId?: number;

	@IsString()
	@IsOptional()
	searchNotConcluded?: string;

	@IsString()
	@IsOptional()
	searchConcluded?: string;
}
