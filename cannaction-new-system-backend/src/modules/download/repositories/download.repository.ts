import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { PaginationService } from '@/modules/database/pagination.service';
import { PaginationOptionsDto } from '@/modules/database/pagination/pagination-options';
import { UserType } from '@/modules/user/enums/user-type.enum';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, DeepPartial, Repository } from 'typeorm';
import { FindDownloadRequest } from '../dtos/requests/find-download.request';
import { Archive } from '../entities/archive.entity';
import { Folder } from '../entities/folder.entity';

@Injectable()
export class DownloadRepository {
	constructor(
		@InjectRepository(Folder)
		private folderRepository: Repository<Folder>,
		@InjectRepository(Archive)
		private archiveRepository: Repository<Archive>,
		private readonly paginationService: PaginationService
	) {}

	async findOneArchive(id: number) {
		return this.archiveRepository.findOne({ where: { id }, relations: ['folder'] });
	}

	async getAllFolders(currentUser: CurrentUser, filter: FindDownloadRequest, options: PaginationOptionsDto) {
		const queryBuilder = this.folderRepository.manager
			.getRepository(Folder)
			.createQueryBuilder('folder');

		if (currentUser.userType !== UserType.SUPER) {
			queryBuilder.leftJoin('folder.archives', 'archive');
			queryBuilder.leftJoin('archive.country', 'country')
			if (currentUser.userType !== UserType.MARKETING) {
				queryBuilder.andWhere(new Brackets((q) => {
					q.orWhere('archive.userType IS NULL');
					q.orWhere('archive.userType = :userType', { userType: currentUser.userType });
				}));
			}

			queryBuilder.andWhere(new Brackets((q) => {
				q.orWhere('archive.country_id IS NULL');
				q.orWhere('country.id = :country', { country: currentUser.userCountry });
			}));
		}

		if (filter.search) {
			const searchTerm = `%${filter.search.toLowerCase()}%`;
			queryBuilder.andWhere('LOWER(folder.name) LIKE :searchTerm', {
				searchTerm,
			});
		}

		queryBuilder.orderBy('folder.createdAt', 'DESC');

		return this.paginationService.paginate<Folder>(options, queryBuilder);
	}

	async getArchivesByFolder(currentUser: CurrentUser, folderId: number, filter: FindDownloadRequest, options: PaginationOptionsDto) {
		const queryBuilder = this.archiveRepository.manager
			.getRepository(Archive)
			.createQueryBuilder('archive');
		queryBuilder.innerJoin('archive.folder', 'folder');
		queryBuilder.andWhere('folder.id = :folderId', { folderId });
		queryBuilder.leftJoin('archive.country', 'country');

		if (currentUser.userType !== UserType.SUPER) {
			queryBuilder.andWhere(
				new Brackets((qb) => {
					return qb
						.where('archive.country_id is null')
						.orWhere('archive.country_id = :countryId', { countryId: currentUser.userCountry });
				})
			);
			if (currentUser.userType !== UserType.MARKETING) {
				queryBuilder.andWhere(
					new Brackets((qb) => {
						return qb
							.where('archive.userType is null')
							.orWhere('archive.userType = :userType', { userType: currentUser.userType });
					})
				);
			}
		}

		if (filter.search) {
			const searchTerm = `%${filter.search.toLowerCase()}%`;
			queryBuilder.andWhere('LOWER(archive.name) LIKE :searchTerm', {
				searchTerm,
			});
		}

		queryBuilder.select(['archive.id', 'archive.name', 'archive.createdAt', 'archive.patch', 'archive.userType', 'country.id', 'country.name']);
		queryBuilder.orderBy('archive.createdAt', 'DESC');


		return this.paginationService.paginate<Archive>(options, queryBuilder);
	}

	async findFolderById(id: number) {
		return this.folderRepository.findOne({ where: { id } });
	}

	async createFolder(entity: DeepPartial<Folder>) {
		await this.folderRepository.save(entity);
	}

	async createArchive(entity: DeepPartial<Archive>) {
		await this.archiveRepository.save(entity);
	}

	async getArchivesByFolderId(id: number) {
		return this.archiveRepository.find({ where: { folder: { id } } })
	}

	async deleteArchive(id: number) {
		await this.archiveRepository.delete(id);
	}

	async deleteFolder(id: number) {
		await this.folderRepository.delete(id);
	}
}
