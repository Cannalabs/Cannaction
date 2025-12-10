import { IsOptional } from "class-validator";

export class SearchCouponsUserStoreRequest {
	@IsOptional()
	search?: string;
}