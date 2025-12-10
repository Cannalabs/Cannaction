
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { PaginationService } from '../database/pagination.service';
import { PaginationOptionsDto } from '../database/pagination/pagination-options';
import { PaginationDto } from '../database/pagination/pagination.dto';
import { UserType } from '../user/enums/user-type.enum';
import { FindNewsletterRequest } from './dtos/requests/find-newsletter.request';
import { Newsletter } from './newsletter.entity';

@Injectable()
export class NewsletterRepository {
	constructor(
		@InjectRepository(Newsletter)
		private repository: Repository<Newsletter>,
		private readonly paginationService: PaginationService
	) {}

	async findAll(currentUser: CurrentUser, filter: FindNewsletterRequest, options: PaginationOptionsDto): Promise<PaginationDto<Newsletter>> {

		const queryBuilder = this.repository.manager
			.getRepository(Newsletter)
			.createQueryBuilder('newsletter');
		queryBuilder.innerJoin('newsletter.country', 'country');

		if (filter.search) {
			const searchTerm = `%${filter.search.toLowerCase()}%`;
			queryBuilder.andWhere(
				'LOWER(newsletter.title) LIKE :searchTerm', {
				searchTerm,
			})
		}

		if (currentUser.userType !== UserType.SUPER) {
			queryBuilder.andWhere('country.id = :countryId', {
				countryId: currentUser.userCountry,
			});
		}

		queryBuilder.select(['newsletter.id', 'newsletter.title', 'newsletter.createdAt', 'newsletter.userType', 'newsletter.published', 'country.id', 'country.name']);

		queryBuilder.orderBy('newsletter.createdAt', 'DESC');
		return this.paginationService.paginate<Newsletter>(options, queryBuilder);
	}

	async findOne(id: number): Promise<Newsletter | null> {
		return this.repository.findOne({
			where: { id },
			relations: ['country', 'stores']
		});
	}

	async inactive(id: number): Promise<void> {
		await this.repository.update(id, { published: false });
	}

	async active(id: number): Promise<void> {
		await this.repository.update(id, { published: true });
	}

	async create(entity: DeepPartial<Newsletter>): Promise<Newsletter | null> {
		const item = await this.repository.save(entity);
		return this.findOne(item.id);
	}

	async update(id: number, entity: DeepPartial<Newsletter>): Promise<Newsletter> {
		await this.repository.update(id, entity);
		return this.findOne(id);
	}

	async deleteNewsletter(id: number): Promise<void> {
		await this.repository.delete(id);
	}

	async addNewsletterStore(
		newsletterId: number,
		storeId: number
	) {

		const queryBuilder = this.repository.manager
			.getRepository(Newsletter)
			.createQueryBuilder('newsletter');
		queryBuilder.innerJoinAndSelect(
			'newsletter_store',
			'newsletter_store',
			'newsletter_store.newsletter_id = :newsletterId AND newsletter_store.store_id = :storeId',
			{
				newsletterId,
				storeId,
			}
		);
		if (await queryBuilder.getRawOne()) return;

		await this.repository.manager
			.createQueryBuilder()
			.insert()
			.into('newsletter_store')
			.values({
				newsletter_id: newsletterId,
				store_id: storeId,
			})
			.execute();
	}

	async removeNewsletterStores(
		newsletterId: number
	) {

		const queryBuilder = this.repository.manager
			.getRepository(Newsletter)
			.createQueryBuilder('newsletter');
		queryBuilder.innerJoinAndSelect(
			'newsletter_store',
			'newsletter_store',
			'newsletter_store.newsletter_id = :newsletterId',
			{
				newsletterId
			}
		);
		if (!(await queryBuilder.getRawOne())) return;

		await this.repository.manager
			.createQueryBuilder()
			.delete()
			.from('newsletter_store')
			.where('newsletter_id = :newsletterId', {
				newsletterId,
			})
			.execute();
	}
}
