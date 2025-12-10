import { CreateInviteFriendRequest } from '../dtos/requests/CreateInviteFriendRequest';
import { PaginationFilterExtractRequest } from '../dtos/requests/PaginationFilterExtractRequest';
import ResponsePagination from '../dtos/responses/ResponsePaginationResponse';
import { InviteFriendEntity } from '../models/entities/InviteFriendEntity';
import { getJWTAuthHeader } from '../utils/auth';
import { api } from '../utils/axios';

export default class InviteFriendService {
	static getInviteList(params: PaginationFilterExtractRequest) {
		return api
			.get<ResponsePagination<InviteFriendEntity>>(`invite-friend`, {
				headers: getJWTAuthHeader(),
                params
			})
			.then((response) => response.data);
	}

    static async createInvteFriend(body: CreateInviteFriendRequest) {
        await api.post('invite-friend', body, {
            headers: getJWTAuthHeader()
        })
    }
}
