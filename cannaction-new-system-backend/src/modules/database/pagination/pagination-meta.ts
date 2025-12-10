import { PaginationMetaParamsDto } from './pagination-meta-params';

export class PaginationMetaDto {
	readonly page: number;

	readonly take: number;

	readonly itemCount: number;

	readonly pageCount: number;

	readonly hasPreviousPage: boolean;

	readonly hasNextPage: boolean;

	constructor({ pageOptionsDto, itemCount }: PaginationMetaParamsDto) {
		this.page = pageOptionsDto.page;
		this.take = pageOptionsDto.take;
		this.itemCount = itemCount;
		this.pageCount = this.take === 0 ? 1 : Math.ceil(this.itemCount / this.take);
		this.hasPreviousPage = this.page > 1;
		this.hasNextPage = this.page < this.pageCount;
	}
}
