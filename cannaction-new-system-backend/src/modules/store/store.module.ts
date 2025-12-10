import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityModule } from '../city/city.module';
import { CountryModule } from '../country/country.module';
import { CouponModule } from '../coupon/coupon.module';
import { DatabaseModule } from '../database/database.module';
import { ExtractModule } from '../extract/extract.module';
import { LanguageModule } from '../language/language.module';
import { ProfilePontuationModule } from '../profile-pontuation/profile-pontuation.module';
import { SaleModule } from '../sale/sale.module';
import { StateModule } from '../state/state.module';
import { StockModule } from '../stock/stock.module';
import { StoreTargetModule } from '../store-target/store-target.module';
import { UserTargetModule } from '../user-target/user-target.module';
import { UserModule } from '../user/user.module';
import { StoreRepository } from './repositories/store.repository';
import { StoreS3Repository } from './repositories/store.s3.repository';
import { StorePersistenceService } from './services/store-persistence.service';
import { StoreService } from './services/store.service';
import { StoreController } from './store.controller';
import { Store } from './store.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([Store]),
		DatabaseModule,
		CouponModule,
		LanguageModule,
		CityModule,
		StateModule,
		forwardRef(() => SaleModule),
		forwardRef(() => UserModule),
		StoreTargetModule,
		UserTargetModule,
		StockModule,
		forwardRef(() => ExtractModule),
		forwardRef(() => CountryModule),
		ProfilePontuationModule
	],
	providers: [StoreService, StoreRepository, StorePersistenceService, StoreS3Repository],
	controllers: [StoreController],
	exports: [StoreService, StorePersistenceService],
})
export class StoreModule {}
