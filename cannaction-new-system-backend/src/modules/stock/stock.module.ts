import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { StockPersistenceService } from './services/stock-persistence.service';
import { StockService } from './services/stock.service';
import { StockController } from './stock.controller';
import { Stock } from './stock.entity';
import { StockRepository } from './stock.repository';

@Module({
	imports: [TypeOrmModule.forFeature([Stock]), DatabaseModule, forwardRef(() => UserModule)],
	providers: [StockService, StockPersistenceService, StockRepository],
	controllers: [StockController],
	exports: [StockService, StockPersistenceService],
})
export class StockModule {}
