import { MarketingDashboardResponse } from '../dtos/responses/MarketingDashboardResponse';
import CountryEntity from '../models/entities/CountryEntity';
import { getBasicAuth, getJWTAuthHeader } from '../utils/auth';
import { api } from '../utils/axios';

export default class CountryService {
	static getCountryList() {
		return api
			.get<CountryEntity[]>('country', {
				headers: { Authorization: getBasicAuth() },
			})
			.then((response) => response.data);
	}

	static getDashboardMarketingData() {
		return api
			.get<MarketingDashboardResponse>('country/marketing-dashboard', {
				headers: getJWTAuthHeader(),
			})
			.then((response) => response.data);
	}

	static getCountryById(id: number) {
		return api
			.get<CountryEntity>(`country/${id}`, {
				headers: { Authorization: getBasicAuth() },
			})
			.then((response) => response.data);
	}
}
