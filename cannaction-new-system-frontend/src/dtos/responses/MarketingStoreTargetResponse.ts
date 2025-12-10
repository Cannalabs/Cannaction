import { StoreTargetEntity } from "../../models/entities/StoreTargetEntity";
import ResponsePagination from "./ResponsePaginationResponse";
import { StoreTargetPrizeGraphicResponse } from "./StoreTargetPrizeGraphicResponse";

export interface StoreTargetMarketingResponse {
	concluded: ResponsePagination<StoreTargetEntity>;
	notConcluded: ResponsePagination<StoreTargetEntity>;
	prizeGraphicByStore: StoreTargetPrizeGraphicResponse[];
	prizeGraphicByCountry: StoreTargetPrizeGraphicResponse[];
}