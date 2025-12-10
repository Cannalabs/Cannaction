import { CreateFolderRequest } from '../dtos/requests/CreateFolderRequest';
import { PaginationFilterExtractRequest } from '../dtos/requests/PaginationFilterExtractRequest';
import ResponsePagination from '../dtos/responses/ResponsePaginationResponse';
import { ArchiveEntity } from '../models/entities/ArchiveEntity';
import { FolderEntity } from '../models/entities/FolderEntity';
import { getJWTAuthHeader } from '../utils/auth';
import { api } from '../utils/axios';

export default class DownloadService {
	static async findFolders(params?: PaginationFilterExtractRequest) {
		return api
			.get<ResponsePagination<FolderEntity>>('download/folder', {
				headers: getJWTAuthHeader(),
				params,
			})
			.then((response) => response.data);
	}

	static async findArchives(
		folderId: number,
		params?: PaginationFilterExtractRequest
	) {
		return api
			.get<ResponsePagination<ArchiveEntity>>(`download/archive/${folderId}`, {
				headers: getJWTAuthHeader(),
				params,
			})
			.then((response) => response.data);
	}

	static async createFolder(body: CreateFolderRequest) {
		await api.post('download/folder', body, { headers: getJWTAuthHeader() });
	}

	static async createArchive(body: FormData, folderId: number, userType?: string, countryId?: number) {
		await api.post(`download/archive/${folderId}/${countryId ?? 'null'}/${userType ?? null }`,
			body, 
			{ headers: {...getJWTAuthHeader(), 
				'content-type': 'multipart/form-data',
				'Access-Control-Allow-Origin': '*'
			} 
		});
	}

	static async deleteFolder(id: number) {
		await api
			.delete(`download/folder/${id}`, {
				headers: getJWTAuthHeader(),
			})
			.then((response) => response.data);
	}

	static async deleteArchive(id: number) {
		await api
			.delete(`download/archive/${id}`, {
				headers: getJWTAuthHeader(),
			})
			.then((response) => response.data);
	}
}
