import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { PaginationService } from '@/modules/database/pagination.service';
import { PaginationOptionsDto } from '@/modules/database/pagination/pagination-options';
import { PaginationDto } from '@/modules/database/pagination/pagination.dto';
import { FilterSalesReportDto } from '@/modules/sale/dtos/requests/filter-sales-report.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, DeepPartial, Repository } from 'typeorm';
import { FindAllItemsRequest } from '../dtos/requests/find-all-items.request';
import { FindLabeledItemsRequest } from '../dtos/requests/find-labeled-items.request';
import { Item } from '../item.entity';

@Injectable()
export class ItemRepository {
	constructor(
		@InjectRepository(Item)
		private repository: Repository<Item>,
		private readonly paginationService: PaginationService
	) {}

	async findAll(currentUser: CurrentUser, search: string, options: PaginationOptionsDto): Promise<PaginationDto<Item>> {
		const queryBuilder = this.repository.manager
			.getRepository(Item)
			.createQueryBuilder('item');

		if (search) {
			queryBuilder.andWhere(
				new Brackets((qb) => {
					const searchTerm = `%${search.toLowerCase()}%`;
					const pointsSearch = parseInt(search, 10);
					if (!isNaN(pointsSearch)) {
						return qb.where('item.points = :pointsSearch', {
							pointsSearch
						})
					}
					return qb
						.where('LOWER(item.name) LIKE :searchTerm', {
							searchTerm,
						})
						.orWhere('LOWER(item.description) LIKE :searchTerm', {
							searchTerm,
						});
				})
			);
		}

		// if (currentUser.userType !== UserType.SUPER) {
		// 	queryBuilder.innerJoin('item.stores', 'store');
		// 	queryBuilder.innerJoin('store.country', 'country');
		// 	queryBuilder.andWhere('country.id = :countryId', {
		// 		countryId: currentUser.userCountry,
		// 	});
		// }

		queryBuilder.orderBy('item.createdAt', 'DESC');
		return this.paginationService.paginate<Item>(options, queryBuilder);
	}

	async findByBarcode(currentUser: CurrentUser, barcode: string) {
		const queryBuilder = this.repository.manager
			.getRepository(Item)
			.createQueryBuilder('item');
		queryBuilder.innerJoinAndSelect('item.barcodes', 'barcode');
		queryBuilder.andWhere('barcode.barcode = :barcode', { barcode });
		queryBuilder.andWhere('barcode.country_id = :country', { country: currentUser.userCountry });
		queryBuilder.select(['item.id', 'item.name']);
		return queryBuilder.getOne();
	}

	async findByBarcodeWithoutCountry(currentUser: CurrentUser, barcode: string) {
		const queryBuilder = this.repository.manager
			.getRepository(Item)
			.createQueryBuilder('item');
		queryBuilder.innerJoinAndSelect('item.barcodes', 'barcode');
		queryBuilder.innerJoinAndSelect('barcode.country', 'country');
		queryBuilder.andWhere('barcode.barcode = :barcode', { barcode });
		queryBuilder.andWhere('country.id = :country', { country: currentUser.userCountry });
		queryBuilder.select(['item.id', 'item.name']);
		return queryBuilder.getOne();
	}

	async findAllUserStore(storeId: number, search: string, options: PaginationOptionsDto): Promise<PaginationDto<Item>> {
		const queryBuilder = this.repository.manager
			.getRepository(Item)
			.createQueryBuilder('item');
		queryBuilder.andWhere('item.active = true');

		if (search) {
			queryBuilder.andWhere(
				new Brackets((qb) => {
					const searchTerm = `%${search.toLowerCase()}%`;
					const pointsSearch = parseInt(search, 10);
					if (!isNaN(pointsSearch)) {
						return qb.where('item.points = :pointsSearch', {
							pointsSearch
						})
					}
					return qb
						.where('LOWER(item.name) LIKE :searchTerm', {
							searchTerm,
						})
						.orWhere('LOWER(item.description) LIKE :searchTerm', {
							searchTerm,
						});
				})
			);
		}

		queryBuilder.innerJoin('item.stores', 'store');
		queryBuilder.andWhere('store.id = :storeId', {
			storeId,
		});

		queryBuilder.orderBy('item.createdAt', 'DESC');
		return this.paginationService.paginate<Item>(options, queryBuilder);
	}


	async findListLabeled(filter?: FindLabeledItemsRequest) {
		const queryBuilder = this.repository.manager
			.getRepository(Item)
			.createQueryBuilder('item');
		queryBuilder.andWhere('item.active = true');
		if (filter.exchange) {
			queryBuilder.andWhere('item.exchange = :exchange', { exchange: filter.exchange });
		}
		queryBuilder.orderBy('item.name', 'ASC');
		return queryBuilder.getMany();

	}

