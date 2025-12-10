import PaginationFilterRequest from './paginationFilterRequest';

export default interface PaginationFilterStockRequest
	extends PaginationFilterRequest {
	search?: string;
}
