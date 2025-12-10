import { IsOptional, IsString } from 'class-validator';

export class FilterUsersDto {
	@IsOptional()
	@IsString()
	search?: string;

	@IsOptional()
	countryId?: number;

	@IsOptional()
	stateId?: number;

	@IsOptional()
	cityId?: number;

	@IsOptional()
	storeId?: number;
}
