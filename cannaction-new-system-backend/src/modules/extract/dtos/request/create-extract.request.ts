import { IsNotEmpty, IsOptional } from "class-validator";
import { ExtractOperator } from "../../enums/extract-operator.enum";

export class CreateExtractRequest {
	@IsOptional()
	storeId?: number;

	@IsOptional()
	userId?: number;

	@IsOptional()
	itemId?: number;

	@IsNotEmpty()
	description: string;

	@IsNotEmpty()
	points: number;

	@IsNotEmpty()
	operator: ExtractOperator;

	@IsNotEmpty()
	amount: number;

	@IsNotEmpty()
	balance: number
}