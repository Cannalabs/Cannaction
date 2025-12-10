export default interface FormValues {
	id: number | undefined;
	name: string;
	contactEmail: string;
	contactTelephone?: string;
	countryId: number | undefined;
	stateId?: number | undefined;
	cityId?: number | undefined;
	address?: string;
	logo?: string;
	masterUserId: number | undefined;
	workers: number[];
}
