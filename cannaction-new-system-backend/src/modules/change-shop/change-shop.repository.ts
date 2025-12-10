
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, DeepPartial, Repository } from 'typeorm';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { PaginationService } from '../database/pagination.service';
import { PaginationOptionsDto } from '../database/pagination/pagination-options';
import { PaginationDto } from '../database/pagination/pagination.dto';
import { UserType } from '../user/enums/user-type.enum';
import { ChangeShop } from './change-shop.entity';

@Injectable()
export class ChangeShopRepository {
	constructor(
		@InjectRepository(ChangeShop)
		private readonly repository: Repository<ChangeShop>,
		private readonly paginationService: PaginationService
	) {}

	async findAnswered(
		currentUser: CurrentUser,
		search: string,
		options: PaginationOptionsDto
	): Promise<PaginationDto<ChangeShop>> {

		const queryBuilder = this.repository.manager
			.getRepository(ChangeShop)
			.createQueryBuilder('cs');
		queryBuilder.innerJoin('cs.originStore', 'store');
		queryBuilder.innerJoin('cs.destinyStore', 'ds');
		queryBuilder.innerJoin('cs.user', 'user');
		queryBuilder.innerJoin('store.country', 'country');
		queryBuilder.andWhere('cs.aproved IS NOT null');

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
						.orWhere('LOWER(user.name) LIKE :searchTerm', {
							searchTerm,
						})
						.orWhere('LOWER(user.lastName) LIKE :searchTerm', {
							searchTerm,
						})
						.orWhere('LOWER(ds.name) LIKE :searchTerm', {
							searchTerm,
						});
				})
			);
		}

		queryBuilder.select([
			'cs.id',
			'cs.reason',
			'cs.aproved',
			'cs.answerDate',
			'cs.createdAt',
			'user.id',
			'user.name',
			'user.lastName',
			'store.id',
			'store.name',
			'ds.id',
			'ds.name',
		]);

		queryBuilder.orderBy('cs.createdAt', 'DESC');
		return this.paginationService.paginate<ChangeShop>(options, queryBuilder);
	}

	async findNotAnswered(
		currentUser: CurrentUser,
		search: string,
		options: PaginationOptionsDto
	): Promise<PaginationDto<ChangeShop>> {

		const queryBuilder = this.repository.manager
			.getRepository(ChangeShop)
			.createQueryBuilder('cs');
		queryBuilder.innerJoin('cs.originStore', 'store');
		queryBuilder.innerJoin('cs.destinyStore', 'ds');
		queryBuilder.innerJoin('cs.user', 'user');
		queryBuilder.andWhere('cs.aproved IS null');

		if (currentUser.userType !== UserType.SUPER) {
			queryBuilder.innerJoin('store.country', 'country');
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
						.orWhere('LOWER(user.name) LIKE :searchTerm', {
							searchTerm,
						})
						.orWhere('LOWER(user.lastName) LIKE :searchTerm', {
							searchTerm,
						})
						.orWhere('LOWER(ds.name) LIKE :searchTerm', {
							searchTerm,
						});
				})
			);
		}

		queryBuilder.select([
			'cs.id',
			'cs.reason',
			'cs.aproved',
			'cs.answerDate',
			'cs.createdAt',
			'user.id',
			'user.name',
			'user.lastName',
			'store.id',
			'store.name',
			'ds.id',
			'ds.name',
		]);

		queryBuilder.orderBy('cs.createdAt', 'DESC');
		return this.paginationService.paginate<ChangeShop>(options, queryBuilder);
	}

	async findForCustomer(customerId: number, options: PaginationOptionsDto) {
		const queryBuilder = this.repository.manager
			.getRepository(ChangeShop)
			.createQueryBuilder('cs');
		queryBuilder.innerJoin('cs.originStore', 'store');
		queryBuilder.innerJoin('cs.destinyStore', 'ds');
		queryBuilder.innerJoin('cs.user', 'user');
		queryBuilder.andWhere('user.id = :customerId', { customerId });

		queryBuilder.select([
			'cs.id',
			'cs.reason',
			'cs.aproved',
			'cs.createdAt',
			'user.lastName',
			'store.id',
			'store.name',
			'ds.id',
			'ds.name',
		]);

		queryBuilder.orderBy('cs.createdAt', 'DESC');
		return this.paginationService.paginate<ChangeShop>(options, queryBuilder);
	}

	async findOne(id: number): Promise<ChangeShop | null> {
		return this.repository.findOne({
			where: { id },
			relations: ['user', 'destinyStore']
		});
	}

	async acceptChangeShop(id: number, accept: boolean): Promise<void> {
		await this.repository.update(id, {
			aproved: accept,
			answerDate: new Date(),
		});
	}

	async create(entity: DeepPartial<ChangeShop>): Promise<ChangeShop | null> {
		const changeShop = await this.repository.save(entity);
		return this.findOne(changeShop.id);
	}
}
