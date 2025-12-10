import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Query,
	Req,
	UseGuards,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import {
	CurrentUser,
	ReqCurrentUser,
} from '../auth/decorators/current-user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { PaginationOptionsDto } from '../database/pagination/pagination-options';
import { UserType } from '../user/enums/user-type.enum';
import { CreateFolderRequest } from './dtos/requests/create-folder.request';
import { FindDownloadRequest } from './dtos/requests/find-download.request';
import { DownloadPersistenceService } from './services/download-persistence.service';
import { DownloadService } from './services/download.service';
import { FileHelperService } from './services/file-helper.service';

@Controller('download')
export class DownloadController {
	constructor(
		private readonly downloadService: DownloadService,
		private readonly downloadPersistenceService: DownloadPersistenceService,
		private readonly fileHelperService: FileHelperService
	) {}

	@UseGuards(JwtGuard)
	@Get('folder')
	public async findAllFolders(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Query() params: FindDownloadRequest,
		@Query() options: PaginationOptionsDto
	) {
		return this.downloadService.getAllFolders(currentUser, params, options);
	}

	@UseGuards(JwtGuard)
	@Get('archive/:id')
	public async findAllArchives(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Param('id') id: number,
		@Query() params: FindDownloadRequest,
		@Query() options: PaginationOptionsDto
	) {
		return this.downloadService.getArchivesByFolderId(currentUser, id, params, options);
	}

	@UseGuards(JwtGuard)
	@Post('folder')
	public async createFolder(@Body() body: CreateFolderRequest) {
		return this.downloadPersistenceService.createFolder(body);
	}

	@UseGuards(JwtGuard)
	@Post('archive/:folderId/:countryId/:userType')
	public async createArchive(
		@Req() req: FastifyRequest,
		@Param('folderId') folderId: number,
		@Param('countryId') countryId: string,
		@Param('userType') userType: string,

	) {
		const data = await this.fileHelperService.getFileFromRequest(req)
		await this.downloadPersistenceService.createArchive({
			file: data,
			folderId: folderId,
			countryId: countryId == '0' ? null : Number(countryId),
			userType: userType == 'null' ? null : userType as UserType
		});
	}

	@UseGuards(JwtGuard)
	@Delete('folder/:id')
	public async deleteFolder(@Param('id') id: number): Promise<void> {
		await this.downloadPersistenceService.deleteFolder(id);
	}
	@UseGuards(JwtGuard)
	@Delete('archive/:id')
	public async delete(@Param('id') id: number): Promise<void> {
		await this.downloadPersistenceService.deleteArchive(id);
	}
}
