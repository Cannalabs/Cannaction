import { StoreTarget } from "@/modules/store-target/store-target.entity";
import { UserTarget } from "@/modules/user-target/user-target.entity";

export class MostSoldItemsList {
	itemId: number;
	name: string;
	total: number;
}

export class DashboardStoreResponse {
	userPoints: number;
	storePoints: number;
	activeUsers: number;
	inactiveUsers: number;
	coupons: number;
	validatedCoupons: number;
	storeTarget?: StoreTarget;
	userTarget?: UserTarget;
	mostSoldItemList: MostSoldItemsList[];
	salesPercentage: number;
}