import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { PaginationOptionsDto } from '@/modules/database/pagination/pagination-options';
import { PaginationDto } from '@/modules/database/pagination/pagination.dto';
import { UserService } from '@/modules/user/services/user.service';
import { Injectable } from '@nestjs/common';
import { Coupon } from '../coupon.entity';
import { CouponRepository } from '../coupon.repository';
import { FindCouponsForMarketingRequest } from '../dtos/requests/find-coupons-for-marketing.request';
import { SearchCouponsUserStoreRequest } from '../dtos/requests/search-checked-coupons-user-store.request';
import { SearchCouponsForRedeemedItemsRequest } from '../dtos/requests/search-coupons-for-redeemed-items.request';
import { RedeemedItemsForMarketingResponseDto } from '../dtos/responses/redeemed-items-for-marketing-response.dto';

@Injectable()
export class CouponService {
	constructor(
		private readonly couponRepository: CouponRepository,
		private readonly userService: UserService
	) {}

	async findAll(currentUser: CurrentUser): Promise<Coupon[]> {
		return this.couponRepository.findAll(currentUser);
	}

	async redeemedItems(
		currentUser: CurrentUser,
		filter: SearchCouponsForRedeemedItemsRequest,
		optionsToCheck: PaginationOptionsDto,
		optionsChecked: PaginationOptionsDto
	): Promise<RedeemedItemsForMarketingResponseDto> {
		const checked = await this.findAllChecked(currentUser, filter.search, optionsChecked);
		const notChecked = await this.findAllNotChecked(
			currentUser,
			filter.searchNotChecked,
			optionsToCheck
		);
		return { checked, notChecked };
	}

	async findCheckedCouponsForUserStore(currentUser: CurrentUser, filter: SearchCouponsUserStoreRequest, options: PaginationOptionsDto) {
		const user = await this.userService.findOne(currentUser.userId);
		return this.couponRepository.findAllCheckedUserStore(user.store.id, filter.search, options);
	}

	async findNotCheckedCouponsForUserStore(currentUser: CurrentUser, filter: SearchCouponsUserStoreRequest, options: PaginationOptionsDto) {
		const user = await this.userService.findOne(currentUser.userId);
		return this.couponRepository.findAllNotCheckedUserStore(user.store.id, filter.search, options);
	}

	public async findValidatedCouponsByStore(storeId: number) {
		return this.couponRepository.findValidatedCountByStore(storeId);
	}

	private async findAllChecked(
		currentUser: CurrentUser,
		search: string,
		options: PaginationOptionsDto
	): Promise<PaginationDto<Coupon>> {
		return this.couponRepository.findAllChecked(currentUser, search, options);
	}

	private async findAllNotChecked(
		currentUser: CurrentUser,
		search: string,
		options: PaginationOptionsDto
	): Promise<PaginationDto<Coupon>> {
		return this.couponRepository.findAllNotChecked(currentUser, search, options);
	}

	async findOne(id: number): Promise<Coupon | undefined> {
		return this.couponRepository.findOne(id);
	}

	async findByPromotion(promotionId: number): Promise<Coupon[]> {
		return this.couponRepository.findByPromotionId(promotionId);
	}

	async findCheckedForMarketing(request: FindCouponsForMarketingRequest, options: PaginationOptionsDto
	) {
		return this.couponRepository.findCheckedForMarketing(request, options);
	}

	async findForCustomer(currentUser: CurrentUser, filter: FindCouponsForMarketingRequest, options: PaginationOptionsDto
	) {
		return this.couponRepository.findForCustomer(currentUser, filter, options);
	}

	async findCreatedCouponByUser(currentUser: CurrentUser, promotionId: number) {
		const coupon = await this.couponRepository.findCreatedByUserAndPromotion(currentUser.userId, promotionId);
		return coupon;
	}
}
