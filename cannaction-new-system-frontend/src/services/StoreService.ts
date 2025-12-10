// src/services/StoreService.ts

import CreateStoreRequest from '../dtos/requests/CreateStoreRequest';
import FilterStoreSettingsRequest from '../dtos/requests/FilterStoreSettingsRequest';
import PaginationFilterStoreRequest from '../dtos/requests/PaginationFilterStoreRequest';
import UpdateStoreByMarketingRequest from '../dtos/requests/UpdateStoreByMarketingRequest';
import ResponsePagination from '../dtos/responses/ResponsePaginationResponse';
import { StoreDashboardResponse } from '../dtos/responses/StoreDashboardResponse';
import StoreSettingsResponse from '../dtos/responses/StoreSettingsResponse';
import { StoreEntity } from '../models/entities/StoreEntity';
import UserEntity from '../models/entities/UserEntity';
import { getBasicAuth, getJWTAuthHeader } from '../utils/auth';
import { api } from '../utils/axios';
import { convertToBase64 } from '../utils/convertToBase64';

export default class StoreService {
	static async getLabeledStoresByCountry(countryId: number) {
		return api
			.get(`store/${countryId}/by-country`, {
				headers: { Authorization: getBasicAuth() },
			})
			.then((response) => response.data);
	}

	static async getLabeledStoresByCountryForFilter(countryId?: number) {
		if (!countryId) return [];
		return api
			.get<StoreEntity[]>(`store/${countryId}/by-country`, {
				headers: { Authorization: getBasicAuth() },
			})
			.then((response) => response.data);
	}

	static async getLabeledStores() {
		return api
			.get<StoreEntity[]>(`store/labeled`, {
				headers: getJWTAuthHeader() ,
			})
			.then((response) => response.data);
	}

	static async getStores(filter?: PaginationFilterStoreRequest) {
		return api
			.get<ResponsePagination<StoreEntity>>('store', {
				headers: getJWTAuthHeader(),
				params: filter,
			})
			.then((response) => response.data);
	}

	static async changeStoreStatus(id: number, status: boolean) {
		await api.put(`store/${id}/${status ? 'inactive' : 'active'}`, undefined, {
			headers: getJWTAuthHeader(),
		});
	}

	static findById(id: number) {
		return api
			.get<StoreEntity>(`store/${id}`, {
				headers: getJWTAuthHeader(),
			})
			.then((response) => response.data);
	}

	static async createByMarketing(body: CreateStoreRequest) {
		await api.post(`store/create-by-marketing`, body, {
			headers: getJWTAuthHeader(),
		});
	}

	static async updateByMarketing(
		id: number,
		body: UpdateStoreByMarketingRequest
	) {
		await api.put(`store/${id}/update-by-marketing`, body, {
			headers: getJWTAuthHeader(),
		});
	}

	static async updateStoreSlug(id: number, slug?: string) {
		await api.put(`store/${id}/update-store-slug/${slug}`, undefined, {
			headers: getJWTAuthHeader(),
		});
	}

	static async findStoreSettings(
		id: number,
		params: FilterStoreSettingsRequest
	) {
		return api.get<StoreSettingsResponse>(`store/${id}/settings-for-marketing`, {
			headers: getJWTAuthHeader(),
			params,
		});
	}

	static async updateStoreLogo(id: number, image: File) {
		const picOnBase64 = await convertToBase64(image);

		await api.put(
			`store/${id}/logo`,
			{ image: picOnBase64 },
			{ headers: getJWTAuthHeader() }
		);
	}

	static async getStoreUserDashboardData() {
		return api
			.get<StoreDashboardResponse>('store/store-dashboard', {
				headers: getJWTAuthHeader(),
			})
			.then((response) => response.data);
	}

	static async getStoreWorkers(id: number, filter?: PaginationFilterStoreRequest) {
		return api
			.get<ResponsePagination<UserEntity>>(`store/${id}/workers`, {
				headers: getJWTAuthHeader(),
				params: filter,
			})
			.then((response) => response.data);
	}
}
