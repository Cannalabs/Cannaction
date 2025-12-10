import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { ExtractModule } from '../extract/extract.module';
import { ItemModule } from '../item/item.module';
import { StoreModule } from '../store/store.module';
import { UserModule } from '../user/user.module';
import { UserTargetPersistenceService } from './services/user-target-persistence.service';
import { UserTargetService } from './services/user-target.service';
import { UserTargetController } from './user-target.controller';
import { UserTarget } from './user-target.entity';
import { UserTargetRepository } from './user-target.repository';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserTarget]),
		DatabaseModule,
		forwardRef(() => StoreModule),
		forwardRef(() => UserModule),
		forwardRef(() => ItemModule),
		forwardRef(() => ExtractModule)
	],
	providers: [
		UserTargetService,
		UserTargetRepository,
		UserTargetPersistenceService,

	],
	controllers: [UserTargetController],
	exports: [UserTargetService, UserTargetPersistenceService],
})
export class UserTargetModule {}
