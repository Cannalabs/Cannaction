import { NewsletterUserType } from "../../models/enums/NewsletterUserType.enum";

export interface UpdateNewsletterRequest {	
    title?: string;
	body?: string;
	footer?: string;
	countryId?: number;
	userType?: NewsletterUserType;
	storeIds?: number[];
}