import { PaginationOptionsDto } from '@/modules/database/pagination/pagination-options';

import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { Coupon } from '@/modules/coupon/coupon.entity';
import { PaginationService } from '@/modules/database/pagination.service';
import { PaginationDto } from '@/modules/database/pagination/pagination.dto';
import { Item } from '@/modules/item/item.entity';
import { FilterSalesReportDto } from '@/modules/sale/dtos/requests/filter-sales-report.dto';
import { Sale } from '@/modules/sale/sale.entity';
import { StoreTarget } from '@/modules/store-target/store-target.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, DeepPartial, Repository } from 'typeorm';
import { UserTarget } from '../../user-target/user-target.entity';
import { UserType } from '../../user/enums/user-type.enum';
import { User } from '../../user/user.entity';
import { FilterStoreListDto } from '../dtos/requests/filter-store-list.dto';
import { Store } from '../store.entity';

@Injectable()
export class StoreRepository {
	constructor(
		@InjectRepository(Store)
		private readonly repository: Repository<Store>,
		private readonly paginationService: PaginationService,
	) {}

	async findAll(
		currentUser: CurrentUser,
		filter: FilterStoreListDto,
		options: PaginationOptionsDto
	): Promise<PaginationDto<Store>> {
		const queryBuilder = this.repository.manager
			.getRepository(Store)
			.createQueryBuilder('store');

		queryBuilder.innerJoin('store.country', 'country');
		queryBuilder.leftJoin('store.state', 'state');
		queryBuilder.leftJoin('store.city', 'city');

		if (currentUser.userType !== UserType.SUPER || filter.countryId) {
			const countryId =
				currentUser.userType != UserType.SUPER
					? currentUser.userCountry
					: Number(filter.countryId);
			queryBuilder.andWhere('country.id = :countryId', { countryId });
		}

		if (filter.stateId) {
			queryBuilder.andWhere('state.id = :stateId', {
				stateId: filter.stateId,
			});
		}

		if (filter.cityId) {
			queryBuilder.andWhere('city.id = :cityId', {
				cityId: filter.cityId,
			});
		}

		if (filter.search) {
			const searchTerm = `%${filter.search.toLowerCase()}%`;
			queryBuilder.andWhere('LOWER(store.name) LIKE :searchTerm', {
				searchTerm,
			})
		}

		if (filter.active) {
			queryBuilder.andWhere('store.active = :active', { active: filter.active });
		}

		queryBuilder.select([
			'store.id',
			'store.name',
			'country.id',
			'country.name',
			'state.id',
			'state.name',
			'city.id',
			'city.name',
			'store.active',
			'store.lastInteractionDate'
		])

		queryBuilder.orderBy('store.createdAt', 'DESC');

		return this.paginationService.paginate<Store>(options, queryBuilder);
	}

	async findForSales(options: PaginationOptionsDto, filter: FilterSalesReportDto, countryId?: number): Promise<PaginationDto<Store>> {
		const queryBuilder = this.repository.manager
			.getRepository(Store)
			.createQueryBuilder('store');
		queryBuilder.innerJoinAndSelect('store.country', 'country');
		queryBuilder.andWhere('store.active = true');

		if (countryId) {
			queryBuilder.andWhere('country.id = :countryId', { countryId });
		}

		if (filter.search) {
			const searchTerm = `%${filter.search.toLowerCase()}%`;
			queryBuilder.andWhere('LOWER(store.name) LIKE :searchTerm', {
				searchTerm,
			})
		}

		if (filter.storeId) {
			queryBuilder.andWhere('store.id = :storeId', { storeId: filter.storeId });
		}

		return this.paginationService.paginate<Store>(options, queryBuilder);
	}

	async findLabeledByCountryId(countryId: number): Promise<Store[]> {
		return this.repository.find({
			select: ['id', 'name'],
			where: { country: { id: countryId } },
		});
	}

	async findLabeled(currentUser: CurrentUser): Promise<Store[]> {
		if (currentUser.userType === UserType.SUPER) {
			return this.repository.find({ select: ['id', 'name'] });
		}
		return this.repository.find({ where: { country: { id: currentUser.userCountry } }, select: ['id', 'name'] });
	}

