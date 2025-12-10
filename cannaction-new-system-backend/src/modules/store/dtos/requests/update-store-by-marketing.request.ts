import { IsOptional, IsString } from "class-validator";

export class UpdateStoreByMarketingRequest {
	@IsOptional()
	countryId?: number;

	@IsOptional()
	@IsString()
	storeName?: string;

	@IsOptional()
	stateId?: number;

	@IsOptional()
	cityId?: number;

	@IsOptional()
	@IsString()
	storeAddress?: string;

	@IsOptional()
	@IsString()
	storeContactTelephone?: string;

	@IsOptional()
	@IsString()
	storeContactEmail?: string;

	@IsOptional()
	masterUserId?: number;

	@IsOptional()
	workers: number[];
}