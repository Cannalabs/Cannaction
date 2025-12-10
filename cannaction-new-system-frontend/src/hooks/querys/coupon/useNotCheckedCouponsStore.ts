import { ResetQueryFilters, useQuery } from '@tanstack/react-query';
import CouponService from '../../../services/CouponService';
import { queryClient } from '../../../utils/query';
import PaginationFilterCouponRequest from '../../../dtos/requests/PaginationFilterCouponRequest';

const STALE_TIME = 300000; // 30 seconds

const KEY = 'not-checked-coupons-store';

export const useNotCheckedCouponsStore = (filter?: PaginationFilterCouponRequest) => {
	const { data, isLoading, isRefetching, refetch } = useQuery(
		[KEY, filter],
		async () => {
			return CouponService.findNotCheckedCouponsUserStore(filter);
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
