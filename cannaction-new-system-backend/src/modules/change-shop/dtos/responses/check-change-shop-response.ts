import { PaginationDto } from "@/modules/database/pagination/pagination.dto";
import { ChangeShop } from "../../change-shop.entity";

export class CheckChangeShopResponseDto {
	answered: PaginationDto<ChangeShop>;
	notAnswered: PaginationDto<ChangeShop>;
}