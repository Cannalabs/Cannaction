import { IsOptional, IsString } from "class-validator";

export default class FilterStockRequest {
	@IsString()
	@IsOptional()
	search?: string;

	page: number

	take: number;
}