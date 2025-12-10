import { useQuery } from '@tanstack/react-query';
import CountryService from '../../../services/CountryService';

const STALE_TIME = 300000;
const KEY = 'labeled-countries';

export type CountryType = {
	value: number;
	label: string;
};

export const useCountriesLabeled = () => {
	const { data = [], refetch, isLoading } = useQuery(
		[KEY],
		async () => {
			const result = await CountryService.getCountryList();
			return result?.map(
				(c) =>
					({
						value: c.id,
						label: c.name,
					} as CountryType)
			);
		},
		{
			staleTime: STALE_TIME,
		}
	);
	return { countries: data, refetch, isLoading };
};
