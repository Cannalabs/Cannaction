import PaginationFilterStockRequest from '../dtos/requests/PaginationFilterStockRequest';
import ResponsePagination from '../dtos/responses/ResponsePaginationResponse';
import { StockEntity } from '../models/entities/StockEntity';
import { getJWTAuthHeader } from '../utils/auth';
import { api } from '../utils/axios';

export default class StockService {
	static async getStockForStoreSettings(
		storeId: number,
		params?: PaginationFilterStockRequest
	) {
		return api
			.get<ResponsePagination<StockEntity>>(`stock/${storeId}`, {
				headers: getJWTAuthHeader(),
				params,
			})
			.then((response) => response.data);
	}

	static async getStockForStoreDashboard(
		params?: PaginationFilterStockRequest
	) {
		return api
			.get<ResponsePagination<StockEntity>>(`stock/store-dashboard`, {
				headers: getJWTAuthHeader(),
				params,
			})
			.then((response) => response.data);
	}

	static async getForSales() {
		return api
			.get<StockEntity[]>('stock/for-sales', { headers: getJWTAuthHeader() })
			.then((response) => response.data);
	}

	static async getCountByItem(id: number) {
		return api
			.get<number>(`stock/item-count/${id}`, {
				headers: getJWTAuthHeader(),
			})
			.then((response) => response.data);
	}
}
