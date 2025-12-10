import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { ExtractOperator } from '@/modules/extract/enums/extract-operator.enum';
import { ExtractPersistenceService } from '@/modules/extract/services/extract-persistence.service';
import { ProfilePontuationService } from '@/modules/profile-pontuation/services/profile-pontuation.service';
import { UserPersistenceService } from '@/modules/user/services/user-persistence.service';
import { UserService } from '@/modules/user/services/user.service';
import { generatePromotionCoupon } from '@/utils/crypto';
import { Injectable } from '@nestjs/common';
import { CreateInviteFriendRequest } from '../dtos/requests/create-invite-friend.request';
import { InviteStatusEnum } from '../enums/invite-status.enum';
import { InviteFriendRepository } from '../invite-friend.repository';


@Injectable()
export class InviteFriendPersistenceService {
	constructor(
		private readonly inviteFriendRepository: InviteFriendRepository,
		private readonly extractPersistenceService: ExtractPersistenceService,
		private readonly profilePontuationService: ProfilePontuationService,
		private readonly userPersistenceService: UserPersistenceService,
		private readonly userService: UserService
	) {}

	async create(currentUser: CurrentUser, body: CreateInviteFriendRequest) {
		const user = await this.userService.findOne(currentUser.userId);

		await this.inviteFriendRepository.create({
			user,
			email: body.email,
			status: InviteStatusEnum.SENT,
			code: generatePromotionCoupon()
		});

		const pontuations = await this.profilePontuationService.findAll();
		await this.extractPersistenceService.createExtract({
			userId: currentUser.userId,
			amount: 1,
			points: pontuations.find(pp => pp.id == 9).points,
			operator: ExtractOperator.ADDITION,
			description: 'Friend Invitation sent: ' + body.email,
			balance: user.points + pontuations.find(pp => pp.id == 9).points
		});

		await this.userPersistenceService.updateUserPoints(
			currentUser.userId,
			ExtractOperator.ADDITION,
			pontuations.find(pp => pp.id == 9).points
		);
	}

	async setAccepted(code: string) {
		const invite = await this.inviteFriendRepository.findByCode(code);
		//TODO: Jogar erro 
		await this.inviteFriendRepository.update(invite.id,
			{ status: InviteStatusEnum.ACCEPTED });

		const user = await this.userService.findOne(invite.user.id);
		const pontuations = await this.profilePontuationService.findAll();
		await this.extractPersistenceService.createExtract({
			userId: user.id,
			amount: 1,
			points: pontuations.find(pp => pp.id == 10).points,
			operator: ExtractOperator.ADDITION,
			description: 'Friend Invitation accepted: ' + invite.email,
			balance: user.points + pontuations.find(pp => pp.id == 10).points
		});

		await this.userPersistenceService.updateUserPoints(
			user.id,
			ExtractOperator.ADDITION,
			pontuations.find(pp => pp.id == 10).points
		);
	}
}