	async findForSales(options: PaginationOptionsDto, filter: FilterSalesReportDto, countryId?: number): Promise<PaginationDto<Item>> {
		const queryBuilder = this.repository.manager
			.getRepository(Item)
			.createQueryBuilder('item');
		queryBuilder.andWhere('item.exchange = false');
		queryBuilder.andWhere('item.active = true');

		// if (countryId) {
		// 	queryBuilder.innerJoin('item.stores', 'store');
		// 	queryBuilder.innerJoin('store.country', 'country');
		// 	queryBuilder.andWhere('country.id = :countryId', { countryId });
		// }
		if (filter.itemId) {
			queryBuilder.andWhere('item.id = :itemId', { itemId: filter.itemId });
		}
		if (filter.search) {
			queryBuilder.andWhere(
				new Brackets((qb) => {
					const searchTerm = `%${filter.search.toLowerCase()}%`;
					return qb
						.where('LOWER(item.name) LIKE :searchTerm', {
							searchTerm,
						})
						.orWhere('LOWER(item.description) LIKE :searchTerm', {
							searchTerm,
						});
				})
			);
		}

		queryBuilder.orderBy('item.createdAt', 'DESC');
		return this.paginationService.paginate<Item>(options, queryBuilder);
	}

	async findForSalesStoreUser(storeId: number, options: PaginationOptionsDto, filter: FilterSalesReportDto): Promise<PaginationDto<Item>> {
		const queryBuilder = this.repository.manager
			.getRepository(Item)
			.createQueryBuilder('item');
		queryBuilder.andWhere('item.active = true');
		queryBuilder.andWhere('item.exchange = false');
		queryBuilder.innerJoin('item.stores', 'store');
		queryBuilder.andWhere('store.id = :storeId', { storeId });

		if (filter.itemId) {
			queryBuilder.andWhere('item.id = :itemId', { itemId: filter.itemId });
		}

		if (filter.search) {
			queryBuilder.andWhere(
				new Brackets((qb) => {
					const searchTerm = `%${filter.search.toLowerCase()}%`;
					return qb
						.where('LOWER(item.name) LIKE :searchTerm', {
							searchTerm,
						})
						.orWhere('LOWER(item.description) LIKE :searchTerm', {
							searchTerm,
						});
				})
			);
		}

		queryBuilder.orderBy('item.name', 'ASC');

		return this.paginationService.paginate<Item>(options, queryBuilder);
	}

	async findForPointsStatement(storeId: number, filter: FindAllItemsRequest) {
		const queryBuilder = this.repository.manager
			.getRepository(Item)
			.createQueryBuilder('item');
		queryBuilder.andWhere('item.active = true');
		queryBuilder.andWhere('item.exchange = false');

		if (filter.search) {
			queryBuilder.andWhere(
				new Brackets((qb) => {
					const searchTerm = `%${filter.search.toLowerCase()}%`;
					return qb
						.where('LOWER(item.name) LIKE :searchTerm', {
							searchTerm,
						})
						.orWhere('LOWER(item.description) LIKE :searchTerm', {
							searchTerm,
						});
				})
			);
		}

		queryBuilder.select(['item.id', 'item.name', 'item.points', 'item.image']);
		queryBuilder.orderBy('item.name', 'ASC');

		return queryBuilder.getMany()
	}

	async findOne(id: number): Promise<Item | null> {
		return this.repository.findOne({
			where: { id },
			relations: ['stores', 'barcodes', 'barcodes.country']
		});
	}

	async inactive(id: number): Promise<void> {
		await this.repository.update(id, { active: false });
	}

	async active(id: number): Promise<void> {
		await this.repository.update(id, { active: true });
	}

	async create(entity: DeepPartial<Item>): Promise<Item | null> {
		const item = await this.repository.save(entity);
		return this.findOne(item.id);
	}

	async update(id: number, entity: DeepPartial<Item>): Promise<Item> {
		await this.repository.update(id, entity);
		return this.findOne(id);
	}

	async deleteItem(id: number): Promise<void> {
		await this.repository.delete(id);
	}

	async findForExchange() {
		const queryBuilder = this.repository.manager
			.getRepository(Item)
			.createQueryBuilder('item');
		queryBuilder.andWhere('item.exchange = true');
		queryBuilder.andWhere('item.active = true');
		return queryBuilder.getMany();
	}

	async addItemStore(
		itemId: number,
		storeId: number
	) {
		const queryBuilder = this.repository.manager
			.getRepository(Item)
			.createQueryBuilder('item');
		queryBuilder.innerJoinAndSelect(
			'item_store',
			'item_store',
			'item_store.item_id = :itemId AND item_store.store_id = :storeId',
			{
				itemId,
				storeId,
			}
		);
		if (await queryBuilder.getRawOne()) return;

		await this.repository.manager
			.createQueryBuilder()
			.insert()
			.into('item_store')
			.values({
				item_id: itemId,
				store_id: storeId,
			})
			.execute();
	}

	async removeItemStores(
		itemId: number
	) {

		const queryBuilder = this.repository.manager
			.getRepository(Item)
			.createQueryBuilder('item');
		queryBuilder.innerJoinAndSelect(
			'item_store',
			'item_store',
			'item_store.item_id = :itemId',
			{
				itemId
			}
		);
		if (!(await queryBuilder.getRawOne())) return;

		await this.repository.manager
			.createQueryBuilder()
			.delete()
			.from('item_store')
			.where('item_id = :itemId', {
				itemId,
			})
			.execute();
	}
}
