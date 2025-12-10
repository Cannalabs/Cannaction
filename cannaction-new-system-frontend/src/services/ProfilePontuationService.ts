import { UpdateProfilePontuationRequest } from '../dtos/requests/UpdateProfilePontuationRequest';
import { ProfilePontuationEntity } from '../models/entities/ProfilePontuationEntity';
import { getJWTAuthHeader } from '../utils/auth';
import { api } from '../utils/axios';

export default class ProfilePontuationService {
	public static async findAll() {
		return api
			.get<ProfilePontuationEntity[]>('profile-pontuation', {
				headers: getJWTAuthHeader(),
			})
			.then((response) => response.data);
	}

	public static async update(id: number, body: UpdateProfilePontuationRequest) {
		await api.put(`profile-pontuation/${id}`, body, {
			headers: getJWTAuthHeader(),
		});
	}
}
