import { CouponEntity } from "../../models/entities/CouponEntity";
import ResponsePagination from "./ResponsePaginationResponse";

export interface RedeemedItemsResponse {
    checked: ResponsePagination<CouponEntity>;
    notChecked: ResponsePagination<CouponEntity>;
}