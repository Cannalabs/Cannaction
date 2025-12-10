import { Injectable } from '@nestjs/common';
import { ProfilePontuationRepository } from '../profile-pontuation.repository';

@Injectable()
export class ProfilePontuationService {
	constructor(
		private readonly profilePontuationRepository: ProfilePontuationRepository
	) {}

	async findAll() {
		return this.profilePontuationRepository.findAll();
	}
}
