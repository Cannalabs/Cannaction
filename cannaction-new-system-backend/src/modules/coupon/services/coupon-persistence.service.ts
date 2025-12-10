import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { CouponNotFoundError } from '@/modules/coupon/errors/coupon-not-found.error';
import { ExtractOperator } from '@/modules/extract/enums/extract-operator.enum';
import { ExtractPersistenceService } from '@/modules/extract/services/extract-persistence.service';
import { Item } from '@/modules/item/item.entity';
import { ItemService } from '@/modules/item/services/item.service';
import { PromotionPersistenceService } from '@/modules/promotion/services/promotion-persistence.service';
import { PromotionService } from '@/modules/promotion/services/promotion.service';
import { StockPersistenceService } from '@/modules/stock/services/stock-persistence.service';
import { Store } from '@/modules/store/store.entity';
import { UserPersistenceService } from '@/modules/user/services/user-persistence.service';
import { UserService } from '@/modules/user/services/user.service';
import { generatePromotionCoupon } from '@/utils/crypto';
import { Injectable } from '@nestjs/common';
import { Coupon } from '../coupon.entity';
import { CouponRepository } from '../coupon.repository';
import { CouponAlreadyCheckedError } from '../errors/coupon-already-checked.error';

@Injectable()
export class CouponPersistenceService {
	constructor(
		private readonly couponRepository: CouponRepository,
		private readonly promotionService: PromotionService,
		private readonly promotionPersistenceService: PromotionPersistenceService,
		private readonly userService: UserService,
		private readonly userPersistenceService: UserPersistenceService,
		private readonly itemService: ItemService,
		private readonly stockPersistenceService: StockPersistenceService,
		private readonly extractPersistenceService: ExtractPersistenceService
	) {}

	async createForPromotion(
		currentUser: CurrentUser,
		promotionId: number,
	): Promise<Coupon> {
		const promotion = await this.promotionService.findOne(promotionId);
		const user = await this.userService.findOne(currentUser.userId);

		const coupon = new Coupon({
			promotion,
			user,
			store: new Store({ id: user.store.id }),
			item: new Item({ id: promotion.item.id }),
			keyCode: generatePromotionCoupon(),
			checked: false,
			itemAmount: 1,
			description: `Coupon generated for promotion ${promotion.name}`,
			checkedDate: null,

		})
		const createdCoupon = await this.couponRepository.create(coupon);
		await this.promotionPersistenceService.reducePromotionCoupon(promotionId);
		return createdCoupon;
	}

	async createForExchange(
		currentUser: CurrentUser,
		itemId: number,
		amount: number
	): Promise<Coupon> {
		const user = await this.userService.findOne(currentUser.userId);
		const item = await this.itemService.findOne(itemId);

		const coupon = new Coupon({
			promotion: null,
			user,
			store: new Store({ id: user.store.id }),
			item,
			itemAmount: amount,
			keyCode: generatePromotionCoupon(),
			checked: false,
			description: `Coupon generated for exchanging item ${item.name}`,
			checkedDate: null,

		})
		const createdCoupon = await this.couponRepository.create(coupon);
		await this.userPersistenceService.updateUserPoints(user.id, ExtractOperator.DEDUCTION, item.points * amount);
		await this.extractPersistenceService.createExtract(
			{
				points: item.points,
				userId: user.id,
				balance: user.points - (item.points * amount),
				description: 'Product Exchange: ' + item.name,
				operator: ExtractOperator.DEDUCTION,
				amount
			});
		return createdCoupon;
	}

	async markCheck(id: number): Promise<void> {
		const coupon = await this.couponRepository.findOne(id);
		if (!coupon) throw new CouponNotFoundError();
		if (coupon.checked) throw new CouponAlreadyCheckedError();
		await this.couponRepository.markChecked(id);
		if (coupon.item && coupon.store) {
			if (coupon.itemAmount != null) {
				for (let i = 1; i < coupon.itemAmount; i++) {
					await this.stockPersistenceService.reduceAmountToStock(coupon.item.id, coupon.store.id);
				}
			} else {
				await this.stockPersistenceService.reduceAmountToStock(coupon.item.id, coupon.store.id);
			}
		}
	}
}
