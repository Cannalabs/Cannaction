import { PromotionType } from "../../models/enums/promotion.enum";

export interface CreatePromotionRequest {	
    name: string;
	emailText: string;
	maxCoupons: number;
	countryId: number;
	beginDate: string;
	finalDate: string;
	type: PromotionType;
	itemId: number;
	storeIds: number[];
}