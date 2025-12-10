import { IsNotEmpty } from "class-validator";
import { NotificationUserType } from "../../enums/notification-type.enum";

export class NotificationCreateRequest {
	@IsNotEmpty({ message: 'Notification title is mandatory.' })
	title: string;

	@IsNotEmpty({ message: 'Notification body text is mandatory.' })
	body: string;

	@IsNotEmpty({ message: 'Country is mandatory.' })
	countryId: number;

	@IsNotEmpty({ message: 'Notification user type is mandatory.' })
	userType: NotificationUserType;

	@IsNotEmpty({ message: 'Notification status is mandatory.' })
	active: boolean;
}
