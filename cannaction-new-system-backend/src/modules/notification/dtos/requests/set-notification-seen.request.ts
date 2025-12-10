import { IsNotEmpty } from "class-validator";

export class SetNotificationSeenRequest {
	@IsNotEmpty()
	userId: number;

	@IsNotEmpty()
	notificationId: number;
}