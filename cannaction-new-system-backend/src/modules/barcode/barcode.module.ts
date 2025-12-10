import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { Barcode } from './barcode.entity';
import { BarcodeRepository } from './barcode.repository';
import { BarcodeService } from './barcode.service';

@Module({
	imports: [TypeOrmModule.forFeature([Barcode]), DatabaseModule, forwardRef(() => UserModule)],
	providers: [BarcodeService, BarcodeRepository],
	exports: [BarcodeService],
})
export class BarcodeModule {}
