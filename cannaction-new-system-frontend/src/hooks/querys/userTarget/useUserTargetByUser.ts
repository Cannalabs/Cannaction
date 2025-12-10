import { ResetQueryFilters, useQuery } from '@tanstack/react-query';
import UserTargetService from '../../../services/UserTargetService';
import { queryClient } from '../../../utils/query';

const STALE_TIME = 300000; // 30 seconds

const KEY = 'user-target-bby-user';

export const useUserTargetByUser = (storeId: number, userId?: number) => {
	const { data, isLoading, isRefetching, refetch } = useQuery(
		[KEY],
		() => {
			return userId ? UserTargetService.getByUser(userId, storeId) : null;
		},
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

export const resetUserTargetByUser = async (filters?: ResetQueryFilters) => {
	await queryClient.resetQueries([KEY], filters).catch(console.error);
};

export const removeUserTargetByUser = () => {
	queryClient.removeQueries([KEY]);
};
