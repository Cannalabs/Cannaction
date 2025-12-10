// src/services/LanguageService.ts

import { LanguageEntity } from '../models/entities/LanguageEntity';
import { getBasicAuth } from '../utils/auth';
import { api } from '../utils/axios';

export default class LanguageService {
	static async getLanguages() {
		return api
			.get<LanguageEntity[]>('language', {
				headers: { Authorization: getBasicAuth() },
			})
			.then((response) => response.data);
	}
}
