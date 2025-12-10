import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { CouponService } from '@/modules/coupon/services/coupon.service';
import { PaginationOptionsDto } from '@/modules/database/pagination/pagination-options';
import { PaginationDto } from '@/modules/database/pagination/pagination.dto';
import { FilterSalesReportDto } from '@/modules/sale/dtos/requests/filter-sales-report.dto';
import { StockService } from '@/modules/stock/services/stock.service';
import { StoreTargetService } from '@/modules/store-target/services/store-target.service';
import { UserTargetService } from '@/modules/user-target/services/user-target.service';
import { UserService } from '@/modules/user/services/user.service';
import { Injectable } from '@nestjs/common';
import { FilterStoreListDto } from '../dtos/requests/filter-store-list.dto';
import { DashboardStoreResponse, MostSoldItemsList } from '../dtos/responses/dashboard-store.response';
import StoreSettingsResponse from '../dtos/responses/store-settings.response';
import { StoreRepository } from '../repositories/store.repository';
import { Store } from '../store.entity';

@Injectable()
export class StoreService {
	constructor(
		private readonly storeRepository: StoreRepository,
		private readonly couponService: CouponService,
		private readonly storeTargetService: StoreTargetService,
		private readonly userService: UserService,
		private readonly userTargetService: UserTargetService,
		private readonly stockService: StockService,
	) {}

	async findAll(
		currentUser: CurrentUser,
		filter: FilterStoreListDto,
		options: PaginationOptionsDto
	): Promise<PaginationDto<Store>> {
		return this.storeRepository.findAll(currentUser, filter, options);
	}

	async findForSales(options: PaginationOptionsDto, filter: FilterSalesReportDto, countryId?: number): Promise<PaginationDto<Store>> {
		return this.storeRepository.findForSales(options, filter, countryId);
	}

	async findLabeledByCountryId(countryId: number): Promise<Store[]> {
		return this.storeRepository.findLabeledByCountryId(countryId);
	}

	async findLabeled(currentUser: CurrentUser): Promise<Store[]> {
		return this.storeRepository.findLabeled(currentUser);
	}

	async findOne(id: number): Promise<Store | undefined> {
		return this.storeRepository.findOne(id);
	}

	async findStoreWorkers(id: number, filter: FilterStoreListDto,
		options: PaginationOptionsDto) {
		return this.storeRepository.findStoreWorkers(id, filter, options);
	}

	async findByCountry(id: number): Promise<Store[]> {
		return this.storeRepository.findLabeledByCountryId(id);
	}

	async findSalesByCountryId(id: number): Promise<number> {
		const storeSales = await this.storeRepository.getSalesByCountry(id);
		return storeSales != null ? storeSales.sales.length : 0;
	}

	async findDataForStoreSettings(
		currentUser: CurrentUser,
		storeId: number): Promise<StoreSettingsResponse> {

		const store = await this.findOne(storeId);
		const slug = store.slug || '';
		const acumulatedPoints = store.points;
		const validatedCoupons = await this.couponService.findValidatedCouponsByStore(storeId);
		const availableProducts = await this.stockService.countItemsByStore(storeId);
		const totalStoreSales = await this.storeRepository.getTotalStoreSales(storeId);
		const activeCustomers = await this.userService.findCountByStoreId(storeId);
		const activePromotions = await this.storeTargetService.findCountByStore(storeId);
		const activeStoreTarget = await this.storeRepository.findActiveTargetByStore(storeId, true);
		const activeUserTarget = await this.userTargetService.getActiveStoreTargetForStoreSettings(storeId);

		return {
			slug,
			countryId: store.country.id,
			activeCustomers,
			activePromotions,
			activeStoreTarget,
			activeUserTarget,
			acumulatedPoints,
			validatedCoupons,
			availableProducts,
			totalStoreSales,
		}
	}

	async findStoreUserDashboardData(currentUser: CurrentUser): Promise<DashboardStoreResponse> {
		const user = await this.storeRepository.getUserStoreByUserId(currentUser.userId);
		const storeId = user.store.id;
		const userPoints = await this.storeRepository.findUserPointsForStoreDashboard(currentUser.userId);
		const storePoints = await this.storeRepository.findStorePoints(storeId);
		const activeUsers = await this.storeRepository.findActiveUserCountByStore(storeId);
		const inactiveUsers = await this.storeRepository.findInactiveUserCountByStore(storeId);
		const coupons = await this.storeRepository.findNotValidatedCouponCountByStore(storeId);
		const validatedCoupons = await this.storeRepository.findValidatedCouponCountByStore(storeId);
		const storeTarget = await this.storeRepository.findActiveTargetByStore(storeId, false);
		const userTarget = await this.storeRepository.findActiveUserTargetByStoreAndUser(storeId, currentUser.userId);
		const mostSoldItems = await this.storeRepository.findTopTenMostSoldItemsByStore(storeId);
		let mostSoldItemList: MostSoldItemsList[] = [];
		for (const item of mostSoldItems) {
			mostSoldItemList.push({ itemId: item.id, name: item.name, total: item.sales.length });
		}
		const lastMonthSales = await this.storeRepository.getStoreLastMonthSales(storeId);
		const currentMonthSales = await this.storeRepository.getStoreCurrentMonthSales(storeId);
		const salesPercentage = this.getSalesPercentage(lastMonthSales, currentMonthSales);

		return {
			userPoints,
			storePoints,
			activeUsers,
			inactiveUsers,
			coupons,
			validatedCoupons,
			storeTarget,
			userTarget,
			mostSoldItemList,
			salesPercentage
		}
	}

	private getSalesPercentage(total: number, sales: number) {
		if (total == 0) return 100;
		if (sales == 0) return 0;
		return (sales / total) * 100;
	}
}
