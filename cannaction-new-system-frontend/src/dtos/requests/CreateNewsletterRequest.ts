import { NewsletterUserType } from "../../models/enums/NewsletterUserType.enum";

export interface CreateNewsletterRequest {	
    title: string;
	body: string;
	footer: string;
	countryId: number;
	userType: NewsletterUserType;
	storeIds?: number[];
}
