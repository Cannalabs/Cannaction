import { PaginationMetaDto } from "@/modules/database/pagination/pagination-meta";
import { SalesListDto } from "./sales-list.dto";

export class SalesForMarketingResponseDto {
	sales: SalesListDto[];
	meta: PaginationMetaDto;
}