	async findOne(id: number): Promise<Store | null> {
		const queryBuilder = this.repository.manager
			.getRepository(Store)
			.createQueryBuilder('store');
		queryBuilder.leftJoinAndSelect('store.masterUser', 'masterUser');
		queryBuilder.leftJoinAndSelect('store.city', 'city');
		queryBuilder.leftJoinAndSelect('store.state', 'state');
		queryBuilder.innerJoinAndSelect('store.country', 'country');
		queryBuilder.leftJoinAndSelect(
			'store.workers',
			'worker',
			'worker.userType = :userType',
			{ userType: UserType.STORE }
		);

		queryBuilder.andWhere('store.id = :id', { id });

		return queryBuilder.getOne();
	}

	async findStoreWorkers(id: number, filter: FilterStoreListDto, options: PaginationOptionsDto) {
		const queryBuilder = this.repository.manager
			.getRepository(User)
			.createQueryBuilder('worker');
		queryBuilder.innerJoin('worker.store', 'store');
		queryBuilder.andWhere('store.id = :id', { id });
		queryBuilder.andWhere('worker.userType = :userType', { userType: UserType.STORE });

		if (filter.search) {
			const searchTerm = `%${filter.search.toLowerCase()}%`;
			queryBuilder.andWhere('LOWER(wroker.name) LIKE :searchTerm', {
				searchTerm,
			})
		}

		queryBuilder.orderBy('worker.createdAt', 'DESC');

		return this.paginationService.paginate<User>(options, queryBuilder);
	}

	async findByName(name: string): Promise<Store> {
		return this.repository.findOne({ where: { name } });
	}

	async inactive(id: number): Promise<void> {
		await this.repository.update(id, { active: false });
	}

	async active(id: number): Promise<void> {
		await this.repository.update(id, { active: true });
	}

	async create(entity: DeepPartial<Store>): Promise<Store | null> {
		const store = await this.repository.save(entity);
		return this.repository.findOne({ where: { id: store.id } });
	}

	async update(entity: DeepPartial<Store>): Promise<Store> {
		await this.repository.update(entity.id, entity);
		return this.findOne(entity.id);
	}

	async getSalesByCountry(id: number) {
		return this.repository.findOne({
			where: { country: { id } },
			relations: ['sales'],
		});
	}

	async getUserStoreByUserId(userId: number) {
		const queryBuilder = this.repository.manager
			.getRepository(User)
			.createQueryBuilder('user');
		queryBuilder.innerJoinAndSelect('user.store', 'store');
		queryBuilder.where('user.id = :userId', { userId });
		queryBuilder.select(['user.id', 'store.id']);
		return queryBuilder.getOne();
	}

	async findValidatedCouponCountByStore(storeId: number) {
		const queryBuilder = this.repository.manager
			.getRepository(Coupon)
			.createQueryBuilder('coupon');
		queryBuilder.innerJoin('coupon.store', 'store');
		queryBuilder.andWhere('coupon.checkedDate IS NOT NULL');
		queryBuilder.andWhere('store.id = :storeId', { storeId });

		return queryBuilder.getCount();
	}

	async findNotValidatedCouponCountByStore(storeId: number) {
		const queryBuilder = this.repository.manager
			.getRepository(Coupon)
			.createQueryBuilder('coupon');
		queryBuilder.innerJoin('coupon.store', 'store');
		queryBuilder.andWhere('coupon.checkedDate IS NULL');
		queryBuilder.andWhere('store.id = :storeId', { storeId });

		return queryBuilder.getCount();
	}

	async findUserPointsForStoreDashboard(userId: number) {
		const queryBuilder = this.repository.manager.getRepository(User).createQueryBuilder('user');
		queryBuilder.where('user.id = :userId', { userId })
		queryBuilder.select(['user.id', 'user.points']);
		const user = await queryBuilder.getOne();
		return user.points;
	}

	async findStorePoints(storeId: number) {
		const queryBuilder = this.repository.manager.getRepository(Store).createQueryBuilder('store');
		queryBuilder.where('store.id = :storeId', { storeId })
		queryBuilder.select(['store.id', 'store.points']);
		const store = await queryBuilder.getOne();
		return store.points;
	}

