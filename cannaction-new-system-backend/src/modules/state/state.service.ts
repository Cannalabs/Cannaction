import { Injectable } from '@nestjs/common';
import { State } from './state.entity';
import { StateRepository } from './state.repository';

@Injectable()
export class StateService {
	constructor(private readonly stateRepository: StateRepository) {}

	async findAll(): Promise<State[]> {
		return this.stateRepository.findAll();
	}

	async findOne(id: number): Promise<State | null> {
		return this.stateRepository.findOne(id);
	}

	async findByCountryId(countryId: number): Promise<State[]> {
		return this.stateRepository.findByCountryId(countryId);
	}
}
