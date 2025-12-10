import { PaginationMetaDto } from "@/modules/database/pagination/pagination-meta";

export class SalesList {
	id: number;
	name: string;
	amount: number;
	percentage: number;
}

export class SalesForStoreUserResponseDto {
	sales: SalesList[];
	meta: PaginationMetaDto;
}