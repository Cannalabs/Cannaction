
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { PaginationService } from '../database/pagination.service';
import { PaginationOptionsDto } from '../database/pagination/pagination-options';
import { FindInviteFriendRequest } from './dtos/requests/find-invite-friend.request';
import { InviteFriend } from './invite-friend.entity';

@Injectable()
export class InviteFriendRepository {
	constructor(
		@InjectRepository(InviteFriend)
		private repository: Repository<InviteFriend>,
		private readonly paginationService: PaginationService
	) {}

	async create(entity: DeepPartial<InviteFriend>) {
		await this.repository.save(entity);
	}

	async update(id: number, entity: DeepPartial<InviteFriend>) {
		await this.repository.update(id, entity);
	}

	async findByCode(code: string) {
		return this.repository.findOne({ where: { code } });
	}

	async findAll(userId: number, filter: FindInviteFriendRequest, options: PaginationOptionsDto) {
		const queryBuilder = this.repository.manager
			.getRepository(InviteFriend)
			.createQueryBuilder('invite');
		queryBuilder.innerJoin('invite.user', 'user')
		queryBuilder.andWhere('user.id = :userId', { userId });

		if (filter.search) {
			const searchTerm = `%${filter.search.toLowerCase()}%`;
			queryBuilder.andWhere('invite.email like :pointsSearch', {
				searchTerm
			})
		}

		queryBuilder.orderBy('invite.createdAt', 'DESC');
		return this.paginationService.paginate<InviteFriend>(options, queryBuilder);
	}
}
