import { CouponEntity } from '../models/entities/CouponEntity';
import PaginationFilterCouponRequest from '../dtos/requests/PaginationFilterCouponRequest';
import { getJWTAuthHeader } from '../utils/auth';
import { api } from '../utils/axios';
import ResponsePagination from '../dtos/responses/ResponsePaginationResponse';
import PaginationFilterRedeemedItemsRequest from '../dtos/requests/PaginationFilterRedeemedItemsRequest';
import { RedeemedItemsResponse } from '../dtos/responses/RedeemedItemsResponse';

export default class CouponService {
	public static async findCouponsForMarketing(
		params?: PaginationFilterCouponRequest
	) {
		return api
			.get<ResponsePagination<CouponEntity>>('coupon/checked-for-marketing', {
				headers: getJWTAuthHeader(),
				params,
			})
			.then((response) => response.data);
	}

	public static async findCouponsForCustomer(
		params?: PaginationFilterCouponRequest
	) {
		return api
			.get<ResponsePagination<CouponEntity>>('coupon/customer', {
				headers: getJWTAuthHeader(),
				params,
			})
			.then((response) => response.data);
	}

	public static async findForRedeemedItems(
		params: PaginationFilterRedeemedItemsRequest
	) {
		return api
			.get<RedeemedItemsResponse>('coupon/redeemed-items', {
				headers: getJWTAuthHeader(),
				params,
			})
			.then((response) => response.data);
	}

	public static async findCheckedCouponsUserStore(
		params?: PaginationFilterCouponRequest
	) {
		return api
			.get<ResponsePagination<CouponEntity>>('coupon/checked-coupons-store', {
				headers: getJWTAuthHeader(),
				params,
			})
			.then((response) => response.data);
	}

	public static async findNotCheckedCouponsUserStore(
		params?: PaginationFilterCouponRequest
	) {
		return api
			.get<ResponsePagination<CouponEntity>>('coupon/not-checked-coupons-store', {
				headers: getJWTAuthHeader(),
				params,
			})
			.then((response) => response.data);
	}

	public static async checkCoupon(id: number) {
		return api
			.put<CouponEntity>(`coupon/${id}/mark-checked`, undefined, {
				headers: getJWTAuthHeader(),
			})
			.then((response) => response.data);
	}

	public static async createForPromotion(promotionId: number) {
		return api
			.post<CouponEntity>(
				'coupon/promotion',
				{ promotionId },
				{
					headers: getJWTAuthHeader(),
				}
			)
			.then((response) => response.data);
	}

	public static async createForExchange(itemId: number, amount: number) {
		return api
			.post<CouponEntity>(
				'coupon/exchange',
				{ itemId, amount },
				{
					headers: getJWTAuthHeader(),
				}
			)
			.then((response) => response.data);
	}

	public static async findByUserAndPromotion(promotionId: number) {
		return api
			.get<CouponEntity>(`coupon/created-by-user/${promotionId}`, {
				headers: getJWTAuthHeader(),
			})
			.then((response) => response.data);
	}
}
