import { UserTypeEnum } from '../../../../../models/enums/userType.enum';

export default interface FormValues {
	id: number | undefined;
	name: string;
	lastName: string;
	nickname: string;
	email: string;
	storeId?: number | undefined;
	countryId: number | undefined;
	role: UserTypeEnum;
	newsLetter: boolean;
	profilePic: string;
	password: string;
}
