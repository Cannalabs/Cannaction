import { ResetQueryFilters, useQuery } from '@tanstack/react-query';
import StoreTargetService from '../../../services/StoreTargetService';
import { queryClient } from '../../../utils/query';
import PaginationFilterStoreTargetRequest from '../../../dtos/requests/StoreTargetFilterRequest';

const STALE_TIME = 300000; // 30 seconds

const KEY = 'store-targets-super-user';

export const useStoreTargetSuperUser = (params?: PaginationFilterStoreTargetRequest) => {
	const { data, isLoading, isRefetching, refetch } = useQuery(
		[KEY, params],
		() => StoreTargetService.getTargetSum(params),
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

export const resetStoreTargets = async (filters?: ResetQueryFilters) => {
	await queryClient.resetQueries([KEY], filters).catch(console.error);
};

export const removeStoreTargets = () => {
	queryClient.removeQueries([KEY]);
};
