import { Module } from '@nestjs/common';
import { LanguageController } from './language.controller';
import { Language } from './language.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageService } from './services/language.service';
import { LanguageRepository } from './language.repository';

@Module({
	imports: [TypeOrmModule.forFeature([Language])],
	providers: [LanguageService, LanguageRepository],
	controllers: [LanguageController],
	exports: [LanguageService]
})
export class LanguageModule {}
