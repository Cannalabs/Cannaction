import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { PaginationOptionsDto } from '@/modules/database/pagination/pagination-options';
import { PaginationDto } from '@/modules/database/pagination/pagination.dto';
import { Injectable } from '@nestjs/common';
import { FindNewsletterRequest } from '../dtos/requests/find-newsletter.request';
import { Newsletter } from '../newsletter.entity';
import { NewsletterRepository } from '../newsletter.repository';

@Injectable()
export class NewsletterService {
	constructor(private readonly newsletterRepository: NewsletterRepository) {}

	async findAll(currentUser: CurrentUser, filter: FindNewsletterRequest, options: PaginationOptionsDto): Promise<PaginationDto<Newsletter>> {
		return this.newsletterRepository.findAll(currentUser, filter, options);
	}

	async findOne(id: number): Promise<Newsletter | undefined> {
		return this.newsletterRepository.findOne(id);
	}
}
