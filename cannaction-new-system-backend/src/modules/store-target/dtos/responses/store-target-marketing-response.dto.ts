import { PaginationDto } from "@/modules/database/pagination/pagination.dto";
import { StoreTarget } from "../../store-target.entity";
import { PrizeGraphicResponse } from "./prize-graphic-reponse.dto";

export class StoreTargetMarketingResponse {
	concluded: PaginationDto<StoreTarget>;
	notConcluded: PaginationDto<StoreTarget>;
	prizeGraphicByStore: PrizeGraphicResponse[];
	prizeGraphicByCountry: PrizeGraphicResponse[];
}
