import { useQuery } from '@tanstack/react-query';
import UserService from '../../../services/UserService';
import PaginationFilterUserRequest from '../../../dtos/requests/PaginationFilterUserRequest';

const STALE_TIME = 300000;

const KEY = 'user-club-card-users';

export const useClubCardUsers = (filter: PaginationFilterUserRequest) => {
	const { data, isLoading, refetch, isRefetching } = useQuery(
		[KEY, filter],
		() => UserService.getUsersClubcard(filter),
		{
			staleTime: STALE_TIME,
			refetchOnMount: false,
			refetchOnReconnect: false,
			refetchOnWindowFocus: false,
		}
	);

	return {
		data,
		isLoading,
		refetch,
		isRefetching,
	};
};
