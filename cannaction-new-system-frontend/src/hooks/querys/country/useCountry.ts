import { useQuery } from '@tanstack/react-query';
import CountryService from '../../../services/CountryService';

const STALE_TIME = 300000; // 30 seconds

const KEY = 'country';

type Options = {
	staleTime?: number;
	enabled?: boolean;
};

export const useCountry = (id: number, options?: Options) => {
	const { data, isLoading, isRefetching, refetch } = useQuery(
		[KEY],
		() => CountryService.getCountryById(id),
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
