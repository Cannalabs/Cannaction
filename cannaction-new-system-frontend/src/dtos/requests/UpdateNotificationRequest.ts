import { NotificationUserType } from "../../models/enums/NotificationUserTypeEnum";

export interface UpdateNotificationRequest {	
    title?: string;
	body?: string;
	countryId?: number;
	userType?: NotificationUserType;
    active?: boolean;
}
