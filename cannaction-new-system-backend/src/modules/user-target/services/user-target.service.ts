import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { PaginationOptionsDto } from '@/modules/database/pagination/pagination-options';
import { Injectable } from '@nestjs/common';
import { FilterUserTargetReportDto } from '../dtos/requests/filter-user-target-report.dto';
import { UserTargetMarketingResponse } from '../dtos/responses/user-target-marketing-response.dto';
import { UserTarget } from '../user-target.entity';
import { UserTargetRepository } from '../user-target.repository';

@Injectable()
export class UserTargetService {
	constructor(private readonly repository: UserTargetRepository) {}

	async findForMarketingUserTargets(currentUser: CurrentUser, filter: FilterUserTargetReportDto, optionsConcluded: PaginationOptionsDto, optionsNotConcluded: PaginationOptionsDto): Promise<UserTargetMarketingResponse> {
		const concluded = await this.repository.findAllConcluded(currentUser, filter, optionsConcluded);
		const notConcluded = await this.repository.findAllNotConcluded(currentUser, filter, optionsNotConcluded);

		return {
			concluded,
			notConcluded,
		}
	}

	async findOne(id: number): Promise<UserTarget | undefined> {
		return this.repository.findOne(id);
	}

	async getActiveStoreTargetForStoreSettings(storeId: number) {
		return this.repository.getActiveStoreTargetForStoreSettings(storeId)
	}

	async findAllRequested(currentUser: CurrentUser) {
		return this.repository.findAllRequested(currentUser);
	}

	async findByUser(userId: number, storeId: number) {
		return this.repository.findByUser(userId, storeId);
	}
}
