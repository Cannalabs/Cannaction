import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { NewsletterUserType } from '../../enums/newsletter-user-type.enum';

export class UpdateNewsletterRequest {
	@ApiPropertyOptional()
	title?: string;

	@ApiPropertyOptional()
	body?: string;

	@ApiPropertyOptional()
	footer?: string;

	@ApiPropertyOptional()
	published?: boolean;

	@ApiPropertyOptional()
	countryId?: number;

	@ApiPropertyOptional()
	@IsEnum(NewsletterUserType)
	userType?: NewsletterUserType;

	@ApiPropertyOptional()
	storeIds?: number[];
}
