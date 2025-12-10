import { Injectable } from '@nestjs/common';
import { Language } from '../language.entity';
import { LanguageRepository } from '../language.repository';

@Injectable()
export class LanguageService {
	constructor(
		private readonly languageRepository: LanguageRepository
	) {}

	async findAll(): Promise<Language[]> {
		return this.languageRepository.findAll();
	}

	async findOne(id: number): Promise<Language | null> {
		return this.languageRepository.findOne( id );
	}
}
