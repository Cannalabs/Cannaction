import { IsNotEmpty } from 'class-validator';

export class CreateUserTargetByUserRequest {
	@IsNotEmpty({ message: 'Store is mandatory.' })
	storeId: number;

	@IsNotEmpty({ message: 'User is mandatory.' })
	userId: number;

	@IsNotEmpty({ message: 'Target is mandatory.' })
	target: number;

	@IsNotEmpty({ message: 'Target Date is mandatory.' })
	date: string;

	@IsNotEmpty({ message: 'Prize item is mandatory.' })
	itemId: number;

	@IsNotEmpty()
	active: boolean;
}

