import NotificationEntity from "./NotificationEntity";
import UserEntity from "./UserEntity";

export interface UserNotificationEntity {	id: number;
	user: UserEntity;
	notification: NotificationEntity;
	seen: boolean;
	createdAt: string;
	updatedAt: string;
}