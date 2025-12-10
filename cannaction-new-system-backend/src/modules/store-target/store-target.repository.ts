
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, DeepPartial, Repository } from 'typeorm';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { PaginationService } from '../database/pagination.service';
import { PaginationOptionsDto } from '../database/pagination/pagination-options';
import { PaginationDto } from '../database/pagination/pagination.dto';
import { UserType } from '../user/enums/user-type.enum';
import { FilterStoreTargetReportDto } from './dtos/requests/filter-store-target-report.dto';
import { PrizeGraphicResponse } from './dtos/responses/prize-graphic-reponse.dto';
import { PrizeType } from './enums/prize-type.enum';
import { StoreTarget } from './store-target.entity';

@Injectable()
export class StoreTargetRepository {
	constructor(
		@InjectRepository(StoreTarget)
		private repository: Repository<StoreTarget>,
		private readonly paginationService: PaginationService
	) {}

	async findAllNotConcluded(
		currentUser: CurrentUser,
		filter: FilterStoreTargetReportDto,
		options: PaginationOptionsDto
	): Promise<PaginationDto<StoreTarget>> {

		const queryBuilder = this.repository.manager
			.getRepository(StoreTarget)
			.createQueryBuilder('st');

		queryBuilder.innerJoin('st.store', 'store');
		queryBuilder.innerJoin('store.country', 'country');
		if (filter.type === PrizeType.ITEM) {
			queryBuilder.innerJoin('st.prizeItem', 'item')
		}
		queryBuilder.andWhere('st.concluded IS NULL');
		queryBuilder.andWhere('st.prizeType = :type', { type: filter.type });

		if (currentUser.userType !== UserType.SUPER || filter.countryId) {
			const countryId =
				currentUser.userType != UserType.SUPER
					? currentUser.userCountry
					: Number(filter.countryId);
			queryBuilder.andWhere('country.id = :countryId', { countryId });
		}

		if (filter.storeId) {
			queryBuilder.andWhere('store.id = :storeId', {
				storeId: filter.storeId,
			});
		}

		if (filter.searchNotConcluded) {
			queryBuilder.andWhere(
				new Brackets((qb) => {
					const searchTerm = `%${filter.searchNotConcluded.toLowerCase()}%`;
					return qb
						.where('LOWER(store.name) LIKE :searchTerm', {
							searchTerm,
						})
						.orWhere('LOWER(country.name) LIKE :searchTerm', {
							searchTerm,
						});
				})
			);
		}

		if (filter.type === PrizeType.POINTS) {
			queryBuilder.select([
				'country.id',
				'country.name',
				'store.id',
				'store.name',
				'st.id',
				'st.target',
				'st.prizeMoney',
				'st.finalDateTarget',
				'st.progress',
				'st.active',
				'st.success',
				'st.createdAt'
			]);
		} else {
			queryBuilder.select([
				'country.id',
				'country.name',
				'store.id',
				'store.name',
				'st.id',
				'st.finalDateTarget',
				'st.progress',
				'st.target',
				'st.active',
				'st.success',
				'st.createdAt',
				'item.id',
				'item.name',
			]);
		}

		queryBuilder.orderBy('st.createdAt', 'DESC');
		return this.paginationService.paginate<StoreTarget>(options, queryBuilder);
	}

