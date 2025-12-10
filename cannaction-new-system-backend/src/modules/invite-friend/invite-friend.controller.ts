import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Put,
	Query,
	UseGuards
} from '@nestjs/common';
import {
	CurrentUser,
	ReqCurrentUser,
} from '../auth/decorators/current-user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { PaginationOptionsDto } from '../database/pagination/pagination-options';
import { CreateInviteFriendRequest } from './dtos/requests/create-invite-friend.request';
import { FindInviteFriendRequest } from './dtos/requests/find-invite-friend.request';
import { InviteFriendPersistenceService } from './services/invite-friend-persistence.service';
import { InviteFriendService } from './services/invite-friend.service';

@Controller('invite-friend')
export class InviteFriendController {
	constructor(
		private readonly inviteFriendService: InviteFriendService,
		private readonly inviteFriendPersistenceService: InviteFriendPersistenceService
	) {}

	@UseGuards(JwtGuard)
	@Get()
	public async findAll(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Query() params: FindInviteFriendRequest,
		@Query() options: PaginationOptionsDto
	) {
		return this.inviteFriendService.findAll(currentUser.userId, params, options);
	}

	@UseGuards(JwtGuard)
	@Put(':code')
	public async update(
		@Param('code') code: string,
	) {
		await this.inviteFriendPersistenceService.setAccepted(code);
	}

	@UseGuards(JwtGuard)
	@Post()
	public async create(@ReqCurrentUser() currentUser: CurrentUser, @Body() inviteFriend: CreateInviteFriendRequest) {
		await this.inviteFriendPersistenceService.create(currentUser, inviteFriend);
	}
}
