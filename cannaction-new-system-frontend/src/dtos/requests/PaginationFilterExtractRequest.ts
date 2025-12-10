import PaginationFilterRequest from "./paginationFilterRequest";

export interface PaginationFilterExtractRequest extends PaginationFilterRequest {
	search?: string;
	byStore?: boolean;
	storeId?: number;
	userId?: number;
}