import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { PaginationOptionsDto } from '@/modules/database/pagination/pagination-options';
import { formatDateToYearMonth } from '@/utils/string';
import { Injectable } from '@nestjs/common';
import { FilterStoreTargetReportDto } from '../dtos/requests/filter-store-target-report.dto';
import { PrizeGraphicResponse } from '../dtos/responses/prize-graphic-reponse.dto';
import { StoreTargetMarketingResponse } from '../dtos/responses/store-target-marketing-response.dto';
import { PrizeType } from '../enums/prize-type.enum';
import { StoreTarget } from '../store-target.entity';
import { StoreTargetRepository } from '../store-target.repository';

@Injectable()
export class StoreTargetService {
	constructor(private readonly repository: StoreTargetRepository) {}

	async findForMarketingStoreTargets(currentUser: CurrentUser, filter: FilterStoreTargetReportDto, optionsConcluded: PaginationOptionsDto, optionsNotConcluded: PaginationOptionsDto): Promise<StoreTargetMarketingResponse> {
		const concluded = await this.repository.findAllConcluded(currentUser, filter, optionsConcluded);
		const notConcluded = await this.repository.findAllNotConcluded(currentUser, filter, optionsNotConcluded);
		let prizeGraphicByStore: PrizeGraphicResponse[] = [];
		let prizeGraphicByCountry: PrizeGraphicResponse[] = [];
		if (filter.type === PrizeType.POINTS) {
			prizeGraphicByStore = await this.repository.findPrizeGraphicByStore(currentUser);
			prizeGraphicByCountry = await this.repository.findPrizeGraphicByCountry(currentUser);
		}

		return {
			concluded,
			notConcluded,
			prizeGraphicByStore,
			prizeGraphicByCountry
		}
	}

	async findOne(id: number): Promise<StoreTarget | undefined> {
		return this.repository.findOne(id);
	}

	async findCountByStore(storeId: number) {
		return this.repository.findCountByStore(storeId);
	}

	async storeHasActiveTarget(storeId: number) {
		return this.repository.storeHasActiveTarget(storeId)
	}

	async getPointTargetSum(countryId?: number) {
		const response: { month: string, target: number }[] = [];
		const data = await this.repository.getPointTargetSum(countryId);

		for (const d of data) {
			response.push({ month: formatDateToYearMonth(d.month), target: d.target });
		}

		return response;
	}

	async findAllRequested(currentUser: CurrentUser) {
		return this.repository.findAllRequested(currentUser);
	}
}
