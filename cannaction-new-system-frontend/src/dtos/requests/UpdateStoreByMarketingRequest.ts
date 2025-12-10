export default interface UpdateStoreByMarketingRequest {
	storeName?: string;
	countryId?: number;
	storeAddress?: string; 
	storeContactTelephone?: string;
	storeContactEmail?: string;
	stateId?: number;
	cityId?: number;
    masterUserId?: number;
	workers?: number[];
}