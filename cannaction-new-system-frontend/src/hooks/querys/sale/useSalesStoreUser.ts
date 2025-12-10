import { ResetQueryFilters, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../../utils/query';
import SalesService from '../../../services/SalesService';
import PaginationFilterSalesRequest from '../../../dtos/requests/paginationFilterSalesRequest';

const STALE_TIME = 300000; // 30 seconds

const KEY = 'sales-store-user';

export const useSalesStoreUser = (filter?: PaginationFilterSalesRequest) => {
	const { data, isLoading, isRefetching, refetch } = useQuery(
		[KEY, filter],
		() => SalesService.getSalesForStoreUser(filter),
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
