import { IsOptional } from 'class-validator';

export class SaleUpdateRequest {
	@IsOptional()
	userId?: number;

	@IsOptional()
	storeId?: number;

	@IsOptional()
	itemId?: number;
}
