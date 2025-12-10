import { Country } from "@/modules/country/country.entity";
import { Injectable } from "@nestjs/common";
import { NotificationCreateRequest } from "../dtos/requests/create-notification-request";
import { UpdateNotificationRequest } from "../dtos/requests/update-notification-request";
import { Notification } from '../entities/notification.entity';
import { UserNotification } from "../entities/user-notification.entity";
import { NotificationNotFoundError } from "../errors/notification-not-found.error";
import { NotificationRepository } from "../repositories/notification.repository";

@Injectable()
export class NotificationPersistenceService {
	constructor(
		private readonly notificationRepository: NotificationRepository
	) {}

	async create(newNotification: NotificationCreateRequest): Promise<Notification> {
		const notification = await this.notificationRepository.create({
			title: newNotification.title,
			body: newNotification.body,
			country: new Country({ id: newNotification.countryId }),
			userType: newNotification.userType,
			active: newNotification.active
		});

		if (notification.active) {
			const userList = await this.notificationRepository.getUsersForNotification(newNotification.countryId, newNotification.userType);
			for (const user of userList) {
				const userNotification = new UserNotification({ user, notification, seen: false });
				await this.notificationRepository.createUserNotification(userNotification);
			}
		}

		return notification;
	}

	async update(id: number, body: UpdateNotificationRequest): Promise<Notification> {
		const notification = await this.notificationRepository.findOne(id);
		if (!notification) throw new NotificationNotFoundError();
		await this.notificationRepository.removeUserNotification(notification.id);
		const userList = await this.notificationRepository.getUsersForNotification(body.countryId, body.userType);
		for (const user of userList) {
			const userNotification = new UserNotification({ user, notification, seen: false });
			await this.notificationRepository.createUserNotification(userNotification);
		}
		return this.notificationRepository.update(id, {
			title: body.title,
			body: body.body,
			country: new Country({ id: body.countryId }),
			userType: body.userType,
			active: body.active
		});

	}

	async inactive(id: number): Promise<void> {
		const notification = await this.notificationRepository.findOne(id);
		if (!notification) throw new NotificationNotFoundError();
		if (!notification.active) return;
		await this.notificationRepository.removeUserNotification(notification.id);
		return this.notificationRepository.inactive(id);
	}

	async active(id: number): Promise<void> {
		const notification = await this.notificationRepository.findOne(id);
		if (!notification) throw new NotificationNotFoundError();
		if (notification.active) return;
		await this.notificationRepository.removeUserNotification(notification.id);
		const userList = await this.notificationRepository.getUsersForNotification(notification.country.id, notification.userType);
		for (const user of userList) {
			const userNotification = new UserNotification({ user, notification, seen: false });
			await this.notificationRepository.createUserNotification(userNotification);
		}
		return this.notificationRepository.active(id);
	}

	async delete(notificationId: number) {
		await this.notificationRepository.removeUserNotification(notificationId);
		await this.notificationRepository.delete(notificationId);
	}

	async setUserNotificationSeen(userId: number, notificationId: number) {
		await this.notificationRepository.setUserNotificationSeen(notificationId, userId);
	}
}
