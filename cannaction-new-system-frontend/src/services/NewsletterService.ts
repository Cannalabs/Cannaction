import { CreateNewsletterRequest } from '../dtos/requests/CreateNewsletterRequest';
import { PaginationFilterNewsletterRequest } from '../dtos/requests/PaginationFilterNewsletterRequest';
import { UpdateNewsletterRequest } from '../dtos/requests/UpdateNewsletterRequest';
import ResponsePagination from '../dtos/responses/ResponsePaginationResponse';
import NewsletterEntity from '../models/entities/NewsletterEntity';
import { getJWTAuthHeader } from '../utils/auth';
import { api } from '../utils/axios';

export default class NewsletterService {
	static async getById(id: number) {
		return api
			.get<NewsletterEntity>(`newsletter/${id}`, {
				headers: getJWTAuthHeader(),
			})
			.then((response) => response.data);
	}

	static async getNewsletterList(params: PaginationFilterNewsletterRequest) {
		return api
			.get<ResponsePagination<NewsletterEntity>>('newsletter', {
				headers: getJWTAuthHeader(),
				params,
			})
			.then((response) => response.data);
	}

	static async changeNewsletterStatus(id: number, status: boolean) {
		await api.put(
			`newsletter/${id}/${status ? 'inactive' : 'active'}`,
			undefined,
			{
				headers: getJWTAuthHeader(),
			}
		);
	}

	static async deleteNewsletter(id: number) {
		await api.delete(`newsletter/${id}`, { headers: getJWTAuthHeader() });
	}

	static async createNewsletter(body: CreateNewsletterRequest) {
		return api
			.post('newsletter', body, { headers: getJWTAuthHeader() })
			.then((response) => response.data);
	}

	static async updateNewsletter(id: number, body: UpdateNewsletterRequest) {
		return api
			.put(`newsletter/${id}`, body, { headers: getJWTAuthHeader() })
			.then((response) => response.data);
	}
}
