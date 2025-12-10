import { StoreTarget } from "@/modules/store-target/store-target.entity";
import { UserTarget } from "@/modules/user-target/user-target.entity";

export default class StoreSettingsResponse {
	slug: string;
	countryId: number;
	acumulatedPoints: number;
	validatedCoupons: number;
	availableProducts: number;
	totalStoreSales: number;
	activeCustomers: number;
	activePromotions: number;
	activeStoreTarget: StoreTarget;
	activeUserTarget: UserTarget;
} 