	async findAllConcluded(
		currentUser: CurrentUser,
		filter: FilterStoreTargetReportDto,
		options: PaginationOptionsDto
	): Promise<PaginationDto<StoreTarget>> {
		const queryBuilder = this.repository.manager
			.getRepository(StoreTarget)
			.createQueryBuilder('st');

		queryBuilder.innerJoin('st.store', 'store');
		queryBuilder.innerJoin('store.country', 'country');
		if (filter.type === PrizeType.ITEM) {
			queryBuilder.innerJoin('st.prizeItem', 'item')
		}
		queryBuilder.andWhere('st.success IS NOT NULL');
		queryBuilder.andWhere('st.concluded = true');
		queryBuilder.andWhere('st.prizeType = :type', { type: filter.type });


		if (currentUser.userType !== UserType.SUPER || filter.countryId) {
			const countryId =
				currentUser.userType != UserType.SUPER
					? currentUser.userCountry
					: Number(filter.countryId);
			queryBuilder.andWhere('country.id = :countryId', { countryId });
		}

		if (filter.storeId) {
			queryBuilder.andWhere('store.id = :storeId', {
				storeId: filter.storeId,
			});
		}

		if (filter.searchConcluded) {
			queryBuilder.andWhere(
				new Brackets((qb) => {
					const searchTerm = `%${filter.searchConcluded.toLowerCase()}%`;
					return qb
						.where('LOWER(store.name) LIKE :searchTerm', {
							searchTerm,
						})
						.orWhere('LOWER(country.name) LIKE :searchTerm', {
							searchTerm,
						});
				})
			);
		}

		if (filter.type === PrizeType.POINTS) {
			queryBuilder.select([
				'country.id',
				'country.name',
				'store.id',
				'store.name',
				'st.id',
				'st.target',
				'st.prizeMoney',
				'st.finalDateTarget',
				'st.progress',
				'st.active',
				'st.success',
				'st.createdAt'
			]);
		} else {
			queryBuilder.select([
				'country.id',
				'country.name',
				'store.id',
				'store.name',
				'st.id',
				'st.finalDateTarget',
				'st.progress',
				'st.target',
				'st.active',
				'st.success',
				'st.createdAt',
				'item.id',
				'item.name',
			]);
		}

		queryBuilder.orderBy('st.createdAt', 'DESC');
		return this.paginationService.paginate<StoreTarget>(options, queryBuilder);
	}

	async findPrizeGraphicByStore(currentUser: CurrentUser): Promise<PrizeGraphicResponse[]> {
		const queryBuilder = this.repository.manager
			.getRepository(StoreTarget)
			.createQueryBuilder('st');

		queryBuilder.innerJoin('st.store', 'store');
		queryBuilder.innerJoin('store.country', 'country');
		queryBuilder.andWhere('st.success IS NOT NULL');
		queryBuilder.andWhere('st.success = true');
		queryBuilder.andWhere('st.prizeType = :type', { type: PrizeType.POINTS });

		if (currentUser.userType !== UserType.SUPER) {
			queryBuilder.andWhere('country.id = :countryId', { countryId: currentUser.userCountry });
		}

		queryBuilder.select(['st.id', 'st.prizeMoney', 'store.id', 'store.name']);

		const results = await queryBuilder.getMany();

		const resultList: PrizeGraphicResponse[] = [];

		for (const result of results) {
			const index = resultList.findIndex((r) => r.name === result.store.name);
			if (index > -1) {
				if (result.prizeMoney > resultList[index].value) {
					resultList.splice(index, 1);
					const object = { name: result.store.name, value: result.prizeMoney };
					resultList.push(object);
				}
			} else {
				const object = { name: result.store.name, value: result.prizeMoney };
				resultList.push(object);
			}
		}

		resultList.sort((a, b) => b.value - a.value);

		return resultList;
	}

	async findPrizeGraphicByCountry(currentUser: CurrentUser): Promise<PrizeGraphicResponse[]> {
		const queryBuilder = this.repository.manager
			.getRepository(StoreTarget)
			.createQueryBuilder('st');

		queryBuilder.innerJoin('st.store', 'store');
		queryBuilder.innerJoin('store.country', 'country');
		queryBuilder.andWhere('st.success IS NOT NULL');
		queryBuilder.andWhere('st.success = true');
		queryBuilder.andWhere('st.prizeType = :type', { type: PrizeType.POINTS });

		if (currentUser.userType !== UserType.SUPER) {
			queryBuilder.andWhere('country.id = :countryId', { countryId: currentUser.userCountry });
		}

		queryBuilder.select(['st.id', 'st.prizeMoney', 'store.id', 'country.id', 'country.name']);

		const results = await queryBuilder.getMany();

		const resultList: PrizeGraphicResponse[] = [];

		for (const result of results) {
			const index = resultList.findIndex((r) => r.name === result.store.country.name);
			if (index > -1) {
				if (result.prizeMoney > resultList[index].value) {
					resultList.splice(index, 1);
					const object = { name: result.store.country.name, value: result.prizeMoney };
					resultList.push(object);
				}
			} else {
				const object = { name: result.store.country.name, value: result.prizeMoney };
				resultList.push(object);
			}
		}


		resultList.sort((a, b) => b.value - a.value);

		return resultList;
	}

