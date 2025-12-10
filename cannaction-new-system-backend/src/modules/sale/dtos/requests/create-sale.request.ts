import { IsNotEmpty, IsOptional } from 'class-validator';

export class SaleCreateRequest {
	@IsNotEmpty({ message: 'Sold items are mandatory.' })
	items: {
		itemId: number;
		amount: number;
		points: number;
		name: string;
	}[];

	@IsOptional()
	customerId?: number;
}
