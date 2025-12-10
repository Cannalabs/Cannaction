import { CreatePromotionRequest } from '../dtos/requests/CreatePromotionRequest';
import { UpdatePromotionRequest } from '../dtos/requests/UpdatePromotionRequest';
import PaginationFilterPromotionRequest from '../dtos/requests/paginationFilterPromotionRequest';
import ResponsePagination from '../dtos/responses/ResponsePaginationResponse';
import { PromotionEntity } from '../models/entities/PromotionEntity';
import { getJWTAuthHeader } from '../utils/auth';
import { api } from '../utils/axios';
import { convertToBase64 } from '../utils/convertToBase64';

export default class PromotionService {
	static getPromotionList(params?: PaginationFilterPromotionRequest) {
		return api
			.get<ResponsePagination<PromotionEntity>>('promotion', {
				headers: getJWTAuthHeader(),
				params,
			})

			.then((response) => response.data);
	}

	static getPromotionListForStoreUser(params?: PaginationFilterPromotionRequest) {
		return api
			.get<ResponsePagination<PromotionEntity>>('promotion/store-user', {
				headers: getJWTAuthHeader(),
				params,
			})

			.then((response) => response.data);
	}

	static getPromotionListForCustomerUser() {
		return api
			.get<PromotionEntity[]>('promotion/customer-user', {
				headers: getJWTAuthHeader(),
			}).then((response) => response.data);
	}

	static getById(id: number) {
		return api
			.get<PromotionEntity>(`promotion/${id}`, {
				headers: getJWTAuthHeader(),
			})
			.then((response) => response.data);
	}

	static async getLabeled(id: number) {
		return api.get<PromotionEntity[]>(`promotion/labeled/${id}`, {
			headers: getJWTAuthHeader(),
		});
	}

	static async changePromotionStatus(id: number, status: boolean) {
		await api.put(
			`promotion/${id}/${status ? 'inactive' : 'active'}`,
			undefined,
			{
				headers: getJWTAuthHeader(),
			}
		);
	}

	static async deletePromotion(id: number) {
		await api.delete(`promotion/${id}`, {
			headers: getJWTAuthHeader(),
		});
	}

	static async createPromotion(body: CreatePromotionRequest) {
		return api
			.post('promotion', body, { headers: getJWTAuthHeader() })
			.then((response) => response.data);
	}

	static async updatePromotion(id: number, body: UpdatePromotionRequest) {
		return api
			.put(`promotion/${id}`, body, { headers: getJWTAuthHeader() })
			.then((response) => response.data);
	}

	static async updatePromotionThumb(id: number, image: File) {
		const picOnBase64 = await convertToBase64(image);

		await api.put(
			`promotion/${id}/thumb`,
			{ image: picOnBase64 },
			{ headers: getJWTAuthHeader() }
		);
	}
}
