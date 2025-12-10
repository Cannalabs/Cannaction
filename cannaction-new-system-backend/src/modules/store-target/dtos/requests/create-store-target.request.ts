import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { PrizeType } from '../../enums/prize-type.enum';

export class CreateStoreTargetRequest {
	@IsNotEmpty({ message: 'Store is mandatory.' })
	storeId: number;

	@IsNotEmpty({ message: 'Prize type is mandatory.' })
	@IsEnum(PrizeType)
	prizeType: PrizeType;

	@IsNotEmpty({ message: 'Target is mandatory.' })
	target: number;

	@IsNotEmpty({ message: 'Target Final Date is mandatory' })
	finalDateTarget: string;

	@IsOptional()
	prizeItemId?: number;

	@IsOptional()
	prizeMoney?: number;
}

