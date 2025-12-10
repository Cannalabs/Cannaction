import { ResetQueryFilters, useQuery } from '@tanstack/react-query';
import CouponService from '../../../services/CouponService';
import { queryClient } from '../../../utils/query';

const STALE_TIME = 300000; // 30 seconds

const KEY = 'coupon-by-user';

export const useCouponByUser = (promotionId: number) => {
	const { data, isLoading, isRefetching, refetch } = useQuery(
		[KEY],
		async () => {
			return CouponService.findByUserAndPromotion(promotionId);
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
