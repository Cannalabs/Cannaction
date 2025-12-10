import { NotificationUserType } from '../../../../../models/enums/NotificationUserTypeEnum';
import { FormValues } from './formValues';

export const initialValues: FormValues = {
	id: undefined,
	title: '',
	body: '',
	userType: NotificationUserType.ALL,
	countryId: undefined,
};
