import { PrizeType } from "../../models/enums/prizeType.enum";

export interface UpdateStoreTargetRequest {
    prizeType?: PrizeType;
    target?: number;
    finalDateTarget?: string;
    prizeItemId?: number;
    prizeMoney?: number;
}