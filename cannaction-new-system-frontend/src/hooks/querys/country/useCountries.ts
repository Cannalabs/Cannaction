import { ResetQueryFilters, useQuery } from '@tanstack/react-query';
import CountryService from '../../../services/CountryService';
import { queryClient } from '../../../utils/query';

const STALE_TIME = 300000; // 30 seconds

const KEY = 'countries';

type Options = {
	staleTime?: number;
	enabled?: boolean;
};

export const useCountries = (options?: Options) => {
	const { data, isLoading, isRefetching, refetch } = useQuery(
		[KEY],
		() => CountryService.getCountryList(),
		{
			staleTime: STALE_TIME,
			...options,
		}
	);

	return {
		data,
		isLoading,
		isRefetching,
		refetch,
	};
};

export const resetCountries = async (filters?: ResetQueryFilters) => {
	await queryClient.resetQueries([KEY], filters).catch(console.error);
};

export const removeCountries = () => {
	queryClient.removeQueries([KEY]);
};
