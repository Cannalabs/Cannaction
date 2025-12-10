import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	UseGuards
} from '@nestjs/common';
import {
	CurrentUser,
	ReqCurrentUser,
} from '../auth/decorators/current-user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { PaginationOptionsDto } from '../database/pagination/pagination-options';
import { CreateNewsletterRequest } from './dtos/requests/create-newsletter.request';
import { FindNewsletterRequest } from './dtos/requests/find-newsletter.request';
import { UpdateNewsletterRequest } from './dtos/requests/update-newsletter.request';
import { NewsletterPersistenceService } from './services/newsletter-persistence.service';
import { NewsletterService } from './services/newsletter.service';

@Controller('newsletter')
export class NewsletterController {
	constructor(
		private readonly newsletterService: NewsletterService,
		private readonly newsletterPersistenceService: NewsletterPersistenceService
	) {}

	@UseGuards(JwtGuard)
	@Get(':id')
	public async findById(@Param('id') id: number) {
		return this.newsletterService.findOne(id);
	}

	@UseGuards(JwtGuard)
	@Get()
	public async findAll(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Query() params: FindNewsletterRequest,
		@Query() options: PaginationOptionsDto
	) {
		return this.newsletterService.findAll(currentUser, params, options);
	}

	@UseGuards(JwtGuard)
	@Put(':id')
	public async update(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Param('id') id: number,
		@Body() body: UpdateNewsletterRequest
	) {
		return this.newsletterPersistenceService.update(id, body);
	}

	@UseGuards(JwtGuard)
	@Put(':id/inactive')
	public async inactive(@Param('id') id: number) {
		return this.newsletterPersistenceService.inactive(id);
	}

	@UseGuards(JwtGuard)
	@Put(':id/active')
	public async active(@Param('id') id: number) {
		return this.newsletterPersistenceService.active(id);
	}

	@UseGuards(JwtGuard)
	@Post()
	public async create(@Body() newsletter: CreateNewsletterRequest) {
		return this.newsletterPersistenceService.create(newsletter);
	}

	@UseGuards(JwtGuard)
	@Delete(':id')
	public async delete(@Param('id') id: number): Promise<void> {
		await this.newsletterPersistenceService.delete(id);
	}
}
