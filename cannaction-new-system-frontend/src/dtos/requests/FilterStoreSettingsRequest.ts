import PaginationFilterRequest from './paginationFilterRequest';

export default interface FilterStoreSettingsRequest
	extends PaginationFilterRequest {
	searchStock?: string;
	searchPromotions?: string;
	searchCustomers?: string;
	searchExtract?: string;
	optionsStock?: PaginationFilterRequest;
	optionsExtract?: PaginationFilterRequest;
	optionsPromotions?: PaginationFilterRequest;
	optionsCustomers?: PaginationFilterRequest;
}
