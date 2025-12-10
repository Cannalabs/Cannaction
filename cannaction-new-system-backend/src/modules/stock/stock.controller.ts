import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { CurrentUser, ReqCurrentUser } from "../auth/decorators/current-user.decorator";
import { JwtGuard } from "../auth/guards/jwt.guard";
import FilterStockRequest from "./dtos/requests/filter-stock.request";
import { StockPersistenceService } from "./services/stock-persistence.service";
import { StockService } from "./services/stock.service";

@Controller('stock')
export class StockController {
	constructor(
		private readonly stockService: StockService,
		private readonly stockPersistenceService: StockPersistenceService
	) {}

	@Get(':id')
	async getStockForStoreSettings(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Param('id') id: number,
		@Query() filter: FilterStockRequest,
	) {
		return this.stockService.findForStoreSettings(
			currentUser,
			id,
			filter,
			{ page: filter.page, take: filter.take, skip: filter.page - 1 * filter.take }
		);
	}

	@Get('store-dashboard')
	async getStockForStoreDashboard(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Query() filter: FilterStockRequest,
	) {
		return this.stockService.findForStoreDashboard(
			currentUser,
			filter,
			{ page: filter.page, take: filter.take, skip: filter.page - 1 * filter.take }
		);
	}

	@Get('item-count/:id')
	async getCountByItemAndStore(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Param('id') id: number
	) {
		return this.stockService.findCountByStoreAndItem(currentUser, id);
	}


	@UseGuards(JwtGuard)
	@Get('for-sales')
	async getAvailableItemsForSale(
		@ReqCurrentUser() currentUser: CurrentUser
	) {
		return this.stockService.findForSales(currentUser);
	}

}