import { ResetQueryFilters, useQuery } from '@tanstack/react-query';
import CouponService from '../../../services/CouponService';
import { queryClient } from '../../../utils/query';
import PaginationFilterRedeemedItemsRequest from '../../../dtos/requests/PaginationFilterRedeemedItemsRequest';

const STALE_TIME = 300000;

const KEY = 'redeemed-items';

export const useRedeemedItems = (
	filter: PaginationFilterRedeemedItemsRequest
) => {
	const { data, isLoading, isRefetching, refetch } = useQuery(
		[KEY, filter],
		async () => {
			return CouponService.findForRedeemedItems(filter);
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

export const resetCoupons = async (filters?: ResetQueryFilters) => {
	await queryClient.resetQueries([KEY], filters).catch(console.error);
};

export const removeCoupons = () => {
	queryClient.removeQueries([KEY]);
};
