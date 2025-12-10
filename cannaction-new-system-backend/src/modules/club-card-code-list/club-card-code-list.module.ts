import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { ClubCardCodeListController } from './club-card-code-list.controller';
import { ClubCardCodeList } from './club-card-code-list.entity';
import { ClubCardCodeListRepository } from './club-card-code-list.repository';
import { ClubCardCodeListService } from './club-card-code-list.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([ClubCardCodeList]), DatabaseModule
	],
	providers: [ClubCardCodeListService, ClubCardCodeListRepository],
	controllers: [ClubCardCodeListController],
	exports: [ClubCardCodeListService],
})
export class ClubCardCodeListModule {}
