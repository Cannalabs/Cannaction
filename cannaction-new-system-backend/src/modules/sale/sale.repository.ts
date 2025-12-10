
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Country } from '../country/country.entity';
import { Store } from '../store/store.entity';
import { UserType } from '../user/enums/user-type.enum';
import { FilterSalesReportDto } from './dtos/requests/filter-sales-report.dto';
import { Sale } from './sale.entity';

@Injectable()
export class SaleRepository {
	constructor(
		@InjectRepository(Sale)
		private repository: Repository<Sale>
	) {}

	async findAll(currentUser: CurrentUser): Promise<Sale[]> {
		if (currentUser.userType === UserType.SUPER)
			return this.repository.find();

		return this.repository.find({
			where: { stores: { country: { id: currentUser.userCountry } } },
		});
	}

	async findOne(currentUser: CurrentUser, id: number): Promise<Sale | null> {
		return this.repository.findOne({
			where: { id },
		});
	}

	async create(
		currentUser: CurrentUser,
		entity: DeepPartial<Sale>
	): Promise<Sale | null> {
		const sale = await this.repository.save(entity);
		return this.findOne(currentUser, sale.id);
	}

	async update(entity: DeepPartial<Sale>): Promise<Sale> {
		const sale = await this.repository.update(entity.id, entity);
		return sale.raw;
	}

	public async addSaleToStore(sale_id: number, store_id: number) {
		const queryBuilder = this.repository.manager
			.getRepository(Store)
			.createQueryBuilder('store');
		queryBuilder.innerJoinAndSelect(
			'store_sale',
			'ss',
			'ss.store_id = :store_id AND ss.sale_id = :sale_id',
			{
				store_id,
				sale_id,
			}
		);

		if (await queryBuilder.getRawOne()) {
			return;
		}

		await this.repository.manager
			.createQueryBuilder()
			.insert()
			.into('store_sale')
			.values({
				sale_id,
				store_id,
			})
			.execute();
	}

	public async getTotalSalesByCountry(countryId: number) {
		const querySales = this.repository.manager.getRepository(Sale).createQueryBuilder('sale');

		querySales.innerJoin('sale.stores', 'store');
		querySales.innerJoin('store.country', 'country');
		querySales.where('country.id = :countryId', { countryId });

		const total = await querySales.getCount();

		const queryBuilder = this.repository.manager
			.getRepository(Country)
			.createQueryBuilder('country');

		queryBuilder.where('country.id = :countryId', { countryId });

		const country = await queryBuilder.getOne();

		return {
			total,
			country: country.name,
		};
	}

	public async getTotalSalesByStore(storeId: number) {
		const querySales = this.repository.manager.getRepository(Sale).createQueryBuilder('sale');

		querySales.innerJoin('sale.stores', 'store');
		querySales.where('store.id = :storeId', { storeId });

		return querySales.getCount();
	}

	public async getSalesByItem(
		itemId: number,
		filter: FilterSalesReportDto,
		countryId?: number
	): Promise<number> {
		const queryBuilder = this.repository.manager
			.getRepository(Sale)
			.createQueryBuilder('sale');

		queryBuilder.innerJoin('sale.item', 'item');

		queryBuilder.andWhere('item.id = :itemId', {
			itemId,
		});
		if (countryId) {
			queryBuilder.innerJoin('sale.stores', 'store');
			queryBuilder.innerJoin('store.country', 'country');
			queryBuilder.andWhere('country.id = :countryId', { countryId });
		}

		if (filter.dateBegin) {
			queryBuilder.andWhere(
				'CAST(sale.createdAt as DATE) >= CAST(:dateBegin AS DATE)',
				{
					dateBegin: filter.dateBegin,
				}
			);
		}
		if (filter.dateEnd) {
			queryBuilder.andWhere(
				'CAST(sale.createdAt as DATE) <= CAST(:dateEnd AS DATE)',
				{
					dateEnd: filter.dateEnd,
				}
			);
		}

		if (filter.storeId) {
			queryBuilder.andWhere('store.id = :storeId', {
				storeId: filter.storeId,
			});
		}

		return queryBuilder.getCount();
	}

	public async getSalesUserStore(
		itemId: number,
		storeId: number,
		dateBegin?: string,
		dateEnd?: string
	): Promise<number> {
		const queryBuilder = this.repository.manager
			.getRepository(Sale)
			.createQueryBuilder('sale');

		queryBuilder.innerJoin('sale.item', 'item');
		queryBuilder.innerJoin('sale.stores', 'store');


		queryBuilder.andWhere('item.id = :itemId', {
			itemId,
		});

		queryBuilder.andWhere('store.id = :storeId', {
			storeId: storeId,
		});

		if (dateBegin) {
			queryBuilder.andWhere(
				'CAST(sale.createdAt as DATE) >= CAST(:dateBegin AS DATE)',
				{
					dateBegin: dateBegin,
				}
			);
		}
		if (dateEnd) {
			queryBuilder.andWhere(
				'CAST(sale.createdAt as DATE) <= CAST(:dateEnd AS DATE)',
				{
					dateEnd: dateEnd,
				}
			);
		}

		return queryBuilder.getCount();
	}

	public async getTopFiveMostSoldItems() {
		const topItens = await this.repository.manager
			.getRepository(Sale)
			.createQueryBuilder('sale')
			.select(["sale.item_id", "COUNT(sale.item_id) AS occurrenceCount"])
			.groupBy('sale.item_id')
			.limit(5).getRawMany();
		return topItens;
	}

	public async getSalesByStore(
		storeId: number,
		filter: FilterSalesReportDto
	): Promise<number> {

		const queryBuilder = this.repository.manager
			.getRepository(Sale)
			.createQueryBuilder('sale');

		queryBuilder.innerJoinAndSelect('sale.stores', 'store');
		queryBuilder.innerJoin('store.country', 'country');

		queryBuilder.andWhere('store.id = :storeId', {
			storeId: storeId,
		});

		if (filter.dateBegin) {
			queryBuilder.andWhere(
				'CAST(sale.createdAt as DATE) >= CAST(:dateBegin AS DATE)',
				{
					dateBegin: filter.dateBegin,
				}
			);
		}
		if (filter.dateEnd) {
			queryBuilder.andWhere(
				'CAST(sale.createdAt as DATE) <= CAST(:dateEnd AS DATE)',
				{
					dateEnd: filter.dateEnd,
				}
			);
		}

		if (filter.itemId) {
			queryBuilder.innerJoin('sale.item', 'item');
			queryBuilder.andWhere('item.id = :itemId', {
				itemId: filter.itemId,
			});
		}

		if (filter.search) {
			const searchTerm = `%${filter.search.toLowerCase()}%`;
			queryBuilder.andWhere(
				'LOWER(store.name) LIKE :searchTerm', {
				searchTerm,
			})
		}

		return queryBuilder.getCount();
	}

	public async getSalesCountByStore(
		storeId: number,
	): Promise<number> {

		const queryBuilder = this.repository.manager
			.getRepository(Sale)
			.createQueryBuilder('sale');

		queryBuilder.innerJoinAndSelect('sale.stores', 'store');

		queryBuilder.andWhere('store.id = :storeId', {
			storeId: storeId,
		});

		return queryBuilder.getCount();
	}
}
