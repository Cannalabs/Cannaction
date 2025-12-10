import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { PromotionController } from './promotion.controller';
import { Promotion } from './promotion.entity';
import { PromotionRepository } from './repositories/promotion.repository';
import { PromotionS3Repository } from './repositories/promotion.s3.repository';
import { PromotionPersistenceService } from './services/promotion-persistence.service';
import { PromotionService } from './services/promotion.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([Promotion]),
		DatabaseModule,
		forwardRef(() => UserModule)],
	providers: [
		PromotionService,
		PromotionRepository,
		PromotionS3Repository,
		PromotionPersistenceService,
	],
	controllers: [PromotionController],
	exports: [PromotionService, PromotionPersistenceService],
})
export class PromotionModule {}
