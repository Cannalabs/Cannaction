import PaginationFilterRequest from './paginationFilterRequest';

export default interface PaginationFilterPromotionRequest
	extends PaginationFilterRequest {
	search?: string;
	countryId?: number;
	storeId?: number;
	itemId?: number;
	dateBegin?: string;
	dateEnd?: string;
}
