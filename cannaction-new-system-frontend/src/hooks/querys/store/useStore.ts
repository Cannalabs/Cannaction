import { useQuery } from '@tanstack/react-query';
import StoreService from '../../../services/StoreService';

const STALE_TIME = 300000;

const KEY = 'store';

export const useStore = (id: number | undefined) => {
	const { data, isLoading, refetch, isRefetching } = useQuery(
		[KEY, id],
		() => (id ? StoreService.findById(id) : null),
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
