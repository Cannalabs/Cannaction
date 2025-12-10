import { UserType } from '@/modules/user/enums/user-type.enum';

export class LoginResponse {
	accessToken: string;
	userType: UserType;
	userId: string;
	userCountry: string;
	userLanguage: string;
}
