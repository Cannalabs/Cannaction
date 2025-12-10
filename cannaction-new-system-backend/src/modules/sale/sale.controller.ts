import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import {
	CurrentUser,
	ReqCurrentUser,
} from '../auth/decorators/current-user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { PaginationOptionsDto } from '../database/pagination/pagination-options';
import { UserType } from '../user/enums/user-type.enum';
import { SaleCreateRequest } from './dtos/requests/create-sale.request';
import { FilterSalesReportDto } from './dtos/requests/filter-sales-report.dto';
import { SalePersistenceService } from './services/sale-persistence.service';
import { SaleService } from './services/sale.service';

@Controller('sale')
export class SaleController {
	constructor(
		private readonly saleService: SaleService,
		private readonly salePersistenceService: SalePersistenceService
	) {}

	@Get('store-user')
	@UseGuards(JwtGuard)
	public async findSalesForStoreUser(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Query() filter: FilterSalesReportDto,
		@Query() options: PaginationOptionsDto
	) {
		return this.saleService.getSalesForStoreUser(currentUser, filter, options);
	}

	@Get('super/most-sold')
	@UseGuards(JwtGuard)
	public async getTopFiveMostSoldItems(@ReqCurrentUser() currentUser: CurrentUser) {
		if (currentUser.userType !== UserType.SUPER) return;
		return this.saleService.getTopFiveMostSoldItems();
	}

	@Get('by-items')
	@UseGuards(JwtGuard)
	public async findSalesByItems(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Query() filter: FilterSalesReportDto,
		@Query() options: PaginationOptionsDto
	) {
		return this.saleService.getSalesByItems(currentUser, filter, options);
	}

	@Get('by-stores')
	@UseGuards(JwtGuard)
	public async findSalesByStores(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Query() filter: FilterSalesReportDto,
		@Query() options: PaginationOptionsDto
	) {
		return this.saleService.getSalesByStores(currentUser, filter, options);
	}

	@UseGuards(JwtGuard)
	@Post()
	public async create(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Body() sale: SaleCreateRequest
	) {
		await this.salePersistenceService.create(currentUser, sale);
	}
}
