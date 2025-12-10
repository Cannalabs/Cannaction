import { useQuery } from '@tanstack/react-query';

import { queryClient } from '../../../utils/query';
import PromotionService from '../../../services/PromotionService';
import { PromotionEntity } from '../../../models/entities/PromotionEntity';

const KEY = 'promotion';

export const usePromotion = (id: number | undefined) => {
	const { data, isLoading, refetch, isRefetching } = useQuery(
		[KEY, id],
		() => (id ? PromotionService.getById(id) : null),
		{
			refetchOnMount: true,
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

/**
 * @see {@link https://react-query-v3.tanstack.com/reference/QueryClient#queryclientsetqueriesdata}
 */
export const setPromotion = (data: PromotionEntity) => {
	queryClient.setQueriesData([KEY, data?.id], data);
};

/**
 * @see {@link https://react-query-v3.tanstack.com/reference/QueryClient#queryclientremovequeries}
 */
export const removePromotion = (id: number) => {
	queryClient.removeQueries([KEY, id]);
};

const handleFunction = async (id: number) => {
	const promotion = await PromotionService.getById(id);
	return promotion;
};

export const prefetchPromotion = (id: number) => {
	queryClient.prefetchQuery([KEY, id], () => handleFunction(id));
};
