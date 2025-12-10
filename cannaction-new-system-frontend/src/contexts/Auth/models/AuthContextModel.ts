import LoginRequest from '../../../dtos/requests/LoginRequest';
import { UserTypeEnum } from '../../../models/enums/userType.enum';

export type Permission = string | RegExp | (string | RegExp)[];

export default interface AuthContextModel {
	signed: boolean;
	login: (request: LoginRequest) => Promise<void>;
	logout: () => void;
	userTypeLogged?: UserTypeEnum;
	userLoggedId?: string;
	userCountry?: number;
	setLanguage: (c: string) => void;
}
