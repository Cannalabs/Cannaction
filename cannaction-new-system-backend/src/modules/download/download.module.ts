import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { DownloadController } from './download.controller';
import { Archive } from './entities/archive.entity';
import { Folder } from './entities/folder.entity';
import { DownloadS3Repository } from './repositories/download-s3.repository';
import { DownloadRepository } from './repositories/download.repository';
import { DownloadPersistenceService } from './services/download-persistence.service';
import { DownloadService } from './services/download.service';
import { FileHelperService } from './services/file-helper.service';

@Module({
	imports: [TypeOrmModule.forFeature([Folder, Archive]), DatabaseModule],
	providers: [DownloadService, DownloadPersistenceService, DownloadRepository, DownloadS3Repository, FileHelperService],
	controllers: [DownloadController],
})
export class DownloadModule {}
