// src/services/UserService.ts

import { CreateItemRequest } from '../dtos/requests/CreateItemRequest';
import { PaginationFilterItemRequest } from '../dtos/requests/PaginationFilterItemRequest';
import { UpdateItemRequest } from '../dtos/requests/UpdateItemRequest';
import ListMostSoldItemsByForDashboardResponse from '../dtos/responses/ListMostSoldItemsResponse';
import ResponsePagination from '../dtos/responses/ResponsePaginationResponse';
import { ItemLabeledFilter } from '../hooks/querys/item/useItemLabeled';
import { ItemEntity } from '../models/entities/ItemEntity';
import { getJWTAuthHeader } from '../utils/auth';
import { api } from '../utils/axios';
import { convertToBase64 } from '../utils/convertToBase64';

export default class ItemService {
	static async getMostSoldItemsForDashboard() {
		return api
			.get<ListMostSoldItemsByForDashboardResponse[]>(
				'item/most-sold-for-dashboard',
				{
					headers: getJWTAuthHeader(),
				}
			)
			.then((response) => response.data);
	}

	static async getById(id: number) {
		return api
			.get<ItemEntity>(`item/${id}`, {
				headers: getJWTAuthHeader(),
			})
			.then((response) => response.data);
	}

	static async getLabeled(filter?: ItemLabeledFilter) {
		return api
			.get<ItemEntity[]>('item/labeled', {
				headers: getJWTAuthHeader(),
				params: filter,
			})
			.then((response) => response.data);
	}

	static async getItemList(params?: PaginationFilterItemRequest) {
		return api
			.get<ResponsePagination<ItemEntity>>('item', {
				headers: getJWTAuthHeader(),
				params,
			})
			.then((response) => response.data);
	}

	static async getForPointsStatement(params?: PaginationFilterItemRequest) {
		return api
			.get<ItemEntity[]>(`item/points-statement`, {
				headers: getJWTAuthHeader(),
				params,
			})
			.then((response) => response.data);
	}

	static async getByBarcode(barcode: string) {
		return api
			.get<ItemEntity>(`item/${barcode}/by-barcode`, {
				headers: getJWTAuthHeader(),
			})
			.then((response) => response.data);
	}

	static async changeItemStatus(id: number, status: boolean) {
		await api.put(`item/${id}/${status ? 'inactive' : 'active'}`, undefined, {
			headers: getJWTAuthHeader(),
		});
	}

	static async deleteItem(id: number) {
		await api.delete(`item/${id}`, { headers: getJWTAuthHeader() });
	}

	static async createItem(body: CreateItemRequest) {
		return api
			.post('item', body, { headers: getJWTAuthHeader() })
			.then((response) => response.data);
	}

	static async updateItem(id: number, body: UpdateItemRequest) {
		return api
			.put(`item/${id}`, body, { headers: getJWTAuthHeader() })
			.then((response) => response.data);
	}

	static async updateItemImage(id: number, image: File) {
		const picOnBase64 = await convertToBase64(image);

		await api.put(
			`item/${id}/image`,
			{ image: picOnBase64 },
			{ headers: getJWTAuthHeader() }
		);
	}

	static async findForExchange() {
		return api
			.get<ItemEntity[]>('item/exchange', {
				headers: getJWTAuthHeader(),
			})
			.then((response) => response.data);
	}
}
