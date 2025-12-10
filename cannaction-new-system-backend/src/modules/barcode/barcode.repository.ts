
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { PaginationService } from '../database/pagination.service';
import { Barcode } from './barcode.entity';

@Injectable()
export class BarcodeRepository {
	constructor(
		@InjectRepository(Barcode)
		private repository: Repository<Barcode>,
		private readonly paginationService: PaginationService
	) {}

	async findOne(itemId: number, countryId: number): Promise<Barcode> {
		return this.repository.findOne({ where: { item: { id: itemId }, country: { id: countryId } } });
	}

	async create(entity: DeepPartial<Barcode>) {
		await this.repository.save(entity);
	}

	async update(entity: Barcode) {
		await this.repository.update(entity.id, entity);
	}
}
