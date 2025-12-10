import { Country } from '@/modules/country/country.entity';
import { NewsletterNotFoundError } from '@/modules/newsletter/errors/newsletter-not-found.error';
import { Injectable } from '@nestjs/common';
import { CreateNewsletterRequest } from '../dtos/requests/create-newsletter.request';
import { UpdateNewsletterRequest } from '../dtos/requests/update-newsletter.request';
import { NewsletterUserType } from '../enums/newsletter-user-type.enum';
import { NewsletterNotCreatedError } from '../errors/newsletter-not-created.error';
import { NewsletterRepository } from '../newsletter.repository';

@Injectable()
export class NewsletterPersistenceService {
	constructor(private readonly newsletterRepository: NewsletterRepository) {}

	async create(newNewsletter: CreateNewsletterRequest) {
		if (newNewsletter.userType === NewsletterUserType.STORE
			&& (newNewsletter.storeIds.length == 0 || !newNewsletter.storeIds))
			throw new NewsletterNotCreatedError('Stores are required for User Type Store');

		const body = this.composeEntity(newNewsletter);
		const newsletter = await this.newsletterRepository.create({ ...body, published: false });

		if (newNewsletter.userType === NewsletterUserType.STORE) {
			for (const storeId of newNewsletter.storeIds) {
				await this.newsletterRepository.addNewsletterStore(newsletter.id, storeId);
			}
		}
	}

	async update(id: number, body: UpdateNewsletterRequest) {
		const newsletter = await this.newsletterRepository.findOne(id);
		if (!newsletter) throw new NewsletterNotFoundError();
		const updatedNewsletter = this.composeEntity(body);

		await this.newsletterRepository.update(id, updatedNewsletter);

		await this.newsletterRepository.removeNewsletterStores(id);
		if (body.userType === NewsletterUserType.STORE) {
			for (const storeId of body.storeIds) {
				await this.newsletterRepository.addNewsletterStore(id, storeId);
			}
		}
	}

	async inactive(id: number): Promise<void> {
		const newsletter = await this.newsletterRepository.findOne(id);
		if (!newsletter) throw new NewsletterNotFoundError();
		if (!newsletter.published) return;
		return this.newsletterRepository.inactive(id);
	}

	async active(id: number): Promise<void> {
		const newsletter = await this.newsletterRepository.findOne(id);
		if (!newsletter) throw new NewsletterNotFoundError();
		if (newsletter.published) return;
		return this.newsletterRepository.active(id);
	}

	async delete(id: number): Promise<void> {
		const newsletter = await this.newsletterRepository.findOne(id);
		if (!newsletter) throw new NewsletterNotFoundError();
		await this.newsletterRepository.removeNewsletterStores(id);
		await this.newsletterRepository.deleteNewsletter(id);
	}

	private composeEntity(request: CreateNewsletterRequest | UpdateNewsletterRequest) {
		return {
			title: request.title,
			body: request.body,
			footer: request.footer,
			userType: request.userType,
			country: new Country({ id: request.countryId }),
		};
	}
}
