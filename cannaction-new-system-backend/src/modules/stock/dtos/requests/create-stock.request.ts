import { IsNotEmpty } from "class-validator";

export class CreateStockRequest {
	@IsNotEmpty()
	storeId: number;

	@IsNotEmpty()
	itemId: number;
}