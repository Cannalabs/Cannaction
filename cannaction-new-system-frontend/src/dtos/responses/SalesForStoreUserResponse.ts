import { MetaDto } from "./ResponsePaginationResponse";

export interface SalesListResponse {
	amount: number;
	name: string;
	percentage: number;
	id: number
}

export interface SalesForStoreUserResponse {
	sales: SalesListResponse[];
	meta: MetaDto
}