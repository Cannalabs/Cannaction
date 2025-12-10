import { UserTypeEnum } from '../enums/userType.enum';
import { CityEntity } from './CityEntity';
import CountryEntity from './CountryEntity';
import { LanguageEntity } from './LanguageEntity';
import { StateEntity } from './StateEntity';
import { StoreEntity } from './StoreEntity';

export default interface UserEntity {
	id: number;
	name: string;
	code: string;
	profilePic?: string;
	lastName: string;
	nickname: string;
	email: string;
	language: LanguageEntity;
	terms: boolean;
	privacy: boolean;
	country: CountryEntity;
	gender?: string;
	points: number;
	store?: StoreEntity;
	birthdate: string;
	userTelephone: string;
	password: string;
	confirmPassword: string;
	address: string;
	state: StateEntity;
	city: CityEntity;
	userType: UserTypeEnum;
	createdAt: string;
	updatedAt: string;
	lastInteractionDate: string;
	active: boolean;
	newsletter: boolean;
}
