import { PaginationFilterDto } from '@/modules/database/pagination/pagination-filter';
import { IsOptional, IsString } from 'class-validator';

export class FilterStoreListDto extends PaginationFilterDto {
	@IsOptional()
	active?: boolean;

	@IsOptional()
	@IsString()
	search?: string;

	@IsOptional()
	countryId?: number;

	@IsOptional()
	storeId?: number;

	@IsOptional()
	stateId?: number;

	@IsOptional()
	cityId?: number;
}
