
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, DeepPartial, Repository } from 'typeorm';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { PaginationService } from '../database/pagination.service';
import { PaginationOptionsDto } from '../database/pagination/pagination-options';
import { PaginationDto } from '../database/pagination/pagination.dto';
import { UserType } from '../user/enums/user-type.enum';
import { Coupon } from './coupon.entity';
import { FindCouponsForMarketingRequest } from './dtos/requests/find-coupons-for-marketing.request';

@Injectable()
export class CouponRepository {
	constructor(
		@InjectRepository(Coupon)
		private repository: Repository<Coupon>,
		private readonly paginationService: PaginationService
	) {}

	async findAll(currentUser: CurrentUser): Promise<Coupon[]> {
		if (currentUser.userType === UserType.SUPER)
			return this.repository.find({
				relations: ['item', 'store', 'store.country', 'promotion'],
			});

		return this.repository.find({
			relations: ['item', 'store', 'store.country', 'promotion'],
			where: { store: { country: { id: currentUser.userCountry } } },
		});
	}

	async findOne(id: number): Promise<Coupon> {
		return this.repository.findOne({ where: { id } });
	}

	async findCreatedByUserAndPromotion(userId: number, promotionId: number) {
		return this.repository.findOne({
			where: {
				user: {
					id: userId
				},
				promotion: {
					id: promotionId
				}
			}
		})
	}

	async findCheckedForMarketing(
		request: FindCouponsForMarketingRequest,
		options: PaginationOptionsDto
	): Promise<PaginationDto<Coupon>> {

		const queryBuilder = this.repository.manager
			.getRepository(Coupon)
			.createQueryBuilder('coupon');
		queryBuilder.innerJoin('coupon.user', 'user');
		queryBuilder.innerJoin('coupon.item', 'item');
		queryBuilder.innerJoin('coupon.promotion', 'promotion');
		queryBuilder.innerJoin('coupon.store', 'store');
		queryBuilder.innerJoin('store.country', 'country');

		queryBuilder.andWhere('coupon.checked = true');

		if (request.countryId) {
			queryBuilder.andWhere('country.id = :countryId', {
				countryId: +request.countryId,
			});
		}

		if (request.itemId) {
			queryBuilder.andWhere('item.id = :itemId', { itemId: +request.itemId });
		}

		if (request.storeId) {
			queryBuilder.andWhere('store.id = :storeId', { storeId: +request.storeId });
		}

		if (request.search) {
			queryBuilder.andWhere(
				new Brackets((qb) => {
					const searchTerm = `%${request.search.toLowerCase()}%`;

					return qb
						.where('LOWER(item.name) LIKE :searchTerm', {
							searchTerm,
						})
						.orWhere('LOWER(store.name) LIKE :searchTerm', {
							searchTerm,
						})
						.orWhere('LOWER(user.name) LIKE :searchTerm', {
							searchTerm,
						})
						.orWhere('LOWER(user.lastName) LIKE :searchTerm', {
							searchTerm,
						})
						.orWhere('LOWER(coupon.keyCode) LIKE :searchTerm', {
							searchTerm,
						})
				})
			);
		}

		if (request.dateBegin) {
			queryBuilder.andWhere(
				'CAST(coupon.checkedDate as DATE) >= CAST(:dateBegin AS DATE)',
				{
					dateBegin: request.dateBegin,
				}
			);
		}

		if (request.dateEnd) {
			queryBuilder.andWhere(
				'CAST(coupon.checkedDate as DATE) <= CAST(:endDate AS DATE)',
				{
					endDate: request.dateEnd,
				}
			);
		}

		queryBuilder.select([
			'coupon.id',
			'coupon.keyCode',
			'coupon.checkedDate',
			'coupon.description',
			'item.id',
			'item.name',
			'user.id',
			'user.name',
			'user.lastName',
			'store.id',
			'store.name',
			'country.id',
			'country.name',
			'promotion.id',
			'promotion.name',
		]);

		return this.paginationService.paginate<Coupon>(options, queryBuilder);
	}

	async findForCustomer(
		currentUser: CurrentUser,
		filter: FindCouponsForMarketingRequest,
		options: PaginationOptionsDto
	): Promise<PaginationDto<Coupon>> {
		const queryBuilder = this.repository.manager
			.getRepository(Coupon)
			.createQueryBuilder('coupon');
		queryBuilder.innerJoin('coupon.user', 'user');
		queryBuilder.innerJoin('coupon.item', 'item');
		queryBuilder.leftJoin('coupon.promotion', 'promotion');
		queryBuilder.innerJoin('coupon.store', 'store');
		queryBuilder.andWhere('user.id = :userId', { userId: currentUser.userId });

		if (filter.search) {
			queryBuilder.andWhere(
				new Brackets((qb) => {
					const searchTerm = `%${filter.search.toLowerCase()}%`;

					return qb
						.where('LOWER(item.name) LIKE :searchTerm', {
							searchTerm,
						})
						.orWhere('LOWER(store.name) LIKE :searchTerm', {
							searchTerm,
						})
						.orWhere('LOWER(coupon.keyCode) LIKE :searchTerm', {
							searchTerm,
						})
						.orWhere('LOWER(promotion.name) LIKE :searchTerm', {
							searchTerm
						})
				})
			);
		}

		queryBuilder.select([
			'coupon.id',
			'coupon.keyCode',
			'coupon.checkedDate',
			'coupon.checked',
			'coupon.createdAt',
			'coupon.itemAmount',
			'item.id',
			'item.name',
			'store.id',
			'store.name',
			'promotion.id',
			'promotion.name',
		]);

		return this.paginationService.paginate<Coupon>(options, queryBuilder);
	}

