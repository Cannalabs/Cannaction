import { PaginationFilterItemRequest } from '../dtos/requests/PaginationFilterItemRequest';
import ResponsePagination from '../dtos/responses/ResponsePaginationResponse';
import ClubCardCodeListEntity from '../models/entities/ClubCardCodeListEntity';
import { getJWTAuthHeader } from '../utils/auth';
import { api } from '../utils/axios';

export default class ClubCardService {
	static getClubCardList(filter: PaginationFilterItemRequest) {
		return api
			.get<ResponsePagination<ClubCardCodeListEntity>>('club-card-code-list', {
				headers: getJWTAuthHeader(),
				params: filter,
			})
			.then((response) => response.data);
	}
}
