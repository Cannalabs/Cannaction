import { StoreTargetEntity } from "../../models/entities/StoreTargetEntity";
import { UserTargetEntity } from "../../models/entities/UserTargetEntity";

export interface MostSoldItemsList {
	itemId: number;
	name: string;
	total: number;
}

export interface StoreDashboardResponse {
	userPoints: number;
	storePoints: number;
	activeUsers: number;
	inactiveUsers: number;
	coupons: number;
	validatedCoupons: number;
	storeTarget?: StoreTargetEntity;
	userTarget?: UserTargetEntity;
	mostSoldItemList: MostSoldItemsList[];
	salesPercentage: number;
}