	async findActiveUserCountByStore(storeId: number) {
		const queryBuilder = this.repository.manager
			.getRepository(User)
			.createQueryBuilder('user');
		queryBuilder.innerJoin('user.store', 'store');
		queryBuilder.andWhere('user.active = true');
		queryBuilder.andWhere('user.userType = :userType', { userType: UserType.CUSTOMER });
		queryBuilder.andWhere('store.id = :storeId', { storeId });
		return queryBuilder.getCount();
	}

	async findInactiveUserCountByStore(storeId: number) {
		const queryBuilder = this.repository.manager
			.getRepository(User)
			.createQueryBuilder('user');
		queryBuilder.innerJoin('user.store', 'store');
		queryBuilder.andWhere('user.active = false');
		queryBuilder.andWhere('user.userType = :userType', { userType: UserType.CUSTOMER });
		queryBuilder.andWhere('store.id = :storeId', { storeId });
		return queryBuilder.getCount();
	}

	async findActiveTargetByStore(storeId: number, isSettings: boolean) {
		const queryBuilder = this.repository.manager
			.getRepository(StoreTarget)
			.createQueryBuilder('st');
		queryBuilder.innerJoin('st.store', 'store');
		queryBuilder.leftJoinAndSelect('st.prizeItem', 'item');
		queryBuilder.andWhere('store.id = :storeId', { storeId });
		queryBuilder.andWhere(new Brackets((q) => {
			q.orWhere('st.concluded = false');
			q.orWhere('st.concluded is null');
		}))

		if (!isSettings) {
			queryBuilder.andWhere('st.active = true');
		}

		queryBuilder.orderBy('st.createdAt', 'DESC');

		return queryBuilder.getOne();
	}

	async findActiveUserTargetByStoreAndUser(storeId: number, userId: number) {
		const queryBuilder = this.repository.manager
			.getRepository(UserTarget)
			.createQueryBuilder('ut');
		queryBuilder.innerJoin('ut.store', 'store');
		queryBuilder.innerJoin('ut.user', 'user');
		queryBuilder.innerJoinAndSelect('ut.prizeItem', 'item');
		queryBuilder.andWhere('store.id = :storeId', { storeId });
		queryBuilder.andWhere('user.id = :userId', { userId });
		queryBuilder.andWhere('ut.active = true');

		return queryBuilder.getOne();
	}

	async findTopTenMostSoldItemsByStore(storeId: number) {
		const queryBuilder = this.repository.manager
			.getRepository(Item)
			.createQueryBuilder('item');
		queryBuilder.innerJoinAndSelect('item.sales', 'sale');
		queryBuilder.innerJoin('sale.stores', 'store');
		queryBuilder.andWhere('store.id = :storeId', { storeId });
		queryBuilder.take(10);
		return queryBuilder.getMany();
	}

	async getStoreLastMonthSales(storeId: number) {
		const date = new Date();
		const startDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
		const endDate = new Date(date.getFullYear(), date.getMonth(), 1);

		const queryBuilder = this.repository.manager
			.getRepository(Sale)
			.createQueryBuilder('sale');
		queryBuilder.innerJoin('sale.stores', 'store');
		queryBuilder.andWhere('store.id = :storeId', { storeId });
		queryBuilder.andWhere('CAST(sale.createdAt as DATE) >= CAST(:startDate AS DATE)', { startDate });
		queryBuilder.andWhere('CAST(sale.createdAt as DATE) < CAST(:endDate AS DATE)', { endDate });

		return queryBuilder.getCount();
	}

	async getStoreCurrentMonthSales(storeId: number) {
		const date = new Date();
		const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
		const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

		const queryBuilder = this.repository.manager
			.getRepository(Sale)
			.createQueryBuilder('sale');
		queryBuilder.innerJoin('sale.stores', 'store');
		queryBuilder.andWhere('store.id = :storeId', { storeId });
		queryBuilder.andWhere('CAST(sale.createdAt as DATE) >= CAST(:startDate AS DATE)', { startDate });
		queryBuilder.andWhere('CAST(sale.createdAt as DATE) < CAST(:endDate AS DATE)', { endDate });

		return queryBuilder.getCount();
	}

	async getTotalStoreSales(storeId: number) {
		const queryBuilder = this.repository.manager
			.getRepository(Sale)
			.createQueryBuilder('sale');
		queryBuilder.innerJoin('sale.stores', 'store');
		queryBuilder.andWhere('store.id = :storeId', { storeId });
		return queryBuilder.getCount();
	}
}
