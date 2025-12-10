import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import {
	CurrentUser,
	ReqCurrentUser,
} from '../auth/decorators/current-user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { PaginationOptionsDto } from '../database/pagination/pagination-options';
import { CreateCouponForExchangeRequest } from './dtos/requests/create-coupon-for-exchange.request';
import { CreateCouponForPromotionRequest } from './dtos/requests/create-coupon-for-promotion.request';
import { FindCouponsForMarketingRequest } from './dtos/requests/find-coupons-for-marketing.request';
import { SearchCouponsUserStoreRequest } from './dtos/requests/search-checked-coupons-user-store.request';
import { SearchCouponsForRedeemedItemsRequest } from './dtos/requests/search-coupons-for-redeemed-items.request';
import { CouponPersistenceService } from './services/coupon-persistence.service';
import { CouponService } from './services/coupon.service';

@Controller('coupon')
export class CouponController {
	constructor(
		private readonly couponService: CouponService,
		private readonly couponPersistenceService: CouponPersistenceService
	) {}

	@UseGuards(JwtGuard)
	@Get(':id')
	public async findById(@Param('id') id: string) {
		return this.couponService.findOne(+id);
	}

	@UseGuards(JwtGuard)
	@Get(':id/by-promotion')
	public async findByPromotion(@Param('id') id: string) {
		return this.couponService.findByPromotion(+id);
	}

	@UseGuards(JwtGuard)
	@Get()
	public async findAll(@ReqCurrentUser() currentUser: CurrentUser) {
		return this.couponService.findAll(currentUser);
	}

	@UseGuards(JwtGuard)
	@Get('redeemed-items')
	public async findAllChecked(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Query() params: SearchCouponsForRedeemedItemsRequest,
		@Query() optionsToCheck: PaginationOptionsDto,
		@Query() optionsChecked?: PaginationOptionsDto
	) {
		return this.couponService.redeemedItems(currentUser, params, optionsToCheck, optionsChecked);
	}

	@UseGuards(JwtGuard)
	@Get('checked-coupons-store')
	public async findCheckedCouponsForUserStore(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Query() params: SearchCouponsUserStoreRequest,
		@Query() options: PaginationOptionsDto
	) {
		return this.couponService.findCheckedCouponsForUserStore(currentUser, params, options);
	}

	@UseGuards(JwtGuard)
	@Get('not-checked-coupons-store')
	public async findNotCheckedCouponsForUserStore(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Query() params: SearchCouponsUserStoreRequest,
		@Query() options: PaginationOptionsDto
	) {
		return this.couponService.findNotCheckedCouponsForUserStore(currentUser, params, options);
	}

	@UseGuards(JwtGuard)
	@Get('checked-for-marketing')
	public async findChekedForMarketing(
		@Query() params: FindCouponsForMarketingRequest,
		@Query() options: PaginationOptionsDto
	) {
		return this.couponService.findCheckedForMarketing(params, options);
	}

	@UseGuards(JwtGuard)
	@Get('customer')
	public async findForCustomer(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Query() params: FindCouponsForMarketingRequest,
		@Query() options: PaginationOptionsDto
	) {
		return this.couponService.findForCustomer(currentUser, params, options);
	}

	@UseGuards(JwtGuard)
	@Get('created-by-user/:id')
	public async findCreatedByUserAndPromotion(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Param('id') promotionId: number
	) {
		return this.couponService.findCreatedCouponByUser(currentUser, promotionId);
	}

	@UseGuards(JwtGuard)
	@Put(':id/mark-checked')
	public async active(@Param('id') id: string) {
		return this.couponPersistenceService.markCheck(+id);
	}

	@UseGuards(JwtGuard)
	@Post('promotion')
	public async createForPromotion(@ReqCurrentUser() currentUser: CurrentUser, @Body() body: CreateCouponForPromotionRequest) {
		return this.couponPersistenceService.createForPromotion(currentUser, body.promotionId);
	}

	@UseGuards(JwtGuard)
	@Post('exchange')
	public async createForExchange(@ReqCurrentUser() currentUser: CurrentUser, @Body() body: CreateCouponForExchangeRequest) {
		return this.couponPersistenceService.createForExchange(currentUser, body.itemId, body.amount);
	}
}
