import { Injectable } from '@nestjs/common';
import { ProfilePontuationRepository } from '../profile-pontuation.repository';

import { ProfilePontuationUpdateRequest } from '../dtos/requests/profile-pontuation-update.requests';

@Injectable()
export class ProfilePontuationPersistenceService {
	constructor(
		private readonly profilePontuationRepository: ProfilePontuationRepository
	) {}

	async update(id: number, body: ProfilePontuationUpdateRequest): Promise<void> {
		await this.profilePontuationRepository.update(id, {
			active: body.active,
			points: body.points,
		});
	}
}
