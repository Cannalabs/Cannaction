import { StoreTargetEntity } from "../../models/entities/StoreTargetEntity";
import { UserTargetEntity } from "../../models/entities/UserTargetEntity";

export default interface StoreSettingsResponse {
    slug: string;
	countryId: number;
	acumulatedPoints: number;
	validatedCoupons: number;
	availableProducts: number;
	totalStoreSales: number;
	activeCustomers: number;
	activePromotions: number;
	activeStoreTarget: StoreTargetEntity;
	activeUserTarget: UserTargetEntity;
}