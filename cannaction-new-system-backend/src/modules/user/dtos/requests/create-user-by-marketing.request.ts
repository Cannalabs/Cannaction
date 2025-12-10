import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserType } from '../../enums/user-type.enum';

export class UserCreateByMarketingRequest {
	@IsNotEmpty({ message: 'Name is mandatory.' })
	@IsString()
	name: string;

	@IsNotEmpty({ message: 'Last name is mandatory.' })
	lastName: string;

	@IsNotEmpty({ message: 'Email is mandatory.' })
	email: string;

	@IsNotEmpty({ message: 'Nickname is mandatory.' })
	nickname: string;

	@IsNotEmpty({ message: 'User Type is mandatory.' })
	@IsEnum(UserType)
	userType: UserType;

	@IsOptional()
	storeId?: number;

	@IsNotEmpty({ message: 'Country is mandatory.' })
	countryId?: number;

	@IsOptional()
	newsletter?: boolean;

	@IsOptional()
	password?: string;
}
