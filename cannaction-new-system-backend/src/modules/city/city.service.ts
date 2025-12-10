import { Injectable } from '@nestjs/common';
import { City } from './city.entity';
import { CityRepository } from './city.repository';

@Injectable()
export class CityService {
	constructor(private readonly cityRepository: CityRepository) {}

	async findOne(id: number): Promise<City | null> {
		return this.cityRepository.findOne(id);
	}

	async findByStateId(stateId: number): Promise<City[]> {
		return this.cityRepository.findByStateId(stateId);
	}
}
