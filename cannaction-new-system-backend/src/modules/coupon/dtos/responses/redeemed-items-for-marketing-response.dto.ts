import { PaginationDto } from "@/modules/database/pagination/pagination.dto";
import { Coupon } from "../../coupon.entity";

export class RedeemedItemsForMarketingResponseDto {
	checked: PaginationDto<Coupon>
	notChecked: PaginationDto<Coupon>
}