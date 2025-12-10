import { IsOptional } from 'class-validator';
import { NotificationUserType } from '../../enums/notification-type.enum';

export class UpdateNotificationRequest {
	@IsOptional()
	title?: string;

	@IsOptional()
	body?: string;

	@IsOptional()
	countryId?: number;

	@IsOptional()
	userType?: NotificationUserType;

	@IsOptional()
	active?: boolean;
}
