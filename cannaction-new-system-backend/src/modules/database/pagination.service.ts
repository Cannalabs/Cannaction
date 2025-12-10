import { Injectable } from "@nestjs/common";
import {
	paginate,
} from 'nestjs-typeorm-paginate';
import { SelectQueryBuilder } from "typeorm";
import { PaginationMetaDto } from "./pagination/pagination-meta";
import { PaginationOptionsDto } from "./pagination/pagination-options";
import { PaginationDto } from "./pagination/pagination.dto";

@Injectable()
export class PaginationService {

	public async paginate<M>(
		pageOptionsDto: PaginationOptionsDto,
		queryBuilder: SelectQueryBuilder<M>
	): Promise<PaginationDto<M>> {
		const pagination = await paginate<M>(queryBuilder, {
			limit: pageOptionsDto.take,
			page: pageOptionsDto.page,
		});

		const pageMetaDto = new PaginationMetaDto({
			itemCount: pagination.meta.totalItems,
			pageOptionsDto,
		});

		return new PaginationDto<M>(pagination.items, pageMetaDto);
	}
}