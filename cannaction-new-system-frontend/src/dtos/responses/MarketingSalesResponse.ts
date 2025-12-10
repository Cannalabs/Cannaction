import { MetaDto } from "./ResponsePaginationResponse";

export interface SalesListResponse {
	amount: number;
	name: string;
	percentage: number;
	country: string;
	id: number
}

export interface SalesForMarketingResponse {
	sales: SalesListResponse[];
	meta: MetaDto
}