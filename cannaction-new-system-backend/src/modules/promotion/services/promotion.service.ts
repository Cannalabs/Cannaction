import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { PaginationOptionsDto } from '@/modules/database/pagination/pagination-options';
import { PaginationDto } from '@/modules/database/pagination/pagination.dto';
import { UserService } from '@/modules/user/services/user.service';
import { Injectable } from '@nestjs/common';
import { FilterPromotionReportDto } from '../dtos/requests/filter-promotion-report.dto';
import { Promotion } from '../promotion.entity';
import { PromotionRepository } from '../repositories/promotion.repository';

@Injectable()
export class PromotionService {
	constructor(
		private readonly promotionRepository: PromotionRepository,
		private readonly userService: UserService
	) {}

	async findAll(
		currentUser: CurrentUser,
		filter: FilterPromotionReportDto,
		options: PaginationOptionsDto
	): Promise<PaginationDto<Promotion>> {
		return this.promotionRepository.findAll(currentUser, filter, options);
	}

	async findAllForStoreUser(
		currentUser: CurrentUser,
		filter: FilterPromotionReportDto,
		options: PaginationOptionsDto
	): Promise<PaginationDto<Promotion>> {
		const user = await this.userService.findOne(currentUser.userId);
		return this.promotionRepository.findAllForStoreUser(user.store ? user.store.id : 0, filter, options);

	}

	async findAllForCustomerUser(currentUser: CurrentUser) {
		const user = await this.userService.findOne(currentUser.userId);
		return this.promotionRepository.findAllForUserCustomer(user.store.id);
	}

	async findOne(id: number): Promise<Promotion | undefined> {
		return this.promotionRepository.findOne(id);
	}

	async findLabeled(countryId: number): Promise<Promotion[]> {
		return this.promotionRepository.findLabeled(countryId);
	}

	async findByCountry(countryId: number): Promise<Promotion[]> {
		return this.promotionRepository.findByCountryId(countryId);
	}
}
