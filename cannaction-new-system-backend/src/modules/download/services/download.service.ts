import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { PaginationOptionsDto } from '@/modules/database/pagination/pagination-options';
import { Injectable } from '@nestjs/common';
import { FindDownloadRequest } from '../dtos/requests/find-download.request';
import { DownloadRepository } from '../repositories/download.repository';

@Injectable()
export class DownloadService {
	constructor(
		private readonly downloadRepository: DownloadRepository,
	) {}

	async getAllFolders(currentUser: CurrentUser, filter: FindDownloadRequest, options: PaginationOptionsDto) {
		return this.downloadRepository.getAllFolders(currentUser, filter, options);
	}

	async getArchivesByFolderId(currentUser: CurrentUser, folderId: number, filter: FindDownloadRequest, options: PaginationOptionsDto) {
		return this.downloadRepository.getArchivesByFolder(currentUser, folderId, filter, options);
	}
}
