import { IsString } from 'class-validator';

export class FilterNotificationReportDto {
	@IsString()
	search?: string;
}
