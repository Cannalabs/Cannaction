import { CurrentUser } from "@/modules/auth/decorators/current-user.decorator";
import { PaginationOptionsDto } from "@/modules/database/pagination/pagination-options";
import { UserHasNoStoreError } from "@/modules/user/errors/user-has-no-store.error";
import { UserService } from "@/modules/user/services/user.service";
import { Injectable } from "@nestjs/common";
import FilterStockRequest from "../dtos/requests/filter-stock.request";
import { StockRepository } from "../stock.repository";

@Injectable()
export class StockService {
	constructor(
		private readonly stockRepository: StockRepository,
		private readonly userService: UserService
	) {}

	async findForStoreSettings(currentUser: CurrentUser, storeId: number, filter: FilterStockRequest, options: PaginationOptionsDto) {
		return this.stockRepository.findByStore(currentUser, filter, storeId, options);
	}

	async findForStoreDashboard(currentUser: CurrentUser, filter: FilterStockRequest, options: PaginationOptionsDto) {
		const storeId = await this.findUserStore(currentUser.userId);
		return this.stockRepository.findByStore(currentUser, filter, storeId, options);
	}

	async countItemsByStore(storeId: number) {
		const stock = await this.stockRepository.findCountByStore(storeId);
		let total = 0;
		for (const item of stock) {
			total = total + item.total;
		}

		return total;
	}

	async findCountByStoreAndItem(currentUser: CurrentUser, itemId: number) {
		const storeId = await this.findUserStore(currentUser.userId);
		const stock = await this.stockRepository.findCountByStoreAndItem(itemId, storeId);
		if (!stock) return 0;
		return stock.total;
	}

	async findForSales(currentUser: CurrentUser) {
		const storeId = await this.findUserStore(currentUser.userId);
		return this.stockRepository.findForSales(storeId);
	}

	private async findUserStore(userId: number) {
		const user = await this.userService.findOne(userId);
		if (!user.store) throw new UserHasNoStoreError();
		return user.store.id;
	}
}