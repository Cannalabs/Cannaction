import { CreateUserTargetByUserRequest } from '../dtos/requests/CreateUserTargetByUserRequest';
import { CreateUserTargetRequest } from '../dtos/requests/CreateUserTargetRequest';
import { UpdateUserTargetRequest } from '../dtos/requests/UpdateUserTargetRequest';
import PaginationFilterUserTargetRequest from '../dtos/requests/UserTargetFilterRequest';
import { UserTargetMarketingResponse } from '../dtos/responses/MarketingUserTargetResponse';
import { UserTargetEntity } from '../models/entities/UserTargetEntity';
import { getJWTAuthHeader } from '../utils/auth';
import { api } from '../utils/axios';

export default class UserTargetService {
	static getForMarketing(params?: PaginationFilterUserTargetRequest) {
		return api
			.get<UserTargetMarketingResponse>('user-target/find-for-marketing', {
				headers: getJWTAuthHeader(),
				params,
			})
			.then((response) => response.data);
	}

	static async getByUser(userId: number, storeId: number) {
		return api
			.get<UserTargetEntity>(`user-target/${storeId}/by-user/${userId}`, {
				headers: getJWTAuthHeader(),
			})
			.then((response) => response.data);
	}

	static async getRequestedTargets() {
		return api
			.get<UserTargetEntity[]>('user-target/find-requested', {
				headers: getJWTAuthHeader(),
			})
			.then((response) => response.data);
	}

	static async handleUserTargetStatus(id: number, status: boolean) {
		await api.put(
			`user-target/${id}/${status ? 'inactive' : 'active'}`,
			undefined,
			{
				headers: getJWTAuthHeader(),
			}
		);
	}

	static async delete(id: number) {
		await api.delete(`user-target/${id}`, {
			headers: getJWTAuthHeader(),
		});
	}

	static async create(body: CreateUserTargetRequest) {
		if (!body.itemId) return;
		await api.post('user-target', body, { headers: getJWTAuthHeader() });
	}

	static async createByUser(body: CreateUserTargetByUserRequest) {
		if (!body.itemId || !body.userId) return;
		await api.post('user-target/by-user', body, { headers: getJWTAuthHeader() });
	}

	static async update(id: number, body: UpdateUserTargetRequest) {
		await api.put(`user-target/${id}`, body, { headers: getJWTAuthHeader() });
	}

	static async requestPrize(id: number) {
		await api.put(`user-target/${id}/request-prize`, undefined, {
			headers: getJWTAuthHeader(),
		});
	}

	static async concludeTarget(id: number) {
		await api.put(`user-target/${id}/conclude-target`, undefined, {
			headers: getJWTAuthHeader(),
		});
	}

	static async activeAllTargets() {
		await api.put('user-target/active-all', undefined, {
			headers: getJWTAuthHeader(),
		});
	}
}
