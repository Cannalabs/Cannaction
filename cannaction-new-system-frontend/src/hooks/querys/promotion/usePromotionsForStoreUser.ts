import { ResetQueryFilters, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../../utils/query';
import PromotionService from '../../../services/PromotionService';
import PaginationFilterPromotionRequest from '../../../dtos/requests/paginationFilterPromotionRequest';

const STALE_TIME = 300000; // 30 seconds

const KEY = 'promotions-store-user';

export const usePromotionsStoreUser = (params?: PaginationFilterPromotionRequest) => {
	const { data, isLoading, isRefetching, refetch } = useQuery(
		[KEY, params],
		() => PromotionService.getPromotionListForStoreUser(params),
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

export const resetPromotions = async (filters?: ResetQueryFilters) => {
	await queryClient.resetQueries([KEY], filters).catch(console.error);
};

export const removePromotions = () => {
	queryClient.removeQueries([KEY]);
};
