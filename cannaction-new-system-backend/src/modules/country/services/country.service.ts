import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { ListMostSoldItemsDto } from '@/modules/item/dtos/responses/list-most-sold-items.dto';
import { UserType } from '@/modules/user/enums/user-type.enum';
import { getRandomColor } from '@/utils/string';
import { Injectable } from '@nestjs/common';
import { Country } from '../country.entity';
import { CountryRepository } from '../country.repository';
import { FindByCountryForDashboardDto } from '../dtos/responses/find-by-country-for-dashboard.dto';
import { ListByCountryForDashboardDto } from '../dtos/responses/list-by-country-for-dashboard.dto';
import { GraphicsInfo, ListForDashboardDto } from '../dtos/responses/list-for-dashboard.dto';
import { ListSalesByCountryForDashboardDto } from '../dtos/responses/list-sales-by-country-for-dashboard.dto';

@Injectable()
export class CountryService {
	constructor(
		private readonly countryRepository: CountryRepository,
	) {}

	async findAll(): Promise<Country[]> {
		return this.countryRepository.findAll();
	}

	async findOne(id: number): Promise<Country | null> {
		return this.countryRepository.findOne(id);
	}

	async getMarketingDashboardData(
		currentUser: CurrentUser
	): Promise<ListForDashboardDto> {
		const salesByCountry: GraphicsInfo[] =
			await this.findSalesByCountryForDashboard(currentUser);
		const itemSalesByCountry: GraphicsInfo[] =
			await this.findMostSoldItems(currentUser);
		const storesByCountry: ListByCountryForDashboardDto[] =
			await this.findStoresByCountryForDashboard(currentUser);
		const usersByCountry: ListByCountryForDashboardDto[] =
			await this.findUsersByCountryForDashboard(currentUser);

		return {
			salesByCountry,
			itemSalesByCountry,
			storesByCountry,
			usersByCountry,
		};
	}

	private async findMostSoldItems(
		currentUser: CurrentUser
	): Promise<GraphicsInfo[]> {
		const itemList = await this.countryRepository.findItemsForDashboard(currentUser);
		const soldItemList: ListMostSoldItemsDto[] = [];
		const itemsInfo: GraphicsInfo[] = [];

		for (const item of itemList) {
			const soldTotal = await this.countryRepository.getSalesByItem(currentUser, item.id);
			if (soldTotal == 0) continue;
			if (soldItemList.length < 10) {
				soldItemList.push({ total: soldTotal, item: item.name });
				soldItemList.sort((a, b) => b.total - a.total);
			} else {
				if (soldTotal <= soldItemList[soldItemList.length - 1].total) continue;
				soldItemList.pop();
				soldItemList.push({ total: soldTotal, item: item.name });
				soldItemList.sort((a, b) => b.total - a.total);
			}
		}

		for (const item of soldItemList) {
			itemsInfo.push({
				name: item.item,
				value: item.total,
				color: getRandomColor()
			})
		}

		return itemsInfo;
	}

	private async findStoresByCountryForDashboard(
		currentUser: CurrentUser
	): Promise<ListByCountryForDashboardDto[]> {
		const storesByCountry: ListByCountryForDashboardDto[] = [];
		let active: number = 0;
		let inactive: number = 0;
		let total: number = 0;
		if (currentUser.userType === UserType.SUPER) {
			const countryList = await this.findAll();

			for (const country of countryList) {
				const totals = await this.findAndCountStoresByCountry(country.id);
				active = active + totals.active;
				inactive = inactive + totals.inactive;
				total = total + totals.total;
				storesByCountry.push({ ...totals, country: country.name });
			}
		} else {
			const country = await this.countryRepository.findOne(
				currentUser.userCountry
			);
			const totals = await this.findAndCountStoresByCountry(
				currentUser.userCountry
			);
			active = active + totals.active;
			inactive = inactive + totals.inactive;
			total = total + totals.total;
			storesByCountry.push({ ...totals, country: country.name });
		}

		storesByCountry.push({ country: 'Total', active, inactive, total });

		return storesByCountry;
	}

	private async findAndCountStoresByCountry(
		countryId: number
	): Promise<FindByCountryForDashboardDto> {
		const activeStores = await this.countryRepository.findActiveStoresByCountry(
			countryId, true
		);
		const inactiveStores = await this.countryRepository.findActiveStoresByCountry(
			countryId, false
		);

		return {
			active: activeStores,
			inactive: inactiveStores,
			total: activeStores + inactiveStores,
		};
	}

	private async findUsersByCountryForDashboard(
		currentUser: CurrentUser
	): Promise<ListByCountryForDashboardDto[]> {
		const usersByCountry: ListByCountryForDashboardDto[] = [];
		let active: number = 0;
		let inactive: number = 0;
		let total: number = 0;

		if (currentUser.userType === UserType.SUPER) {
			const countryList = await this.findAll();
			for (const country of countryList) {
				const totals = await this.findAndCountUsersByCountry(country.id);
				active = active + totals.active;
				inactive = inactive + totals.inactive;
				total = total + totals.total;
				usersByCountry.push({ ...totals, country: country.name });
			}
		} else {
			const country = await this.countryRepository.findOne(
				currentUser.userCountry
			);
			const totals = await this.findAndCountUsersByCountry(country.id);
			active = active + totals.active;
			inactive = inactive + totals.inactive;
			total = total + totals.total;
			usersByCountry.push({ ...totals, country: country.name });
		}

		usersByCountry.push({ country: 'Total', active, inactive, total });
		return usersByCountry;
	}

	async findAndCountUsersByCountry(
		countryId: number
	): Promise<FindByCountryForDashboardDto> {
		const activeUsers = await this.countryRepository.findActiveUsersByCountry(
			countryId, true);
		const inactiveUsers = await this.countryRepository.findActiveUsersByCountry(countryId, false);

		return {
			active: activeUsers,
			inactive: inactiveUsers,
			total: activeUsers + inactiveUsers,
		};
	}

	private async findSalesByCountryForDashboard(
		currentUser: CurrentUser
	): Promise<GraphicsInfo[]> {
		const salesByCountry: ListSalesByCountryForDashboardDto[] = [];
		const salesInfo: GraphicsInfo[] = [];

		if (currentUser.userType === UserType.SUPER) {
			const countryList = await this.findAll();

			for (const country of countryList) {
				const total = await this.countryRepository.getSalesByCountryId(country.id);
				salesByCountry.push({ total, country: country.name });
			}
		} else {
			const storeList = await this.countryRepository.findStoreListByCountry(currentUser.userCountry);
			for (const store of storeList) {
				const total = await this.countryRepository.getTotalSalesByStore(store.id);
				salesByCountry.push({ total, country: store.name });
			}
		}

		for (const sale of salesByCountry) {
			salesInfo.push({
				name: sale.country,
				value: sale.total,
				color: getRandomColor()
			})
		}

		return salesInfo;
	}
}
