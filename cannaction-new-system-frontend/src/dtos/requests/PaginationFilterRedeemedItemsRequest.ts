import PaginationFilterRequest from "./paginationFilterRequest";

export default interface PaginationFilterRedeemedItemsRequest extends PaginationFilterRequest {
    search?: string;
    searchNotChecked?: string;
    optionsToCheck?: PaginationFilterRequest;
    optionsChecked?: PaginationFilterRequest;
}