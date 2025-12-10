import { Country } from '@/modules/country/country.entity';
import { Injectable } from '@nestjs/common';
import { CreateArchiveRequest } from '../dtos/requests/create-archive.request';
import { CreateFolderRequest } from '../dtos/requests/create-folder.request';
import { DownloadS3Repository } from '../repositories/download-s3.repository';
import { DownloadRepository } from '../repositories/download.repository';

@Injectable()
export class DownloadPersistenceService {
	constructor(
		private readonly downloadRepository: DownloadRepository,
		private readonly downloadS3Repository: DownloadS3Repository
	) {}

	async createFolder(body: CreateFolderRequest) {
		await this.downloadRepository.createFolder({ name: body.name });
	}

	async createArchive(body: CreateArchiveRequest) {
		const fileBuffer = await body.file.toBuffer();

		const buffer = Buffer.from(fileBuffer);
		const folder = await this.downloadRepository.findFolderById(body.folderId);
		const patch = await this.downloadS3Repository.save(folder.name, body.file.filename, buffer, body.file.mimetype);
		await this.downloadRepository.createArchive({
			name: body.file.filename,
			folder,
			country: body.countryId ? new Country({ id: body.countryId }) : null,
			userType: body.userType ? body.userType : null,
			patch
		});
	}

	async deleteArchive(id: number) {
		const archive = await this.downloadRepository.findOneArchive(id);
		await this.downloadS3Repository.remove(archive.folder.name, archive.name);
		await this.deleteArchiveDatabase(archive.id);
	}

	async deleteFolder(id: number) {
		const archiveList = await this.downloadRepository.getArchivesByFolderId(id);
		const folder = await this.downloadRepository.findFolderById(id);

		for (const archive of archiveList) {
			await this.downloadS3Repository.remove(folder.name, archive.name);
			await this.deleteArchiveDatabase(archive.id);
		}

		await this.downloadRepository.deleteFolder(id);
	}

	private async deleteArchiveDatabase(id: number) {
		await this.downloadRepository.deleteArchive(id);

	}
}
