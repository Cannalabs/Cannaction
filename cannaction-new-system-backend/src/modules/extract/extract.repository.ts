import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Brackets, DeepPartial, Repository } from "typeorm";
import { PaginationService } from "../database/pagination.service";
import { PaginationOptionsDto } from "../database/pagination/pagination-options";
import { Extract } from "./extract.entity";

@Injectable()
export class ExtractRepository {
	constructor(
		@InjectRepository(Extract)
		private repository: Repository<Extract>,
		private readonly paginationService: PaginationService
	) {}

	async findByStore(storeId: number, search: string, options: PaginationOptionsDto) {
		const queryBuilder = this.repository.manager
			.getRepository(Extract)
			.createQueryBuilder('extract');
		queryBuilder.innerJoin('extract.store', 'store');
		queryBuilder.andWhere('store.id = :storeId', { storeId });
		queryBuilder.andWhere('extract.user_id is null');

		queryBuilder.select([
			'extract.id',
			'extract.description',
			'extract.operator',
			'extract.points',
			'extract.total',
			'extract.amount',
			'extract.balance',
			'extract.createdAt',
		]);

		if (search) {
			queryBuilder.andWhere(
				new Brackets((qb) => {
					const searchTerm = `%${search.toLowerCase()}%`;
					return qb
						.where('LOWER(extract.description) LIKE :searchTerm', {
							searchTerm,
						})
				})
			);
		}

		queryBuilder.orderBy('extract.createdAt', 'DESC');

		return this.paginationService.paginate<Extract>(options, queryBuilder);
	}

	async findByUser(userId: number, search: string, options: PaginationOptionsDto) {
		const queryBuilder = this.repository.manager
			.getRepository(Extract)
			.createQueryBuilder('extract');
		queryBuilder.innerJoin('extract.user', 'user');
		queryBuilder.leftJoin('extract.item', 'item');
		queryBuilder.andWhere('user.id = :userId', { userId });
		queryBuilder.select([
			'extract.id',
			'extract.description',
			'extract.operator',
			'extract.points',
			'extract.total',
			'extract.amount',
			'extract.balance',
			'extract.createdAt',
		]);

		if (search) {
			queryBuilder.andWhere(
				new Brackets((qb) => {
					const searchTerm = `%${search.toLowerCase()}%`;
					return qb
						.where('LOWER(extract.description) LIKE :searchTerm', {
							searchTerm,
						})
				})
			);
		}

		queryBuilder.orderBy('extract.createdAt', 'DESC');

		return this.paginationService.paginate<Extract>(options, queryBuilder);
	}

	async findByUserAndDescription(userId: number, description: string) {
		const queryBuilder = this.repository.manager
			.getRepository(Extract)
			.createQueryBuilder('extract');
		queryBuilder.innerJoin('extract.user', 'user');
		queryBuilder.andWhere('user.id = :userId', { userId });
		queryBuilder.andWhere('extract.description = :description', { description });
		return queryBuilder.getExists();
	}

	async create(entity: DeepPartial<Extract>) {
		await this.repository.save(entity);
	}
}