import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { ProfilePontuation } from './profile-pontuation.entity';

@Injectable()
export class ProfilePontuationRepository {
	constructor(
		@InjectRepository(ProfilePontuation)
		private profilePontuationRepository: Repository<ProfilePontuation>
	) {}

	async findAll(): Promise<ProfilePontuation[]> {
		return this.profilePontuationRepository.find({ order: { id: 'ASC' } });
	}

	async findOne(id: number): Promise<ProfilePontuation> {
		return this.profilePontuationRepository.findOne({
			where: { id },
		});
	}

	async update(
		id: number,
		entity: DeepPartial<ProfilePontuation>
	): Promise<ProfilePontuation> {
		await this.profilePontuationRepository.update(id, entity);
		return this.findOne(id);
	}
}
