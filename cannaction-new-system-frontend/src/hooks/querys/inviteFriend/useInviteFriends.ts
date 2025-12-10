import { ResetQueryFilters, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../../utils/query';
import { PaginationFilterExtractRequest } from '../../../dtos/requests/PaginationFilterExtractRequest';
import InviteFriendService from '../../../services/InviteFriendService';

const STALE_TIME = 300000; // 30 seconds

const KEY = 'invite-friends';

export const useInviteFriends = (filter: PaginationFilterExtractRequest) => {
	const { data, isLoading, isRefetching, refetch } = useQuery(
		[KEY, filter],
		async () => {
			return InviteFriendService.getInviteList(filter);
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

export const resetExtracts = async (filters?: ResetQueryFilters) => {
	await queryClient.resetQueries([KEY], filters).catch(console.error);
};

export const removeExtracts = () => {
	queryClient.removeQueries([KEY]);
};
