import PaginationFilterRequest from './paginationFilterRequest';

export default interface PaginationFilterCouponRequest
	extends PaginationFilterRequest {
	search?: string;
	countryId?: number;
	storeId?: number;
	itemId?: number;
	dateBegin?: string;
	dateEnd?: string;
}
