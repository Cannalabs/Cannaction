import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { ChangeShopController } from './change-shop.controller';
import { ChangeShop } from './change-shop.entity';
import { ChangeShopRepository } from './change-shop.repository';
import { ChangeShopPersistenceService } from './services/change-shop-persistence.service';
import { ChangeShopService } from './services/change-shop.service';

@Module({
	imports: [TypeOrmModule.forFeature([ChangeShop]), DatabaseModule, UserModule],
	providers: [
		ChangeShopService,
		ChangeShopPersistenceService,
		ChangeShopRepository,
	],
	controllers: [ChangeShopController],
	exports: [ChangeShopService],
})
export class ChangeShopModule {}
