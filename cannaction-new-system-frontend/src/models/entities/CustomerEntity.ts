import { UserTypeEnum } from '../enums/userType.enum';

export default interface CustomerEntity {
	name: string;
	lastName: string;
	nickname: string;
	email: string;
	password: string;
	userType: UserTypeEnum;
}
