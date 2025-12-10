import { IsOptional } from 'class-validator';
import { UserType } from '../../enums/user-type.enum';

export class UserUpdateRequest {
	@IsOptional()
	name?: string;

	@IsOptional()
	lastName?: string;

	@IsOptional()
	email?: string;

	@IsOptional()
	nickname?: string;

	@IsOptional()
	telephone?: string;

	@IsOptional()
	birthdate?: string;

	@IsOptional()
	userType?: UserType;

	@IsOptional()
	languageId?: number;

	@IsOptional()
	storeId?: number;

	@IsOptional()
	countryId?: number;

	@IsOptional()
	storeName?: string;

	@IsOptional()
	stateId?: number;

	@IsOptional()
	cityId?: number;

	@IsOptional()
	storeAddress?: string;

	@IsOptional()
	storeContactTelephone?: string;

	@IsOptional()
	storeContactEmail?: string;

	@IsOptional()
	newsletter?: boolean;

}
