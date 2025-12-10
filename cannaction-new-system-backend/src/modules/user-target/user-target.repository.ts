
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, DeepPartial, Repository } from 'typeorm';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { PaginationService } from '../database/pagination.service';
import { PaginationOptionsDto } from '../database/pagination/pagination-options';
import { PaginationDto } from '../database/pagination/pagination.dto';
import { UserType } from '../user/enums/user-type.enum';
import { FilterUserTargetReportDto } from './dtos/requests/filter-user-target-report.dto';
import { UserTarget } from './user-target.entity';

@Injectable()
export class UserTargetRepository {
	constructor(
		@InjectRepository(UserTarget)
		private repository: Repository<UserTarget>,
		private readonly paginationService: PaginationService
	) {}

	async findAllNotConcluded(
		currentUser: CurrentUser,
		filter: FilterUserTargetReportDto,
		options: PaginationOptionsDto
	): Promise<PaginationDto<UserTarget>> {
		const queryBuilder = this.repository.manager
			.getRepository(UserTarget)
			.createQueryBuilder('us');

		queryBuilder.innerJoin('us.store', 'store');
		queryBuilder.innerJoin('store.country', 'country');
		queryBuilder.innerJoin('us.user', 'user');
		queryBuilder.innerJoin('us.prizeItem', 'item')
		queryBuilder.andWhere('us.concluded IS NULL');

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
						.orWhere('LOWER(user.name) LIKE :searchTerm', {
							searchTerm,
						})
						.orWhere('LOWER(user.lastName) LIKE :searchTerm', {
							searchTerm,
						})
						.orWhere('LOWER(country.name) LIKE :searchTerm', {
							searchTerm,
						})
						.orWhere('LOWER(item.name) LIKE :searchTerm', {
							searchTerm,
						});
				})
			);
		}

		queryBuilder.select([
			'country.id',
			'country.name',
			'store.id',
			'store.name',
			'user.id',
			'user.name',
			'user.lastName',
			'item.id',
			'item.name',
			'us.id',
			'us.progress',
			'us.target',
			'us.active',
			'us.targetFinalDate',
			'us.createdAt'
		]);

		queryBuilder.orderBy('us.createdAt', 'DESC');
		return this.paginationService.paginate<UserTarget>(options, queryBuilder);
	}

	async findAllRequested(currentUser: CurrentUser) {
		const queryBuilder = this.repository.manager
			.getRepository(UserTarget)
			.createQueryBuilder('us');

		queryBuilder.innerJoinAndSelect('us.store', 'store');
		queryBuilder.innerJoin('store.country', 'country');
		queryBuilder.innerJoinAndSelect('us.user', 'user');
		queryBuilder.innerJoinAndSelect('us.prizeItem', 'item')
		queryBuilder.andWhere('us.success = true');
		queryBuilder.andWhere('us.concluded = false')
		queryBuilder.andWhere('us.active = true')

		if (currentUser.userType !== UserType.SUPER) {
			queryBuilder.andWhere('country.id = :countryId', { countryId: currentUser.userCountry });
		}

		return queryBuilder.getMany();
	}

	async findAllConcluded(
		currentUser: CurrentUser,
		filter: FilterUserTargetReportDto,
		options: PaginationOptionsDto
	): Promise<PaginationDto<UserTarget>> {
		const queryBuilder = this.repository.manager
			.getRepository(UserTarget)
			.createQueryBuilder('us');

		queryBuilder.innerJoin('us.store', 'store');
		queryBuilder.innerJoin('store.country', 'country');
		queryBuilder.innerJoin('us.user', 'user');
		queryBuilder.innerJoin('us.prizeItem', 'item')
		queryBuilder.andWhere('us.success IS NOT NULL');
		queryBuilder.andWhere('us.concluded = true');

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
						.orWhere('LOWER(user.name) LIKE :searchTerm', {
							searchTerm,
						})
						.orWhere('LOWER(user.lastName) LIKE :searchTerm', {
							searchTerm,
						})
						.orWhere('LOWER(country.name) LIKE :searchTerm', {
							searchTerm,
						});
				})
			);
		}

		queryBuilder.select([
			'country.id',
			'country.name',
			'store.id',
			'store.name',
			'user.id',
			'user.name',
			'user.lastName',
			'item.id',
			'item.name',
			'us.id',
			'us.progress',
			'us.target',
			'us.active',
			'us.success',
			'us.targetFinalDate',
			'us.createdAt'
		]);

		queryBuilder.orderBy('us.createdAt', 'DESC');
		return this.paginationService.paginate<UserTarget>(options, queryBuilder);
	}

	async findByUser(userId: number, storeId: number) {
		const queryBuilder = this.repository.manager
			.getRepository(UserTarget)
			.createQueryBuilder('st');
		queryBuilder.innerJoin('st.store', 'store');
		queryBuilder.innerJoin('st.user', 'user');
		queryBuilder.innerJoinAndSelect('st.prizeItem', 'i');
		queryBuilder.andWhere('user.id = :userId', { userId });
		queryBuilder.andWhere('store.id = :storeId', { storeId });
		queryBuilder.andWhere('st.success is null');
		queryBuilder.andWhere('st.concluded is null');

		return queryBuilder.getOne();
	}

	async getActiveStoreTargetForStoreSettings(storeId: number) {
		const queryBuilder = this.repository.manager
			.getRepository(UserTarget)
			.createQueryBuilder('st');
		queryBuilder.innerJoin('st.store', 'store');
		queryBuilder.innerJoinAndSelect('st.prizeItem', 'i');
		queryBuilder.andWhere('store.id = :storeId', { storeId });
		queryBuilder.andWhere('st.concluded is null');

		return queryBuilder.getOne();
	}

	async findExpiredTargets() {
		const queryBuilder = this.repository.manager
			.getRepository(UserTarget)
			.createQueryBuilder('st');
		queryBuilder.andWhere('CAST(st.targetFinalDate as DATE) < CAST(:date AS DATE)', { date: new Date() });
		queryBuilder.andWhere('st.active = true');
		queryBuilder.andWhere('st.success IS NULL');
		return queryBuilder.getMany();
	}

	async findActiveByStoreAndUser(id: number, userId: number) {
		const queryBuilder = this.repository.manager
			.getRepository(UserTarget)
			.createQueryBuilder('st');

		queryBuilder.innerJoinAndSelect('st.store', 'store');
		queryBuilder.innerJoinAndSelect('st.user', 'user');
		queryBuilder.andWhere('store.id = :id', { id });
		queryBuilder.andWhere('user.id = :userId', { userId });
		queryBuilder.andWhere('st.concluded is null');

		queryBuilder.orderBy('st.createdAt', 'DESC');
		return queryBuilder.getOne();
	}

	async findAllNotConcludedForActive(
		currentUser: CurrentUser,
	): Promise<UserTarget[]> {
		const queryBuilder = this.repository.manager
			.getRepository(UserTarget)
			.createQueryBuilder('us');

		queryBuilder.innerJoin('us.store', 'store');
		queryBuilder.innerJoin('store.country', 'country');
		queryBuilder.andWhere('us.concluded IS NULL');

		if (currentUser.userType !== UserType.SUPER) {
			const countryId = currentUser.userCountry
			queryBuilder.andWhere('country.id = :countryId', { countryId });
		}

		return queryBuilder.getMany();
	}

	async findOne(id: number): Promise<UserTarget> {
		return this.repository.findOne({ where: { id }, relations: ['user', 'store'] });
	}

	async create(entity: DeepPartial<UserTarget>): Promise<UserTarget | null> {
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

	async update(entity: DeepPartial<UserTarget>): Promise<UserTarget> {
		await this.repository.update(entity.id, entity);
		return this.findOne(entity.id);
	}

	async delete(id: number): Promise<void> {
		const promoTarget = await this.findOne(id);
		if (!promoTarget) return;
		await this.repository.delete(id);
	}
}
