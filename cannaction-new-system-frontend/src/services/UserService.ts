// src/services/UserService.ts

import CreateClubCardUserRequest from '../dtos/requests/CreateClubCardUserRequest';
import CreateUserRequest from '../dtos/requests/CreateUserRequest';
import { FilterUserLabeledDto } from '../dtos/requests/FilterUserLabeledRequest';
import PaginationFilterUserRequest from '../dtos/requests/PaginationFilterUserRequest';
import { UpdateClubCardUserRequest } from '../dtos/requests/UpdateClubCardUserRequest';
import { UpdateUserProfileRequest } from '../dtos/requests/UpdateUserProfileRequest';
import { UpdateUserRequest } from '../dtos/requests/UpdateUserRequest';
import ResponsePagination from '../dtos/responses/ResponsePaginationResponse';
import UserEntity from '../models/entities/UserEntity';
import { getBasicAuth, getJWTAuthHeader } from '../utils/auth';
import { api } from '../utils/axios';
import { convertToBase64 } from '../utils/convertToBase64';

export default class UserService {
	static async createNewUser(body: CreateUserRequest) {
		return api.post('user', body, {
			headers: {
				Authorization: getBasicAuth(),
			},
		});
	}

	static async getClubCardUserForLogin(code: string) {
		return api
			.get(`auth/${code}/club-card-login`, {
				headers: {
					Authorization: getBasicAuth(),
				},
			})
			.then((response) => response.data);
	}

	static findById(id: number) {
		return api
			.get<UserEntity>(`user/${id}`, {
				headers: getJWTAuthHeader(),
			})
			.then((response) => response.data);
	}

	static findByClubCardCode(code: string) {
		return api
			.get<UserEntity>(`user/club-card-code/${code}`, {
				headers: getJWTAuthHeader(),
			})
			.then((response) => response.data);
	}

	static findAll(params?: PaginationFilterUserRequest) {
		return api
			.get<ResponsePagination<UserEntity>>('user', {
				headers: getJWTAuthHeader(),
				params,
			})
			.then((response) => response.data);
	}

	static getUsersClubcard(params?: PaginationFilterUserRequest) {
		return api
			.get<ResponsePagination<UserEntity>>(`user/club-card`, {
				headers: getJWTAuthHeader(),
				params,
			})
			.then((response) => response.data);
	}

	static async changeUserStatus(id: number, status: boolean) {
		await api.put(`user/${id}/${status ? 'inactive' : 'active'}`, undefined, {
			headers: getJWTAuthHeader(),
		});
	}

	static createClubCardUser(body: CreateClubCardUserRequest) {
		return api.post('user/club-card-user', body, {
			headers: getJWTAuthHeader(),
		});
	}

	static async updateClubCardUser(id: number, body: UpdateClubCardUserRequest) {
		await api.put(`user/${id}/club-card-user`, body, {
			headers: getJWTAuthHeader(),
		});
	}

	static async deleteClubCardUser(id: number) {
		await api.delete(`user/${id}/club-card-user`, {
			headers: getJWTAuthHeader(),
		});
	}

	static async createByMarketing(body: CreateUserRequest) {
		await api.post(`user/create-by-marketing`, body, {
			headers: getJWTAuthHeader(),
		});
	}

	static async updateByMarketing(id: number, body: UpdateUserRequest) {
		await api.put(`user/${id}/update-by-marketing`, body, {
			headers: getJWTAuthHeader(),
		});
	}

	static async updateUserProfile(id: number, body: UpdateUserProfileRequest) {
		await api.put(`user/${id}/update-profile`, body, {
			headers: getJWTAuthHeader(),
		});
	}

	static async generateNewPassword(id: number) {
		await api.put(`user/${id}/generate-password`, undefined, {
			headers: getJWTAuthHeader(),
		});
	}

	static async getLabeledUsers(params: FilterUserLabeledDto) {
		return api
			.get<UserEntity[]>(`user/labeled`, {
				headers: getJWTAuthHeader(),
				params,
			})
			.then((response) => response.data);
	}

	static async updateUserProfilePic(id: number, image: File) {
		const picOnBase64 = await convertToBase64(image);

		await api.put(
			`user/${id}/profile-pic`,
			{ image: picOnBase64 },
			{ headers: getJWTAuthHeader() }
		);
	}
}
