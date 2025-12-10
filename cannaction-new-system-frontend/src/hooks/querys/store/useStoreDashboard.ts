import { useQuery } from '@tanstack/react-query';
import StoreService from '../../../services/StoreService';

const STALE_TIME = 300000;

const KEY = 'store-dashboard';

export const useStoreDashboard = () => {
	const { data, isLoading, refetch, isRefetching } = useQuery(
		[KEY],
		() => {
			return StoreService.getStoreUserDashboardData();
		},
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
