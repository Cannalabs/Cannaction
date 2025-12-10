import { IsNotEmpty } from "class-validator";

export class AddToStockRequest {
	@IsNotEmpty()
	total: number;

	@IsNotEmpty()
	minimumAmount: number;
}