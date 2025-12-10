import { Injectable } from "@nestjs/common";
import { PaginationOptionsDto } from "../database/pagination/pagination-options";
import { PaginationDto } from "../database/pagination/pagination.dto";
import { ClubCardCodeList } from "./club-card-code-list.entity";
import { ClubCardCodeListRepository } from "./club-card-code-list.repository";
import { ClubCardCodeListRequest } from "./dtos/club-card-code-list-filter.request";

@Injectable()
export class ClubCardCodeListService {
	constructor(
		private readonly repository: ClubCardCodeListRepository
	) {}

	async findByCode(code: string) {
		return this.repository.findByCode(code);
	}

	async setValidated(id: number) {
		await this.repository.update(id, { validated: true });
	}

	async findAll(filter: ClubCardCodeListRequest, options: PaginationOptionsDto): Promise<PaginationDto<ClubCardCodeList>> {
		return this.repository.findAll(filter, options);
	}
}