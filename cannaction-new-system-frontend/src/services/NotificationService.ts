import { CreateNotificationRequest } from '../dtos/requests/CreateNotificationRequest';
import { PaginationFilterNotificationRequest } from '../dtos/requests/PaginationFilterNotificationRequest';
import { UpdateNotificationRequest } from '../dtos/requests/UpdateNotificationRequest';
import ResponsePagination from '../dtos/responses/ResponsePaginationResponse';
import NotificationEntity from '../models/entities/NotificationEntity';
import { getJWTAuthHeader } from '../utils/auth';
import { api } from '../utils/axios';

export default class NotificationService {
	static async getById(id: number) {
		return api
			.get<NotificationEntity>(`notification/${id}`, {
				headers: getJWTAuthHeader(),
			})
			.then((response) => response.data);
	}

	static async getNotificationList(params: PaginationFilterNotificationRequest) {
		return api
			.get<ResponsePagination<NotificationEntity>>('notification', {
				headers: getJWTAuthHeader(),
				params,
			})
			.then((response) => response.data);
	}

	static async changeNotificationStatus(id: number, status: boolean) {
		await api.put(
			`notification/${id}/${status ? 'inactive' : 'active'}`,
			undefined,
			{
				headers: getJWTAuthHeader(),
			}
		);
	}

	static async deleteNotification(id: number) {
		await api.delete(`notification/${id}`, { headers: getJWTAuthHeader() });
	}

	static async createNotification(body: CreateNotificationRequest) {
		return api
			.post('notification', body, { headers: getJWTAuthHeader() })
			.then((response) => response.data);
	}

	static async updateNotification(id: number, body: UpdateNotificationRequest) {
		return api
			.put(`notification/${id}`, body, { headers: getJWTAuthHeader() })
			.then((response) => response.data);
	}

	static async getUserNotifications(params?: PaginationFilterNotificationRequest) {
		return api
			.get<NotificationEntity[]>(`notification/user`, {
				headers: getJWTAuthHeader(),
				params
			})
			.then((response) => response.data);
	}

	static async setNotificationSeen(userId: number, notificationId: number) {
		return api
			.put(
				'notification/set-seen',
				{ userId, notificationId },
				{
					headers: getJWTAuthHeader(),
				}
			)
			.then((response) => response.data);
	}
}
