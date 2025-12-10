export default interface CreateStoreRequest {
    countryId: number;
	storeName: string;
	stateId?: number;
	cityId?: number;
	storeAddress?: string; 
	storeContactTelephone?: string;
	storeContactEmail?: string;
    masterUserId?: number;
	workers: number[];
}