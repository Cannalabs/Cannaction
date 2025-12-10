import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryController } from './country.controller';
import { Country } from './country.entity';
import { CountryRepository } from './country.repository';
import { CountryService } from './services/country.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([Country]),],
	providers: [CountryService, CountryRepository],
	controllers: [CountryController],
	exports: [CountryService],
})
export class CountryModule {}
