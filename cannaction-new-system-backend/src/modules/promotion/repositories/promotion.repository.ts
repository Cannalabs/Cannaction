import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { PaginationService } from '@/modules/database/pagination.service';
import { PaginationOptionsDto } from '@/modules/database/pagination/pagination-options';
import { PaginationDto } from '@/modules/database/pagination/pagination.dto';
import { UserType } from '@/modules/user/enums/user-type.enum';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { FilterPromotionReportDto } from '../dtos/requests/filter-promotion-report.dto';
import { Promotion } from '../promotion.entity';

@Injectable()
export class PromotionRepository {
	constructor(
		@InjectRepository(Promotion)
		private repository: Repository<Promotion>,
		private readonly paginationService: PaginationService
	) {}

	async findAll(
		currentUser: CurrentUser,
		filter: FilterPromotionReportDto,
		options: PaginationOptionsDto
	): Promise<PaginationDto<Promotion>> {
		const queryBuilder = this.repository.manager
			.getRepository(Promotion)
			.createQueryBuilder('promotion');
		queryBuilder.innerJoin('promotion.country', 'country');

		if (currentUser.userType !== UserType.SUPER) {
			queryBuilder.andWhere('country.id = :countryId', { countryId: currentUser.userCountry });
		}

		if (currentUser.userType === UserType.STORE) {
			queryBuilder.innerJoin('promotion.stores', 'store');
			queryBuilder
		}

		if (filter.search) {
			const searchTerm = `%${filter.search.toLowerCase()}%`;
			queryBuilder.andWhere(
				'LOWER(promotion.name) LIKE :searchTerm', {
				searchTerm,
			});
		}

		queryBuilder.select(['promotion.id', 'promotion.name', 'promotion.maxCoupons', 'promotion.createdAt', 'promotion.thumb', 'promotion.active']);

		queryBuilder.orderBy('promotion.createdAt', 'DESC');

		return this.paginationService.paginate<Promotion>(options, queryBuilder);
	}

	async findAllForStoreUser(
		storeId: number,
		filter: FilterPromotionReportDto,
		options: PaginationOptionsDto
	): Promise<PaginationDto<Promotion>> {
		const queryBuilder = this.repository.manager
			.getRepository(Promotion)
			.createQueryBuilder('promotion');
		queryBuilder.innerJoin('promotion.stores', 'store');
		if (filter.storeId) {
			queryBuilder.andWhere('store.id = :storeId', { storeId: filter.storeId });
		} else {
			queryBuilder.andWhere('store.id = :storeId', { storeId });
			queryBuilder.andWhere('promotion.active = true');
		}

		if (filter.search) {
			const searchTerm = `%${filter.search.toLowerCase()}%`;
			queryBuilder.andWhere(
				'LOWER(promotion.name) LIKE :searchTerm', {
				searchTerm,
			});
		}

		queryBuilder.select([
			'promotion.id',
			'promotion.name',
			'promotion.coupons',
			'promotion.createdAt',
			'promotion.thumb',
			'promotion.active'
		]);

		queryBuilder.orderBy('promotion.createdAt', 'DESC');

		return this.paginationService.paginate<Promotion>(options, queryBuilder);
	}

	async findAllForUserCustomer(storeId: number) {
		const queryBuilder = this.repository.manager
			.getRepository(Promotion)
			.createQueryBuilder('promotion');
		queryBuilder.innerJoin('promotion.stores', 'store');
		queryBuilder.andWhere('store.id = :storeId', { storeId });
		queryBuilder.andWhere('promotion.active = true');
		queryBuilder.andWhere('promotion.coupons > 0');

		queryBuilder.select(['promotion.id', 'promotion.name', 'promotion.thumb']);
		queryBuilder.orderBy('promotion.createdAt', 'DESC');

		return queryBuilder.getMany();
	}

	async findOne(id: number): Promise<Promotion> {
		return this.repository.findOne({ where: { id }, relations: ['country', 'item', 'stores'] });
	}

	async findLabeled(countryId: number): Promise<Promotion[]> {
		const queryBuilder = this.repository.manager
			.getRepository(Promotion)
			.createQueryBuilder('promotion');

		queryBuilder.innerJoin('promotion.country', 'country');
		queryBuilder.andWhere('promotion.active = TRUE');
		queryBuilder.andWhere('country.id = :countryId', { countryId });

		queryBuilder.select(['promotion.id', 'promotion.name']);
		queryBuilder.orderBy('promotion.name', 'ASC');

		return queryBuilder.getMany();
	}

	async findExpiredPromotions() {
		const queryBuilder = this.repository.manager
			.getRepository(Promotion)
			.createQueryBuilder('p');
		queryBuilder.andWhere('CAST(p.finalDate as DATE) < CAST(:date AS DATE)', { date: new Date() });
		queryBuilder.andWhere('p.active = true');

		return queryBuilder.getMany();
	}

	async findByCountryId(id: number): Promise<Promotion[]> {
		return this.repository.find({ where: { country: { id } } });
	}

	async inactive(id: number): Promise<void> {
		await this.repository.update(id, { active: false });
	}

	async active(id: number): Promise<void> {
		await this.repository.update(id, { active: true });
	}

	async create(entity: DeepPartial<Promotion>): Promise<Promotion | null> {
		const promotion = await this.repository.save(entity);
		return this.findOne(promotion.id);
	}

	async update(id: number, body: DeepPartial<Promotion>) {
		await this.repository.update(id, body);
	}

	async delete(id: number) {
		await this.removePromotionStores(id);
		await this.repository.delete(id);
	}

	async addPromotionStore(
		promotionId: number,
		storeId: number
	) {

		const queryBuilder = this.repository.manager
			.getRepository(Promotion)
			.createQueryBuilder('promotion');
		queryBuilder.innerJoinAndSelect(
			'promotion_store',
			'promotion_store',
			'promotion_store.promotion_id = :promotionId AND promotion_store.store_id = :storeId',
			{
				promotionId,
				storeId,
			}
		);
		if (await queryBuilder.getRawOne()) return;

		await this.repository.manager
			.createQueryBuilder()
			.insert()
			.into('promotion_store')
			.values({
				promotion_id: promotionId,
				store_id: storeId,
			})
			.execute();
	}

	async removePromotionStores(
		promotionId: number
	) {

		const queryBuilder = this.repository.manager
			.getRepository(Promotion)
			.createQueryBuilder('promotion');
		queryBuilder.innerJoinAndSelect(
			'promotion_store',
			'promotion_store',
			'promotion_store.promotion_id = :promotionId',
			{
				promotionId
			}
		);
		if (!(await queryBuilder.getRawOne())) return;

		await this.repository.manager
			.createQueryBuilder()
			.delete()
			.from('promotion_store')
			.where('promotion_id = :promotionId', {
				promotionId,
			})
			.execute();
	}
}
