import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Brackets, DeepPartial, Repository } from "typeorm";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { PaginationService } from "../database/pagination.service";
import { PaginationOptionsDto } from "../database/pagination/pagination-options";
import { PaginationDto } from "../database/pagination/pagination.dto";
import FilterStockRequest from "./dtos/requests/filter-stock.request";
import { Stock } from "./stock.entity";

@Injectable()
export class StockRepository {
	constructor(
		@InjectRepository(Stock)
		private repository: Repository<Stock>,
		private readonly paginationService: PaginationService
	) {}

	async findByStore(
		currentUser: CurrentUser,
		filter: FilterStockRequest,
		storeId: number,
		options: PaginationOptionsDto
	): Promise<PaginationDto<Stock>> {
		const queryBuilder = this.repository.manager
			.getRepository(Stock)
			.createQueryBuilder('stock');
		queryBuilder.innerJoin('stock.store', 'store');
		queryBuilder.innerJoin('stock.item', 'item');
		queryBuilder.andWhere('store.id = :storeId', { storeId });

		if (filter.search) {
			queryBuilder.andWhere(
				new Brackets((qb) => {
					const searchTerm = `%${filter.search.toLowerCase()}%`;
					return qb
						.where('LOWER(item.name) LIKE :searchTerm', {
							searchTerm,
						})
				})
			)
		}

		queryBuilder.select([
			'stock.id',
			'stock.updatedAt',
			'stock.input',
			'stock.minimumAmount',
			'stock.output',
			'stock.total',
			'item.id',
			'item.name'
		]);
		queryBuilder.orderBy('stock.updatedAt', 'DESC');

		return this.paginationService.paginate<Stock>(options, queryBuilder);
	}

	async findForSales(storeId: number) {
		const queryBuilder = this.repository.manager
			.getRepository(Stock)
			.createQueryBuilder('stock');
		queryBuilder.innerJoin('stock.store', 'store');
		queryBuilder.innerJoin('stock.item', 'item');
		queryBuilder.andWhere('store.id = :storeId', { storeId });
		queryBuilder.andWhere('stock.total > 0');
		queryBuilder.andWhere('item.active = true');
		queryBuilder.andWhere('item.exchange = false');

		queryBuilder.select([
			'stock.id',
			'stock.total',
			'item.id',
			'item.image',
			'item.name',
			'item.points'
		]);

		return queryBuilder.getMany()
	}

	async findCountByStore(storeId: number) {
		const queryBuilder = this.repository.manager
			.getRepository(Stock)
			.createQueryBuilder('stock');
		queryBuilder.innerJoin('stock.store', 'store');
		queryBuilder.andWhere('store.id = :storeId', { storeId });

		return queryBuilder.getMany();
	}

	async findCountByStoreAndItem(itemId: number, storeId: number) {
		const queryBuilder = this.repository.manager
			.getRepository(Stock)
			.createQueryBuilder('stock');
		queryBuilder.innerJoin('stock.store', 'store');
		queryBuilder.innerJoin('stock.item', 'item')
		queryBuilder.andWhere('store.id = :storeId', { storeId });
		queryBuilder.andWhere('item.id = :itemId', { itemId });
		return queryBuilder.getOne();
	}

	async findOne(stockId: number) {
		return this.repository.findOne({ where: { id: stockId } });
	}

	async findByStoreAndItem(storeId: number, itemId: number) {
		return this.repository.findOne({ where: { store: { id: storeId }, item: { id: itemId } } });
	}

	async update(entity: DeepPartial<Stock>) {
		await this.repository.update(entity.id, entity);
	}

	async create(entity: DeepPartial<Stock>) {
		await this.repository.save(entity);
	}
}