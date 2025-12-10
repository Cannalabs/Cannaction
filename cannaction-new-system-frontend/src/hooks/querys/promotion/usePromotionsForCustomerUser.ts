import { ResetQueryFilters, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../../utils/query';
import PromotionService from '../../../services/PromotionService';

const STALE_TIME = 300000; // 30 seconds

const KEY = 'promotions-customer-user';

export const usePromotionsCustomerUser = () => {
	const { data, isLoading, isRefetching, refetch } = useQuery(
		[KEY],
		() => PromotionService.getPromotionListForCustomerUser(),
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
