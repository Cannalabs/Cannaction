import { ItemEntity } from './ItemEntity';
import { PromotionEntity } from './PromotionEntity';
import UserEntity from './UserEntity';
import { StoreEntity } from './StoreEntity';
import { CouponTypeEnum } from '../enums/couponTypeEnum';

export interface CouponEntity {
	id: number;
	keyCode: string;
	promotion: PromotionEntity;
	item?: ItemEntity;
	itemAmount?: number;
	user?: UserEntity;
	store: StoreEntity;
	description?: string;
	checkedDate?: string;
	checked: boolean;
	createdAt: string;
	updatedAt: string;
	type: CouponTypeEnum;
}
