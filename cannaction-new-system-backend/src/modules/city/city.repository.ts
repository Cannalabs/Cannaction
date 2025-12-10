import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './city.entity';

@Injectable()
export class CityRepository {
	constructor(
		@InjectRepository(City)
		private cityRepository: Repository<City>
	) {}

	async findOne(id: number): Promise<City | null> {
		return this.cityRepository.findOne({
			where: { id },
		});
	}

	async findByStateId(stateId: number): Promise<City[]> {
		return this.cityRepository.find({ where: { state: { id: stateId } } });
	}
}
