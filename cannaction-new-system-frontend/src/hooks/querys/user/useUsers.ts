import { useQuery } from '@tanstack/react-query';
import UserService from '../../../services/UserService';
import PaginationFilterUserRequest from '../../../dtos/requests/PaginationFilterUserRequest';

const STALE_TIME = 300000;

const KEY = 'users';

export const useUsers = (filter?: PaginationFilterUserRequest) => {
	const { data, isLoading, refetch, isRefetching } = useQuery(
		[KEY, filter],
		() => UserService.findAll(filter),
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
