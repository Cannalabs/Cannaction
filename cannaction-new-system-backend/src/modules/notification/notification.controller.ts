import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { CurrentUser, ReqCurrentUser } from "../auth/decorators/current-user.decorator";
import { JwtGuard } from "../auth/guards/jwt.guard";
import { PaginationOptionsDto } from "../database/pagination/pagination-options";
import { NotificationCreateRequest } from "./dtos/requests/create-notification-request";
import { FilterNotificationReportDto } from "./dtos/requests/find-all-notifications.request";
import { NotificationFindByUserRequest } from "./dtos/requests/notification-find-by-user-request";
import { SetNotificationSeenRequest } from "./dtos/requests/set-notification-seen.request";
import { UpdateNotificationRequest } from "./dtos/requests/update-notification-request";
import { NotificationPersistenceService } from "./services/notification-persistence.service";
import { NotificationService } from "./services/notification.service";

@Controller('notification')
export class NotificationController {
	constructor(
		private readonly notificationService: NotificationService,
		private readonly notificationPersistenceService: NotificationPersistenceService
	) {}

	@UseGuards(JwtGuard)
	@Get(':id')
	public async findById(@Param('id') id: number) {
		return this.notificationService.findOne(id);
	}

	@UseGuards(JwtGuard)
	@Get()
	public async findAll(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Query() filter: FilterNotificationReportDto,
		@Query() options: PaginationOptionsDto
	) {
		return this.notificationService.findAll(currentUser, filter, options);
	}

	@UseGuards(JwtGuard)
	@Get('user')
	public async findAllByUser(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Query() filter: NotificationFindByUserRequest
	) {
		return this.notificationService.findAllByUser(currentUser, filter);
	}

	@UseGuards(JwtGuard)
	@Post()
	public async create(@Body() body: NotificationCreateRequest) {
		return this.notificationPersistenceService.create(body);
	}

	@Put(':id')
	public async update(
		@Param('id') id: number,
		@Body() body: UpdateNotificationRequest
	) {
		await this.notificationPersistenceService.update(id, body);
	}

	@Put('set-seen')
	public async setNotificationSeen(@Body() body: SetNotificationSeenRequest) {
		await this.notificationPersistenceService.setUserNotificationSeen(body.userId, body.notificationId);
	}

	@UseGuards(JwtGuard)
	@Put(':id/inactive')
	public async inactive(@Param('id') id: number) {
		return this.notificationPersistenceService.inactive(id);
	}

	@UseGuards(JwtGuard)
	@Put(':id/active')
	public async active(@Param('id') id: number) {
		return this.notificationPersistenceService.active(id);
	}

	@UseGuards(JwtGuard)
	@Delete(':id')
	public async delete(@Param('id') id: number) {
		await this.notificationPersistenceService.delete(id);
	}
}
