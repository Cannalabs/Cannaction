import PaginationFilterRequest from "./paginationFilterRequest";

export default interface PaginationFilterUserTargetRequest
	extends PaginationFilterRequest {
	countryId?: number;
	storeId?: number;
	searchNotConcluded?: string;
	searchConcluded?: string;
}