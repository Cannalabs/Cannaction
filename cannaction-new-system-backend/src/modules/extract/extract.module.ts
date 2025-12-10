import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { ExtractController } from './extract.controller';
import { Extract } from './extract.entity';
import { ExtractRepository } from './extract.repository';
import { ExtractPersistenceService } from './services/extract-persistence.service';
import { ExtractService } from './services/extract.service';

@Module({
	imports: [TypeOrmModule.forFeature([Extract]), DatabaseModule, forwardRef(() => UserModule)],
	providers: [
		ExtractService,
		ExtractPersistenceService,
		ExtractRepository,
	],
	controllers: [ExtractController],
	exports: [ExtractService, ExtractPersistenceService],
})
export class ExtractModule {}
