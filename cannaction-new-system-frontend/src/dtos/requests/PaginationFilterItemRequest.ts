import PaginationFilterRequest from "./paginationFilterRequest";

export interface PaginationFilterItemRequest extends PaginationFilterRequest {
    search?: string;
}