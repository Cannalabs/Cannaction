import PaginationFilterRequest from './paginationFilterRequest';

export default interface PaginationFilterSalesRequest
	extends PaginationFilterRequest {
	search?: string;
	countryId?: number;
	storeId?: number;
	itemId?: number;
	dateBegin?: string;
	dateEnd?: string;
	byStore?: boolean;
}