	async findAllChecked(
		currentUser: CurrentUser,
		search: string,
		options: PaginationOptionsDto
	): Promise<PaginationDto<Coupon>> {

		const queryBuilder = this.repository.manager
			.getRepository(Coupon)
			.createQueryBuilder('coupon');
		queryBuilder.innerJoin('coupon.user', 'user');
		queryBuilder.leftJoin('coupon.promotion', 'promotion');
		queryBuilder.innerJoin('coupon.store', 'store');
		queryBuilder.innerJoin('store.country', 'country');
		queryBuilder.leftJoin('store.state', 'state');
		queryBuilder.leftJoin('store.city', 'city');

		queryBuilder.andWhere('coupon.checked = true');

		if (currentUser.userType !== UserType.SUPER) {
			queryBuilder.andWhere('country.id = :countryId', {
				countryId: currentUser.userCountry,
			});
		}

		if (search) {
			queryBuilder.andWhere(
				new Brackets((qb) => {
					const searchTerm = `%${search.toLowerCase()}%`;
					return qb
						.where('LOWER(store.name) LIKE :searchTerm', {
							searchTerm,
						})
						.orWhere('LOWER(coupon.keyCode) like :searchTerm', {
							searchTerm
						})
						.orWhere('LOWER(user.name) LIKE :searchTerm', {
							searchTerm,
						})
						.orWhere('LOWER(user.lastName) LIKE :searchTerm', {
							searchTerm,
						})
						.orWhere('LOWER(promotion.name) LIKE :searchTerm', {
							searchTerm,
						});
				})
			);
		}

		queryBuilder.select([
			'coupon.id',
			'coupon.keyCode',
			'coupon.createdAt',
			'coupon.checkedDate',
			'coupon.checked',
			'coupon.itemAmount',
			'user.id',
			'user.name',
			'user.lastName',
			'user.email',
			'store.id',
			'store.name',
			'country.id',
			'country.name',
			'promotion.id',
			'promotion.name',
			'state.id',
			'state.name',
			'city.id',
			'city.name',
		]);
		queryBuilder.orderBy('coupon.checkedDate', 'DESC');

		return this.paginationService.paginate<Coupon>(options, queryBuilder);
	}

	async findAllCheckedUserStore(
		storeId: number,
		search: string,
		options: PaginationOptionsDto
	): Promise<PaginationDto<Coupon>> {
		const queryBuilder = this.repository.manager
			.getRepository(Coupon)
			.createQueryBuilder('coupon');
		queryBuilder.innerJoin('coupon.item', 'item');
		queryBuilder.innerJoin('coupon.user', 'user');
		queryBuilder.innerJoin('coupon.store', 'store');
		queryBuilder.leftJoin('coupon.promotion', 'promotion');

		queryBuilder.andWhere('coupon.checked = true');
		queryBuilder.andWhere('store.id = :storeId', { storeId });

		if (search) {
			queryBuilder.andWhere(
				new Brackets((qb) => {
					const searchTerm = `%${search.toLowerCase()}%`;
					return qb
						.where('LOWER(store.name) LIKE :searchTerm', {
							searchTerm,
						})
						.orWhere('LOWER(coupon.keyCode) like :searchTerm', {
							searchTerm
						})
						.orWhere('LOWER(user.name) LIKE :searchTerm', {
							searchTerm,
						})
						.orWhere('LOWER(user.lastName) LIKE :searchTerm', {
							searchTerm,
						})
						.orWhere('LOWER(promotion.name) LIKE :searchTerm', {
							searchTerm,
						});
				})
			);
		}
		queryBuilder.select([
			'coupon.id',
			'coupon.keyCode',
			'coupon.createdAt',
			'coupon.checkedDate',
			'coupon.checked',
			'coupon.itemAmount',
			'item.id',
			'item.name',
			'user.id',
			'user.name',
			'user.lastName',
			'promotion.id',
			'promotion.name'
		]);
		queryBuilder.orderBy('coupon.checkedDate', 'DESC');

		return this.paginationService.paginate<Coupon>(options, queryBuilder);
	}

