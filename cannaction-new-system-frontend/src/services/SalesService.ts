import { CreateSaleRequest } from '../dtos/requests/CreateSaleRequest';
import PaginationFilterSalesRequest from '../dtos/requests/paginationFilterSalesRequest';
import { SalesForMarketingResponse } from '../dtos/responses/MarketingSalesResponse';
import { SalesForStoreUserResponse } from '../dtos/responses/SalesForStoreUserResponse';
import { getJWTAuthHeader } from '../utils/auth';
import { api } from '../utils/axios';


export default class SalesService {
	static getSales(params?: PaginationFilterSalesRequest) {
		const url = params?.byStore ? 'sale/by-stores' : 'sale/by-items';
		return api
			.get<SalesForMarketingResponse>(url, {
				headers: getJWTAuthHeader(),
				params,
			})
			.then((response) => response.data);
	}

	static getSalesForStoreUser(params?: PaginationFilterSalesRequest) {
		return api
			.get<SalesForStoreUserResponse>('sale/store-user', {
				headers: getJWTAuthHeader(),
				params,
			})
			.then((response) => response.data);
	}

	static async createSale(body: CreateSaleRequest) {
		await api.post('sale', body, {
			headers: getJWTAuthHeader()
		})
	}

	static async getTopFiveMostSoldItems() {
		return api.get('sale/super/most-sold', {
			headers: getJWTAuthHeader(),
		}).then((response) => response.data);
	}
}
