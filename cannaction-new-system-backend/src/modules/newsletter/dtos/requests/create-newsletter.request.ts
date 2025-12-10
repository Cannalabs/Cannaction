import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { NewsletterUserType } from '../../enums/newsletter-user-type.enum';

export class CreateNewsletterRequest {
	@IsNotEmpty({ message: 'Title is mandatory.' })
	title: string;

	@IsNotEmpty({ message: 'Body is mandatory.' })
	body: string;

	@IsNotEmpty({ message: 'Footer is mandatory.' })
	footer: string;

	@IsNotEmpty({ message: 'Country is mandatory.' })
	countryId: number;

	@IsNotEmpty({ message: 'User Type is mandatory.' })
	@IsEnum(NewsletterUserType)
	userType: NewsletterUserType;

	@ApiPropertyOptional()
	storeIds?: number[];
}
