import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { PaginationOptionsDto } from '@/modules/database/pagination/pagination-options';
import { PaginationDto } from '@/modules/database/pagination/pagination.dto';
import { Injectable } from '@nestjs/common';
import { FilterNotificationReportDto } from '../dtos/requests/find-all-notifications.request';
import { NotificationFindByUserRequest } from '../dtos/requests/notification-find-by-user-request';
import { Notification } from '../entities/notification.entity';
import { NotificationRepository } from '../repositories/notification.repository';


@Injectable()
export class NotificationService {
	constructor(
		private readonly notificationRepository: NotificationRepository
	) {}

	async findAll(
		currentUser: CurrentUser,
		filter: FilterNotificationReportDto,
		options: PaginationOptionsDto
	): Promise<PaginationDto<Notification>> {
		return this.notificationRepository.findAll(currentUser, filter, options);
	}

	async findAllByUser(currentUser: CurrentUser, filter: NotificationFindByUserRequest) {
		return this.notificationRepository.findAllByUser(currentUser, filter);
	}

	async findOne(id: number): Promise<Notification | undefined> {
		return this.notificationRepository.findOne(id);
	}
}
