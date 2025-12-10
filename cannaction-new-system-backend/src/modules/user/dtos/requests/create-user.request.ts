import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserType } from '../../enums/user-type.enum';

export class UserCreateRequest {
	@IsNotEmpty({ message: 'Name is mandatory.' })
	@IsString()
	name: string;

	@IsNotEmpty({ message: 'Last name is mandatory.' })
	lastName: string;

	@IsNotEmpty({ message: 'Email is mandatory.' })
	email: string;

	@IsNotEmpty({ message: 'Nickname is mandatory.' })
	nickname: string;

	@IsNotEmpty({ message: 'Password is mandatory.' })
	password: string;

	@IsOptional()
	telephone?: string;

	@IsOptional()
	birthdate?: string;

	@IsNotEmpty({ message: 'User Type is mandatory.' })
	@IsEnum(UserType)
	userType: UserType;

	@IsNotEmpty({ message: 'Language is mandatory.' })
	languageId: number;

	@IsOptional()
	storeId?: number;

	@IsNotEmpty({ message: 'Country is mandatory.' })
	countryId: number;

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
