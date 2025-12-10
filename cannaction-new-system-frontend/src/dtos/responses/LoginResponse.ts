import { UserTypeEnum } from '../../models/enums/userType.enum';

export default interface LoginResponse {
	accessToken: string;
	userType: UserTypeEnum;
	userId: string;
	userCountry: string;
	userLanguage: string;
}
