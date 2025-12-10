import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarcodeModule } from '../barcode/barcode.module';
import { DatabaseModule } from '../database/database.module';
import { StockModule } from '../stock/stock.module';
import { StoreModule } from '../store/store.module';
import { UserModule } from '../user/user.module';
import { ItemController } from './item.controller';
import { Item } from './item.entity';
import { ItemRepository } from './repositories/item.repository';
import { ItemS3Repository } from './repositories/item.s3.repository';
import { ItemPersistenceService } from './services/item-persistence.service';
import { ItemService } from './services/item.service';

@Module({
	imports: [TypeOrmModule.forFeature([Item]), forwardRef(() => StoreModule), DatabaseModule, forwardRef(() => UserModule), StockModule, BarcodeModule],
	providers: [ItemService, ItemRepository, ItemPersistenceService, ItemS3Repository],
	controllers: [ItemController],
	exports: [ItemService],
})
export class ItemModule {}
