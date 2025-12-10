import { ResetQueryFilters, useQuery } from '@tanstack/react-query';
import ChangeShopService from '../../../services/ChangeShopService';
import { queryClient } from '../../../utils/query';
import PaginationFilterRequest from '../../../dtos/requests/paginationFilterRequest';

const STALE_TIME = 300000;
const KEY = 'change-shops-customer';


export const useChangeShopsCustomer = (filter?: PaginationFilterRequest) => {
	const { data, isLoading, isRefetching, refetch } = useQuery(
		[KEY],
		() => ChangeShopService.findChangeShopsForCustomer(filter),
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

export const resetChangeShops = async (filters?: ResetQueryFilters) => {
	await queryClient.resetQueries([KEY], filters).catch(console.error);
};

export const removeChangeShops = () => {
	queryClient.removeQueries([KEY]);
};
