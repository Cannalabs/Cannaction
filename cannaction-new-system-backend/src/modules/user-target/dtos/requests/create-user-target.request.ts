import { IsNotEmpty } from 'class-validator';

export class CreateUserTargetRequest {
	@IsNotEmpty({ message: 'Store is mandatory.' })
	storeId: number;

	@IsNotEmpty({ message: 'Target is mandatory.' })
	target: number;

	@IsNotEmpty({ message: 'Target Date is mandatory.' })
	date: string;

	@IsNotEmpty({ message: 'Prize item is mandatory.' })
	itemId: number;
}

