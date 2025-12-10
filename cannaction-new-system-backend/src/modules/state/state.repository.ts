import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { State } from './state.entity';

@Injectable()
export class StateRepository {
	constructor(
		@InjectRepository(State)
		private stateRepository: Repository<State>
	) {}

	async findAll(): Promise<State[]> {
		return this.stateRepository.find();
	}

	async findOne(id: number): Promise<State | null> {
		return this.stateRepository.findOne({
			where: { id },
		});
	}

	async findByCountryId(countryId: number): Promise<State[]> {
		return this.stateRepository.find({ where: { country: { id: countryId } } });
	}
}
