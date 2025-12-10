import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { ExtractModule } from '../extract/extract.module';
import { PromotionModule } from '../promotion/promotion.module';
import { StoreModule } from '../store/store.module';
import { StoreTargetPersistenceService } from './services/store-target-persistence.service';
import { StoreTargetService } from './services/store-target.service';
import { StoreTargetController } from './store-target.controller';
import { StoreTarget } from './store-target.entity';
import { StoreTargetRepository } from './store-target.repository';

@Module({
	imports: [
		TypeOrmModule.forFeature([StoreTarget]),
		DatabaseModule,
		forwardRef(() => PromotionModule),
		forwardRef(() => StoreModule),
		forwardRef(() => ExtractModule)
	],
	providers: [
		StoreTargetService,
		StoreTargetRepository,
		StoreTargetPersistenceService,
	],
	controllers: [StoreTargetController],
	exports: [StoreTargetService, StoreTargetPersistenceService],
})
export class StoreTargetModule {}
