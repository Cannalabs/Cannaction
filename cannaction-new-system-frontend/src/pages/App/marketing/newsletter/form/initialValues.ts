import { NewsletterUserType } from '../../../../../models/enums/NewsletterUserType.enum';
import { FormValues } from './formValues';

export const initialValues: FormValues = {
	id: undefined,
	title: '',
	body: '',
	footer: 'All Rights Reserved.',
	userType: NewsletterUserType.ALL,
	countryId: undefined,
	storeIds: []
};
