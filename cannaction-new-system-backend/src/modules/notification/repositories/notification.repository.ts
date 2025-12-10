import { CurrentUser } from "@/modules/auth/decorators/current-user.decorator";
import { PaginationService } from "@/modules/database/pagination.service";
import { PaginationOptionsDto } from "@/modules/database/pagination/pagination-options";
import { PaginationDto } from "@/modules/database/pagination/pagination.dto";
import { UserType } from "@/modules/user/enums/user-type.enum";
import { User } from "@/modules/user/user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";
import { FilterNotificationReportDto } from "../dtos/requests/find-all-notifications.request";
import { NotificationFindByUserRequest } from "../dtos/requests/notification-find-by-user-request";
import { Notification } from "../entities/notification.entity";
import { UserNotification } from "../entities/user-notification.entity";
import { NotificationUserType } from "../enums/notification-type.enum";

@Injectable()
export class NotificationRepository {
	constructor(
		@InjectRepository(Notification)
		private repository: Repository<Notification>,
		@InjectRepository(UserNotification)
		private readonly userNotificationRepository: Repository<UserNotification>,
		private readonly paginationService: PaginationService,
	) {}

	async findAll(
		currentUser: CurrentUser,
		filter: FilterNotificationReportDto,
		options: PaginationOptionsDto
	): Promise<PaginationDto<Notification>> {

		const queryBuilder = this.repository.manager
			.getRepository(Notification)
			.createQueryBuilder('notification');

		queryBuilder.innerJoinAndSelect('notification.country', 'country');

		if (currentUser.userType !== UserType.SUPER) {
			queryBuilder.andWhere('country.id = :countryId', { countryId: currentUser.userCountry });
		}

		if (filter.search) {
			const searchTerm = `%${filter.search.toLowerCase()}%`;
			queryBuilder.andWhere(
				'LOWER(notification.title) LIKE :searchTerm', {
				searchTerm,
			});
		}

		queryBuilder.orderBy('notification.createdAt', 'DESC');

		return this.paginationService.paginate<Notification>(options, queryBuilder);
	}

	async findAllByUser(
		currentUser: CurrentUser,
		filter: NotificationFindByUserRequest
	): Promise<Notification[]> {
		const queryBuilder = this.repository.manager
			.getRepository(Notification)
			.createQueryBuilder('notification');

		queryBuilder.innerJoinAndSelect('notification.userNotifications', 'un');

		if (filter.dashboard) {
			queryBuilder.andWhere('un.seen = false');
		}

		queryBuilder.andWhere('un.user_id = :userId', { userId: currentUser.userId })
		queryBuilder.orderBy('notification.createdAt', 'DESC');

		return queryBuilder.getMany();
	}

	async findOne(id: number): Promise<Notification> {
		return this.repository.findOne({ where: { id }, relations: ['country'] });
	}

	async inactive(id: number): Promise<void> {
		await this.repository.update(id, { active: false });
	}

	async active(id: number): Promise<void> {
		await this.repository.update(id, { active: true });
	}

	async create(entity: DeepPartial<Notification>): Promise<Notification | null> {
		const notification = await this.repository.save(entity);
		return this.findOne(notification.id);
	}

	async update(id: number, body: DeepPartial<Notification>): Promise<Notification> {
		await this.repository.update(id, body);
		return this.findOne(id);
	}

	async delete(id: number) {
		await this.repository.delete(id);
	}

	async getUsersForNotification(countryId: number, userType: NotificationUserType) {
		const queryBuilder = this.repository.manager.getRepository(User).createQueryBuilder('user');
		queryBuilder.innerJoin('user.country', 'country');
		if (userType === NotificationUserType.CUSTOMER) {
			queryBuilder.andWhere('user.userType = :userType', { userType: UserType.CUSTOMER });
		} else if (userType === NotificationUserType.STORE) {
			queryBuilder.andWhere('user.userType = :userType', { userType: UserType.STORE });
		} else if (userType === NotificationUserType.ALL) {
			queryBuilder.orWhere('user.userType = :userType', { userType: UserType.CUSTOMER });
			queryBuilder.orWhere('user.userType = :customer', { customer: UserType.STORE });
		}
		queryBuilder.andWhere('country.id = :countryId', { countryId });
		queryBuilder.andWhere('user.active = true');

		return queryBuilder.getMany();
	}

	async createUserNotification(userNotification: DeepPartial<UserNotification>) {
		await this.userNotificationRepository.save(userNotification);
	}

	async removeUserNotification(notificationId: number) {
		await this.repository.manager.createQueryBuilder()
			.delete().from(UserNotification).where('notification_id = :notificationId', { notificationId }).execute();
	}

	async getUserNotification(userId: number, notificationId: number) {
		return this.userNotificationRepository.findOne({ where: { user: { id: userId }, notification: { id: notificationId } } });
	}

	async setUserNotificationSeen(notificationId: number, userId: number) {
		const userNotification = await this.getUserNotification(userId, notificationId);
		await this.userNotificationRepository.update(userNotification.id, { seen: true });
	}
}
