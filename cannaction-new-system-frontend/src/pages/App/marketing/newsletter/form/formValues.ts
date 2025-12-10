import { NewsletterUserType } from '../../../../../models/enums/NewsletterUserType.enum';

export interface FormValues {
	id: number | undefined;
	title: string;
	body: string;
	footer: string;
	userType: NewsletterUserType | undefined;
	countryId: number | undefined;
	storeIds: number[];
}
