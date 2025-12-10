import PaginationFilterRequest from "./paginationFilterRequest";

export interface PaginationFilterNotificationRequest extends PaginationFilterRequest {
    search?: string;
    dashboard?: boolean;
}