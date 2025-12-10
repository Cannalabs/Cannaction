import { CreateStoreTargetRequest } from '../dtos/requests/CreateStoreTargetRequest';
import PaginationFilterStoreTargetRequest from '../dtos/requests/StoreTargetFilterRequest';
import { UpdateStoreTargetRequest } from '../dtos/requests/UpdateStoreTargetRequest';
import { StoreTargetMarketingResponse } from '../dtos/responses/MarketingStoreTargetResponse';
import { StoreTargetEntity } from '../models/entities/StoreTargetEntity';
import { getJWTAuthHeader } from '../utils/auth';
import { api } from '../utils/axios';

export default class StoreTargetService {
	static getForMarketing(params?: PaginationFilterStoreTargetRequest) {
		return api
			.get<StoreTargetMarketingResponse>('store-target/find-for-marketing', {
				headers: getJWTAuthHeader(),
				params,
			})
			.then((response) => response.data);
	}

	static getTargetSum(params?: PaginationFilterStoreTargetRequest) {
		return api
			.get('store-target/super/get-target-sum', {
				headers: getJWTAuthHeader(),
				params,
			})
			.then((response) => response.data);
	}

	static async handleStoreTargetStatus(id: number, status: boolean) {
		await api.put(
			`store-target/${id}/${status ? 'inactive' : 'active'}`,
			undefined,
			{
				headers: getJWTAuthHeader(),
			}
		);
	}

	static async requestPrize(id: number) {
		await api.put(`store-target/${id}/request-prize`, undefined, {
			headers: getJWTAuthHeader(),
		});
	}

	static async concludeTarget(id: number) {
		await api.put(`store-target/${id}/conclude-target`, undefined, {
			headers: getJWTAuthHeader(),
		});
	}

	static async getRequestedTargets() {
			return api.get<StoreTargetEntity[]>('store-target/find-requested', {
				headers: getJWTAuthHeader(),
			}).then((response) => response.data);
		}
	

	static async delete(id: number) {
		await api.delete(`store-target/${id}`, {
			headers: getJWTAuthHeader(),
		});
	}

	static async create(body: CreateStoreTargetRequest) {
		await api.post('store-target', body, { headers: getJWTAuthHeader() });
	}

	static async update(id: number, body: UpdateStoreTargetRequest) {
		await api.put(`store-target/${id}`, body, { headers: getJWTAuthHeader() });
	}
}
