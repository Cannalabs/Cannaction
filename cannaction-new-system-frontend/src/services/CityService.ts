// src/services/CityService.ts

import { CityEntity } from '../models/entities/CityEntity';
import { getBasicAuth } from '../utils/auth';
import { api } from '../utils/axios';

export default class CityService {
	static async getCitiesByState(stateId: number) {
		return api
			.get<CityEntity[]>(`city/${stateId}/by-state`, {
				headers: { Authorization: getBasicAuth() },
			})
			.then((response) => response.data);
	}
}
