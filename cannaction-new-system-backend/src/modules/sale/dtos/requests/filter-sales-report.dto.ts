import { IsOptional, IsString } from 'class-validator';

export class FilterSalesReportDto {
	@IsOptional()
	itemId?: number;

	@IsOptional()
	@IsString()
	search?: string;

	@IsOptional()
	storeId?: number;

	@IsString()
	@IsOptional()
	countryId?: string;

	@IsString()
	@IsOptional()
	dateBegin?: string;

	@IsString()
	@IsOptional()
	dateEnd?: string;
}
