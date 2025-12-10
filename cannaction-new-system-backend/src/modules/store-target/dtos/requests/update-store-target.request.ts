import { IsEnum, IsOptional } from 'class-validator';
import { PrizeType } from '../../enums/prize-type.enum';

export class UpdateStoreTargetRequest {
	@IsOptional()
	@IsEnum(PrizeType)
	prizeType: PrizeType;

	@IsOptional()
	target: number;

	@IsOptional()
	finalDateTarget: string;

	@IsOptional()
	prizeItemId?: number;

	@IsOptional()
	prizeMoney?: number;
}

