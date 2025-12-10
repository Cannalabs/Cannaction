import { PaginationFilterExtractRequest } from '../dtos/requests/PaginationFilterExtractRequest';
import ResponsePagination from '../dtos/responses/ResponsePaginationResponse';
import { ExtractEntity } from '../models/entities/ExtractEntity';
import { getJWTAuthHeader } from '../utils/auth';
import { api } from '../utils/axios';

export default class ExtractService {
	static getExtractListByUser(params: PaginationFilterExtractRequest) {
		return api
			.get<ResponsePagination<ExtractEntity>>(`extract`, {
				headers: getJWTAuthHeader(),
                params
			})
			.then((response) => response.data);
	}
}
