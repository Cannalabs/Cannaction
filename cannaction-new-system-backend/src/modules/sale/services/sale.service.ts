import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { CountryService } from '@/modules/country/services/country.service';
import { PaginationMetaDto } from '@/modules/database/pagination/pagination-meta';
import { PaginationOptionsDto } from '@/modules/database/pagination/pagination-options';
import { ItemService } from '@/modules/item/services/item.service';
import { StoreService } from '@/modules/store/services/store.service';
import { UserType } from '@/modules/user/enums/user-type.enum';
import { UserService } from '@/modules/user/services/user.service';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { FilterSalesReportDto } from '../dtos/requests/filter-sales-report.dto';
import { SalesForMarketingResponseDto } from '../dtos/responses/sales-for-marketing-response.dto';
import { SalesForStoreUserResponseDto, SalesList } from '../dtos/responses/sales-for-store-user-response.dto';
import { SalesListDto } from '../dtos/responses/sales-list.dto';
import { Sale } from '../sale.entity';
import { SaleRepository } from '../sale.repository';

@Injectable()
export class SaleService {
	constructor(
		private readonly saleRepository: SaleRepository,
		private readonly itemService: ItemService,
		@Inject(forwardRef(() => StoreService)) private readonly storeService: StoreService,
		private readonly countryService: CountryService,
		@Inject(forwardRef(() => UserService)) private readonly userService: UserService
	) {}

	async findAll(currentUser: CurrentUser): Promise<Sale[]> {
		return this.saleRepository.findAll(currentUser);
	}

	async findOne(
		currentUser: CurrentUser,
		id: number
	): Promise<Sale | undefined> {
		return this.saleRepository.findOne(currentUser, id);
	}

	async getSalesForStoreUser(
		currentUser: CurrentUser,
		filter: FilterSalesReportDto,
		options: PaginationOptionsDto
	): Promise<SalesForStoreUserResponseDto> {
		const salesByItem: SalesList[] = [];
		let meta: PaginationMetaDto;
		const user = await this.userService.findOne(currentUser.userId);

		const itemList = await this.itemService.findForSalesStoreUser(
			user.store.id,
			options,
			filter
		);
		meta = itemList.meta;
		const totalSalesByStore =
			await this.saleRepository.getTotalSalesByStore(user.store.id);

		for (const item of itemList.data) {
			const amount = await this.saleRepository.getSalesUserStore(item.id, user.store.id, filter.dateBegin, filter.dateEnd);
			salesByItem.push({
				id: item.id,
				name: item.name,
				amount,
				percentage: this.getSalesPercentage(totalSalesByStore, amount),
			});
		}

		return { sales: salesByItem, meta };
	}

	async getSalesByItems(
		currentUser: CurrentUser,
		filter: FilterSalesReportDto,
		options: PaginationOptionsDto
	): Promise<SalesForMarketingResponseDto> {
		const salesByItem: SalesListDto[] = [];
		let meta: PaginationMetaDto;

		if (currentUser.userType !== UserType.SUPER || filter.countryId) {
			const countryId = filter.countryId
				? Number(filter.countryId)
				: currentUser.userCountry;
			const itemList = await this.itemService.findForSales(
				options,
				filter,
				countryId,
			);
			meta = itemList.meta;

			const totalSalesByCountry =
				await this.saleRepository.getTotalSalesByCountry(countryId);

			for (const item of itemList.data) {
				const amount = await this.saleRepository.getSalesByItem(item.id, filter, countryId);
				salesByItem.push({
					id: item.id,
					name: item.name,
					amount,
					country: totalSalesByCountry.country,
					percentage: this.getSalesPercentage(totalSalesByCountry.total, amount),
				});
			}
		} else {
			const itemList = await this.itemService.findForSales(
				options,
				filter,
			);
			meta = itemList.meta;

			for (const item of itemList.data) {
				const amount = await this.saleRepository.getSalesByItem(item.id, filter,);
				salesByItem.push({
					id: item.id,
					name: item.name,
					amount,
					country: "---",
					percentage: this.getSalesPercentage(amount, amount),
				});
			}
		}

		return { sales: salesByItem, meta };
	}

	async getSalesByStores(
		currentUser: CurrentUser,
		filter: FilterSalesReportDto,
		options: PaginationOptionsDto
	): Promise<SalesForMarketingResponseDto> {
		const salesByStore: SalesListDto[] = [];
		let meta: PaginationMetaDto;

		if (filter.countryId || currentUser.userType !== UserType.SUPER) {
			const countryId = filter.countryId
				? Number(filter.countryId)
				: currentUser.userCountry;

			const storeList = await this.storeService.findForSales(
				options,
				filter,
				countryId,
			);
			meta = storeList.meta;

			const totalSalesByCountry =
				await this.saleRepository.getTotalSalesByCountry(countryId);

			for (const store of storeList.data) {
				const amount = await this.saleRepository.getSalesByStore(store.id, filter);
				salesByStore.push({
					id: store.id,
					name: store.name,
					amount,
					country: totalSalesByCountry.country,
					percentage: this.getSalesPercentage(totalSalesByCountry.total, amount),
				});
			}
		} else {
			const storeList = await this.storeService.findForSales(
				options,
				filter,
			);
			meta = storeList.meta;

			for (const store of storeList.data) {
				const totalSalesByCountry =
					await this.saleRepository.getTotalSalesByCountry(store.country.id);
				const amount = await this.saleRepository.getSalesByStore(store.id, filter);
				salesByStore.push({
					id: store.id,
					name: store.name,
					amount,
					country: totalSalesByCountry.country,
					percentage: this.getSalesPercentage(totalSalesByCountry.total, amount),
				});
			}

		}

		return { sales: salesByStore, meta };
	}

	public async getSalesTotalByStore(storeId: number) {
		return this.saleRepository.getSalesCountByStore(storeId);
	}

	public async getTopFiveMostSoldItems() {
		const teste = await this.saleRepository.getTopFiveMostSoldItems();
		console.log(teste)
		return this.saleRepository.getTopFiveMostSoldItems();
	}

	private getSalesPercentage(total: number, sales: number) {
		if (sales == 0) return 0;
		const percentage = (sales / total) * 100;
		return parseFloat(percentage.toFixed(2));
	}
}
