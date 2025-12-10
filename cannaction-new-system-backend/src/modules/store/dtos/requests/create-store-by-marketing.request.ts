import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateStoreByMarketingRequest {
	@IsNotEmpty({ message: 'Country is required.' })
	countryId: number;

	@IsNotEmpty({ message: 'Store name is required.' })
	@IsString()
	storeName: string;

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
	workers?: number[];

}