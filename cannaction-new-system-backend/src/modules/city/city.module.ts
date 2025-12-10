import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityController } from './city.controller';
import { City } from './city.entity';
import { CityRepository } from './city.repository';
import { CityService } from './city.service';

@Module({
	imports: [TypeOrmModule.forFeature([City])],
	providers: [CityService, CityRepository],
	controllers: [CityController],
	exports: [CityService],
})
export class CityModule {}