	async findCountByStore(storeId: number) {
		const queryBuilder = this.repository.manager
			.getRepository(StoreTarget)
			.createQueryBuilder('st');
		queryBuilder.innerJoin('st.store', 'store');
		queryBuilder.andWhere('store.id = :storeId', { storeId });
		queryBuilder.andWhere('st.active = true');
		return queryBuilder.getCount();
	}

	async storeHasActiveTarget(storeId: number) {
		const queryBuilder = this.repository.manager
			.getRepository(StoreTarget)
			.createQueryBuilder('st');
		queryBuilder.innerJoin('st.store', 'store');
		queryBuilder.andWhere('st.active = true');
		queryBuilder.andWhere('store.id = :storeId', { storeId });

		return queryBuilder.getExists();
	}

	async findExpiredTargets() {
		const queryBuilder = this.repository.manager
			.getRepository(StoreTarget)
			.createQueryBuilder('st');
		queryBuilder.andWhere('CAST(st.finalDateTarget as DATE) < CAST(:date AS DATE)', { date: new Date() });
		queryBuilder.andWhere('st.active = true');
		queryBuilder.andWhere('st.success IS NULL');
		return queryBuilder.getMany();
	}

	async findAllRequested(currentUser: CurrentUser) {
		const queryBuilder = this.repository.manager
			.getRepository(StoreTarget)
			.createQueryBuilder('st');

		queryBuilder.innerJoinAndSelect('st.store', 'store');
		queryBuilder.innerJoin('store.country', 'country');
		queryBuilder.leftJoinAndSelect('st.prizeItem', 'item')
		queryBuilder.andWhere('st.success = true');
		queryBuilder.andWhere('st.concluded = false')
		queryBuilder.andWhere('st.active = true')

		if (currentUser.userType !== UserType.SUPER) {
			queryBuilder.andWhere('country.id = :countryId', { countryId: currentUser.userCountry });
		}

		return queryBuilder.getMany();
	}

	async findOne(id: number): Promise<StoreTarget> {
		return this.repository.findOne({ where: { id }, relations: ['store'] });
	}

	async findActiveByStore(id: number) {
		const queryBuilder = this.repository.manager
			.getRepository(StoreTarget)
			.createQueryBuilder('st');

		queryBuilder.innerJoinAndSelect('st.store', 'store');
		queryBuilder.andWhere('store.id = :id', { id });
		queryBuilder.andWhere('st.concluded is null');

		queryBuilder.orderBy('st.createdAt', 'DESC');
		return queryBuilder.getOne();
	}

	async create(entity: DeepPartial<StoreTarget>): Promise<StoreTarget | null> {
		const promoTarget = await this.repository.save(entity);
		return this.findOne(promoTarget.id);
	}

	async active(id: number) {
		const promoTarget = await this.findOne(id);
		if (promoTarget.active) return;
		await this.repository.update(id, { active: true });
	}

	async inactive(id: number) {
		const promoTarget = await this.findOne(id);
		if (!promoTarget.active) return;
		await this.repository.update(id, { active: false });
	}

	async update(entity: DeepPartial<StoreTarget>): Promise<StoreTarget> {
		await this.repository.update(entity.id, entity);
		return this.findOne(entity.id);
	}

	async delete(id: number): Promise<void> {
		const promoTarget = await this.findOne(id);
		if (!promoTarget) return;
		await this.repository.delete(id);
	}

	async getPointTargetSum(countryId?: number) {
		const queryBuilder = this.repository.manager
			.getRepository(StoreTarget)
			.createQueryBuilder('st')
		queryBuilder.select("TO_CHAR(st.final_date_target, 'YYYY-MM')", 'month')
		queryBuilder.andWhere('st.prize_type = :prizeType', { prizeType: PrizeType.POINTS })
		queryBuilder.addSelect('SUM(st.target)', 'target')

		if (countryId) {
			queryBuilder.innerJoin('st.store', 'store');
			queryBuilder.innerJoin('store.country', 'country');
			queryBuilder.andWhere('country.id = :countryId', { countryId });
		}
		queryBuilder.andWhere("st.final_date_target >= NOW() - INTERVAL '12 months'")
		queryBuilder.groupBy("TO_CHAR(st.final_date_target, 'YYYY-MM')")
		queryBuilder.orderBy("TO_CHAR(st.final_date_target, 'YYYY-MM')", 'ASC')

		return queryBuilder.getRawMany();
	}
}
