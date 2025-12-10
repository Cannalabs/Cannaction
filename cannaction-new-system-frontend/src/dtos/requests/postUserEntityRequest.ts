import { UserTypeEnum } from '../../models/enums/userType.enum';

export interface PostUserEntityRequest {
	name: string;
	lastName: string;
	nickname: string;
	email: string;
	languageId: number;
	terms: boolean;
	privacy: boolean;
	countryId: number;
	userCity: string;
	storeId: number;
	userBirthdate: string;
	userTelephone: string;
	password: string;
	confirmPassword: string;
	address: string;
	state: string;
	city: string;
	userType: UserTypeEnum;
}
