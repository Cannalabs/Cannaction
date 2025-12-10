import { ResetQueryFilters, useQuery } from '@tanstack/react-query';
import UserTargetService from '../../../services/UserTargetService';
import { queryClient } from '../../../utils/query';
import PaginationFilterUserTargetRequest from '../../../dtos/requests/UserTargetFilterRequest';

const STALE_TIME = 300000; // 30 seconds

const KEY = 'user-targets';

export const useUserTargets = (
	filter?: PaginationFilterUserTargetRequest
) => {
	const {
		data,
		isLoading,
		isRefetching,
		refetch,
	} = useQuery([KEY], () => UserTargetService.getForMarketing(filter), {
		staleTime: STALE_TIME,
	});

	return {
		data,
		isLoading,
		isRefetching,
		refetch,
	};
};

export const resetUserTargets = async (filters?: ResetQueryFilters) => {
	await queryClient.resetQueries([KEY], filters).catch(console.error);
};

export const removeUserTargets = () => {
	queryClient.removeQueries([KEY]);
};
