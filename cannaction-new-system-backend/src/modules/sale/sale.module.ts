import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryModule } from '../country/country.module';
import { DatabaseModule } from '../database/database.module';
import { ExtractModule } from '../extract/extract.module';
import { ItemModule } from '../item/item.module';
import { StockModule } from '../stock/stock.module';
import { StoreTargetModule } from '../store-target/store-target.module';
import { StoreModule } from '../store/store.module';
import { UserTargetModule } from '../user-target/user-target.module';
import { UserModule } from '../user/user.module';
import { SaleController } from './sale.controller';
import { Sale } from './sale.entity';
import { SaleRepository } from './sale.repository';
import { SalePersistenceService } from './services/sale-persistence.service';
import { SaleService } from './services/sale.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([Sale]),
		forwardRef(() => StoreModule),
		forwardRef(() => ItemModule),
		forwardRef(() => UserModule),
		forwardRef(() => CountryModule),
		forwardRef(() => UserModule),
		ExtractModule,
		StoreTargetModule,
		UserTargetModule,
		DatabaseModule,
		StockModule
	],
	providers: [SaleService, SaleRepository, SalePersistenceService],
	controllers: [SaleController],
	exports: [SaleService],
})
export class SaleModule {}
