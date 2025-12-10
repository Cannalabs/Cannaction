import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { PaginationService } from '../database/pagination.service';
import { PaginationOptionsDto } from '../database/pagination/pagination-options';
import { PaginationDto } from '../database/pagination/pagination.dto';
import { ClubCardCodeList } from './club-card-code-list.entity';
import { ClubCardCodeListRequest } from './dtos/club-card-code-list-filter.request';

@Injectable()
export class ClubCardCodeListRepository {
	constructor(
		@InjectRepository(ClubCardCodeList)
		private repository: Repository<ClubCardCodeList>,
		private readonly paginationService: PaginationService
	) {}

	async findAll(filter: ClubCardCodeListRequest, options: PaginationOptionsDto): Promise<PaginationDto<ClubCardCodeList>> {
		const queryBuilder = this.repository.manager
			.getRepository(ClubCardCodeList)
			.createQueryBuilder('codeList');

		if (filter.search) {
			const searchTerm = `%${filter.search.toLowerCase()}%`;
			queryBuilder.andWhere(
				'LOWER(codeList.code) LIKE :searchTerm', {
				searchTerm,
			})
		}

		queryBuilder.orderBy('codeList.code', 'ASC');
		return this.paginationService.paginate<ClubCardCodeList>(options, queryBuilder);
	}

	async findByCode(code: string): Promise<ClubCardCodeList | null> {
		return this.repository.findOne({
			where: { code },
		});
	}

	async update(id: number, entity: DeepPartial<ClubCardCodeList>) {
		await this.repository.update(id, entity);
	}
}
