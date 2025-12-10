import PaginationFilterRequest from './paginationFilterRequest';

export default interface PaginationFilterStoreRequest
	extends PaginationFilterRequest {
	active?: boolean;
	search?: string;
	countryId?: number;
	stateId?: number;
	cityId?: number;
}
