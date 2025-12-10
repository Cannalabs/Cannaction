// src/services/StateService.ts

import { StateEntity } from '../models/entities/StateEntity';
import { getBasicAuth } from '../utils/auth';
import { api } from '../utils/axios';

export default class StateService {
	static async getStatesByCountry(countryId: number) {
		return api
			.get<StateEntity[]>(`state/${countryId}/by-country`, {
				headers: { Authorization: getBasicAuth() },
			})
			.then((response) => response.data);
	}
}
