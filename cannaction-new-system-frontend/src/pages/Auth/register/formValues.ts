export default interface FormValues {
	userType: string;
	languageId: number;
	name: string;
	lastName: string;
	nickname: string;
	countryId: number;
	storeId?: number;
	email: string;
	password: string;
	confirmPassword: string;
	terms: boolean;
	privacy: boolean;

	birthdate?: string;
	telephone?: string;
	address?: string;
	storeName?: string;
	storeAddress?: string;
	stateId?: number;
	cityId?: number;
	storeContactTelephone?: string;
	storeContactEmail?: string;
}
