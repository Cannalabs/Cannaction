import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserType } from '../../enums/user-type.enum';

export class UpdateUserByMarketingRequest {
	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	lastName?: string;

	@IsOptional()
	email?: string;

	@IsOptional()
	nickname?: string;

	@IsOptional()
	@IsEnum(UserType)
	userType?: UserType;

	@IsOptional()
	storeId?: number;

	@IsOptional()
	countryId?: number;

	@IsOptional()
	newsletter?: boolean;

	@IsOptional()
	password?: string;
}
