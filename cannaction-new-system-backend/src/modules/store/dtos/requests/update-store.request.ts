import { IsOptional } from 'class-validator';

export class UpdateStoreRequest {
	@IsOptional()
	name?: string;

	@IsOptional()
	countryId?: number;

	@IsOptional()
	stateId?: number;

	@IsOptional()
	cityId?: number;

	@IsOptional()
	address?: string;

	@IsOptional()
	contactTelephone?: string;

	@IsOptional()
	contactEmail?: string;

	@IsOptional()
	slug?: string;

	@IsOptional()
	logo?: string;
}
