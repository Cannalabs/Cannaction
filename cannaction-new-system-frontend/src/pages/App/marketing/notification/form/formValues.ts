import { NotificationUserType } from '../../../../../models/enums/NotificationUserTypeEnum';

export interface FormValues {
	id: number | undefined;
	title: string;
	body: string;
	countryId: number | undefined;
	userType: NotificationUserType | undefined;
}
