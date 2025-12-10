import { NotificationUserType } from '../enums/NotificationUserTypeEnum';
import CountryEntity from './CountryEntity';
import { UserNotificationEntity } from './UserNotificationEntity';

export default interface NotificationEntity {
	id: number;
	title: string;
	body: string;
	userType: NotificationUserType;
	country: CountryEntity;
	userNotifications: UserNotificationEntity[];
	active: boolean;
	createdAt: string;
	updatedAt: string;
}
