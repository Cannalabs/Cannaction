import PaginationFilterRequest from "./paginationFilterRequest";

export default interface FindChangeShopsRequest {
    search?: string;
	searchAnswered?: string;
    optionsNotAnswered?: PaginationFilterRequest;
    optionsAnswered?: PaginationFilterRequest;
}