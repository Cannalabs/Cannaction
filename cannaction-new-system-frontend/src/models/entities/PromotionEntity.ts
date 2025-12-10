import { PromotionType } from '../enums/promotion.enum';
import CountryEntity from './CountryEntity';
import { ItemEntity } from './ItemEntity';
import { StoreEntity } from './StoreEntity';

export interface PromotionEntity {	id: number;
	name: string;
	emailText: string;
	thumb?: string;
	coupons: number;
	maxCoupons: number;
	active: boolean;
	country: CountryEntity;
	beginDate: string;
	finalDate: string;
	type: PromotionType;
	item: ItemEntity;
	stores: StoreEntity[];
	createdAt: string;
	updatedAt: string;
	lastInteractionDate: string;
}
