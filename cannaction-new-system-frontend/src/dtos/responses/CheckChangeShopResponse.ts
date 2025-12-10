import { ChangeShopEntity } from "../../models/entities/ChangeShopEntity";
import ResponsePagination from "./ResponsePaginationResponse";

export interface CheckChangeShopResponseDto {
	answered: ResponsePagination<ChangeShopEntity>;
	notAnswered: ResponsePagination<ChangeShopEntity>;
}