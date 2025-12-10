import PaginationFilterRequest from './paginationFilterRequest';

export default interface PaginationFilterUserRequest
	extends PaginationFilterRequest {
	search?: string;
	countryId?: number;
	stateId?: number;
	cityId?: number;
	storeId?: number;
	active?: boolean;
}
