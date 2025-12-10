import { UserTargetEntity } from "../../models/entities/UserTargetEntity";
import ResponsePagination from "./ResponsePaginationResponse";

export interface UserTargetMarketingResponse {
	concluded: ResponsePagination<UserTargetEntity>;
	notConcluded: ResponsePagination<UserTargetEntity>;
}