	async findAllNotChecked(
		currentUser: CurrentUser,
		search: string,
		options: PaginationOptionsDto
	): Promise<PaginationDto<Coupon>> {
		const queryBuilder = this.repository.manager
			.getRepository(Coupon)
			.createQueryBuilder('coupon');
		queryBuilder.innerJoin('coupon.user', 'user');
		queryBuilder.leftJoin('coupon.promotion', 'promotion');
		queryBuilder.innerJoin('coupon.store', 'store');
		queryBuilder.innerJoin('store.country', 'country');
		queryBuilder.leftJoin('store.state', 'state');
		queryBuilder.leftJoin('store.city', 'city');
		queryBuilder.andWhere('coupon.checked = false');

		if (currentUser.userType !== UserType.SUPER) {
			queryBuilder.andWhere('country.id = :countryId', {
				countryId: currentUser.userCountry,
			});
		}

		if (search) {
			queryBuilder.andWhere(
				new Brackets((qb) => {
					const searchTerm = `%${search.toLowerCase()}%`;
					return qb
						.where('LOWER(store.name) LIKE :searchTerm', {
							searchTerm,
						})
						.orWhere('LOWER(coupon.keyCode) like :searchTerm', {
							searchTerm
						})
						.orWhere('LOWER(user.name) LIKE :searchTerm', {
							searchTerm,
						})
						.orWhere('LOWER(user.lastName) LIKE :searchTerm', {
							searchTerm,
						})
						.orWhere('LOWER(promotion.name) LIKE :searchTerm', {
							searchTerm,
						});
				})
			);
		}

		queryBuilder.select([
			'coupon.id',
			'coupon.keyCode',
			'coupon.checked',
			'coupon.description',
			'coupon.createdAt',
			'coupon.itemAmount',
			'user.id',
			'user.name',
			'user.lastName',
			'user.email',
			'store.id',
			'store.name',
			'country.id',
			'country.name',
			'promotion.id',
			'promotion.name',
			'state.id',
			'state.name',
			'city.id',
			'city.name',
		]);

		return this.paginationService.paginate<Coupon>(options, queryBuilder);
	}

	async findAllNotCheckedUserStore(
		storeId: number,
		search: string,
		options: PaginationOptionsDto
	): Promise<PaginationDto<Coupon>> {

		const queryBuilder = this.repository.manager
			.getRepository(Coupon)
			.createQueryBuilder('coupon');
		queryBuilder.innerJoin('coupon.item', 'item');
		queryBuilder.innerJoin('coupon.user', 'user');
		queryBuilder.innerJoin('coupon.store', 'store');
		queryBuilder.leftJoin('coupon.promotion', 'promotion');

		queryBuilder.andWhere('coupon.checked = false');
		queryBuilder.andWhere('store.id = :storeId', { storeId });

		if (search) {
			queryBuilder.andWhere(
				new Brackets((qb) => {
					const searchTerm = `%${search.toLowerCase()}%`;
					return qb
						.where('LOWER(store.name) LIKE :searchTerm', {
							searchTerm,
						})
						.orWhere('LOWER(coupon.keyCode) like :searchTerm', {
							searchTerm
						})
						.orWhere('LOWER(user.name) LIKE :searchTerm', {
							searchTerm,
						})
						.orWhere('LOWER(user.lastName) LIKE :searchTerm', {
							searchTerm,
						})
				})
			);
		}

		queryBuilder.select([
			'coupon.id',
			'coupon.keyCode',
			'coupon.description',
			'coupon.createdAt',
			'coupon.checked',
			'coupon.itemAmount',
			'item.id',
			'item.name',
			'user.id',
			'user.name',
			'user.lastName',
			'promotion.id',
			'promotion.name'
		]);
		queryBuilder.orderBy('coupon.createdAt', 'DESC');

		return this.paginationService.paginate<Coupon>(options, queryBuilder);
	}

	async findValidatedCountByStore(storeId: number) {
		const queryBuilder = this.repository.manager
			.getRepository(Coupon)
			.createQueryBuilder('coupon');
		queryBuilder.innerJoin('coupon.store', 'store');
		queryBuilder.andWhere('coupon.checkedDate IS NOT NULL');
		queryBuilder.andWhere('store.id = :storeId', { storeId });

		return queryBuilder.getCount();
	}

	async findByPromotionId(id: number): Promise<Coupon[]> {
		return this.repository.find({ where: { promotion: { id } } });
	}

	async markChecked(id: number): Promise<void> {
		await this.repository.update(id, {
			checked: true,
			checkedDate: new Date(),
		});
	}

	async create(entity: DeepPartial<Coupon>) {
		const coupon = await this.repository.save(entity);
		return this.findOne(coupon.id)
	}

	async update(entity: Coupon): Promise<Coupon> {
		const promotion = await this.repository.update(entity.id, entity);
		return promotion.raw;
	}
}
