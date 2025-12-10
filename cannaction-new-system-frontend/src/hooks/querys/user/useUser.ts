import { useQuery } from '@tanstack/react-query';
import UserService from '../../../services/UserService';

const STALE_TIME = 300000;

const KEY = 'user';

export const useUser = (id: number | undefined) => {
	const { data, isLoading, refetch, isRefetching } = useQuery(
		[KEY, id],
		() => (id ? UserService.findById(id) : null),
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
		isRefetching
	};
};
