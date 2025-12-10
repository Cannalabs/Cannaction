import { PaginationOptionsDto } from '@/modules/database/pagination/pagination-options';
import { Injectable } from '@nestjs/common';
import { FindInviteFriendRequest } from '../dtos/requests/find-invite-friend.request';
import { InviteFriendRepository } from '../invite-friend.repository';


@Injectable()
export class InviteFriendService {
	constructor(
		private readonly inviteFriendRepository: InviteFriendRepository,
	) {}

	async findAll(userId: number, filter: FindInviteFriendRequest, options: PaginationOptionsDto) {
		return this.inviteFriendRepository.findAll(userId, filter, options);
	}
}
