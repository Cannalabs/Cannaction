import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { Language } from './language.entity';

@Injectable()
export class LanguageRepository {
	constructor(
		@InjectRepository(Language)
		private languageRepository: Repository<Language>
	) {}

	async findAll(): Promise<Language[]> {
		return this.languageRepository.find();
	}

	async findOne(id: number): Promise<Language | null> {
		return this.languageRepository.findOne({
			where: { id }
		});
	}
}
