export interface FormValues {
	id: number | undefined;
	name: string;
	maxCoupons: number | undefined;
	countryId: number | undefined;
	emailText: string;
	beginDate: string;
	finalDate: string;
	itemId: number | undefined;
	storeIds: number[];
	thumb?: string;
}
