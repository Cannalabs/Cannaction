// src/services/CityService.ts

import FindChangeShopsRequest from '../dtos/requests/FindChangeShopsRequest';
import PaginationFilterRequest from '../dtos/requests/paginationFilterRequest';
import { CheckChangeShopResponseDto } from '../dtos/responses/CheckChangeShopResponse';
import ResponsePagination from '../dtos/responses/ResponsePaginationResponse';
import { ChangeShopEntity } from '../models/entities/ChangeShopEntity';
import { getJWTAuthHeader } from '../utils/auth';
import { api } from '../utils/axios';

export default class ChangeShopService {
	static async findChangeShops(params?: FindChangeShopsRequest) {
		return api
			.get<CheckChangeShopResponseDto>('change-shop', {
				headers: getJWTAuthHeader(),
				params,
			})
			.then((response) => response.data);
	}

	static async findChangeShopsForCustomer(params?: PaginationFilterRequest) {
		return api
			.get<ResponsePagination<ChangeShopEntity>>('change-shop/customer', {
				headers: getJWTAuthHeader(),
				params,
			})
			.then((response) => response.data);
	}

	static async acceptChangeShop(id: number, accept: boolean) {
		await api.put(
			`change-shop/${id}`,
			{ accept },
			{ headers: getJWTAuthHeader() }
		);
	}

	static async createChangeShop(reason: string, storeId: number) {
		await api.post(
			'change-shop',
			{ reason, storeId },
			{ headers: getJWTAuthHeader() }
		);
	}
}
