import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { ExtractModule } from '../extract/extract.module';
import { ItemModule } from '../item/item.module';
import { PromotionModule } from '../promotion/promotion.module';
import { StockModule } from '../stock/stock.module';
import { UserModule } from '../user/user.module';
import { CouponController } from './coupon.controller';
import { Coupon } from './coupon.entity';
import { CouponRepository } from './coupon.repository';
import { CouponPersistenceService } from './services/coupon-persistence.service';
import { CouponService } from './services/coupon.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([Coupon]),
		DatabaseModule,
		forwardRef(() => UserModule),
		PromotionModule,
		ItemModule,
		StockModule,
		ExtractModule
	],
	providers: [CouponService, CouponRepository, CouponPersistenceService],
	controllers: [CouponController],
	exports: [CouponService, CouponPersistenceService],
})
export class CouponModule {}
