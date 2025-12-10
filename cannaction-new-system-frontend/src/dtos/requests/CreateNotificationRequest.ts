import { NotificationUserType } from "../../models/enums/NotificationUserTypeEnum";

export interface CreateNotificationRequest {	
    title: string;
	body: string;
	countryId: number;
	userType: NotificationUserType;
    active: boolean;
}
