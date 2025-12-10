import { ResetQueryFilters, useQuery } from '@tanstack/react-query';
import StoreService from '../../../services/StoreService';
import { queryClient } from '../../../utils/query';
import FilterStoreSettingsRequest from '../../../dtos/requests/FilterStoreSettingsRequest';

const STALE_TIME = 300000; // 30 seconds

const KEY = 'store-settings';

export const useStoreSettings = (id: number, filter: FilterStoreSettingsRequest) => {
	const { data, isLoading, isRefetching, refetch } = useQuery(
		[KEY, filter],
		async () => {
			return StoreService.findStoreSettings(id, filter);
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

export const resetStores = async (filters?: ResetQueryFilters) => {
	await queryClient.resetQueries([KEY], filters).catch(console.error);
};

export const removeStores = () => {
	queryClient.removeQueries([KEY]);
};
