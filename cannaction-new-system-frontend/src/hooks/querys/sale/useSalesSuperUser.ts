import { ResetQueryFilters, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../../utils/query';
import SalesService from '../../../services/SalesService';

const STALE_TIME = 300000; // 30 seconds

const KEY = 'sales-super-user';

export const useSalesSuperUser = () => {
	const { data, isLoading, isRefetching, refetch } = useQuery(
		[KEY],
		() => SalesService.getTopFiveMostSoldItems(),
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

export const resetSales = async (filters?: ResetQueryFilters) => {
	await queryClient.resetQueries([KEY], filters).catch(console.error);
};

export const removeSales = () => {
	queryClient.removeQueries([KEY]);
};
