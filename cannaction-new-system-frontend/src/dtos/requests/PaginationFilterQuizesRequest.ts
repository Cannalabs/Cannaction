import PaginationFilterRequest from './paginationFilterRequest';

export default interface PaginationFilterQuizzesRequest
	extends PaginationFilterRequest {
	search?: string;
}
