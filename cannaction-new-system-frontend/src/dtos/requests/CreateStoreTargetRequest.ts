import { PrizeType } from "../../models/enums/prizeType.enum";

export interface CreateStoreTargetRequest {
    storeId: number;
    prizeType: PrizeType;
    target?: number;
    finalDateTarget: string;
    prizeItemId?: number;
    prizeMoney?: number;
}