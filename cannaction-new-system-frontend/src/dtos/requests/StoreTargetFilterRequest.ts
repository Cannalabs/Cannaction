import { PrizeType } from "../../models/enums/prizeType.enum";
import PaginationFilterRequest from "./paginationFilterRequest";

export default interface PaginationFilterStoreTargetRequest
	extends PaginationFilterRequest {
	countryId?: number;
	storeId?: number;
	searchNotConcluded?: string;
	searchConcluded?: string;
	type: PrizeType;
	optionsConcluded?: PaginationFilterRequest;
    optionsNotConcluded?: PaginationFilterRequest;
}