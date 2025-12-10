import { ResetQueryFilters, useQuery } from '@tanstack/react-query';
import CountryService from '../../../services/CountryService';
import { queryClient } from '../../../utils/query';

const STALE_TIME = 300000; // 30 seconds

const KEY = 'dashboard-data';

export const useDashboardData = () => {
	const { data, isLoading, isRefetching, refetch } = useQuery(
		[KEY],
		() => CountryService.getDashboardMarketingData(),
		{
			staleTime: STALE_TIME,
		}
	);

	return {
		data,
		isLoading,
		isRefetching,
		refetch,
	};
};

export const resetDashboardDAta = async (filters?: ResetQueryFilters) => {
	await queryClient.resetQueries([KEY], filters).catch(console.error);
};

export const removeDashboardDAta = () => {
	queryClient.removeQueries([KEY]);
};
