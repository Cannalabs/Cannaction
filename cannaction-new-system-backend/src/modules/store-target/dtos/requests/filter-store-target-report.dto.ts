import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PrizeType } from '../../enums/prize-type.enum';

export class FilterStoreTargetReportDto {
	@IsOptional()
	countryId?: number;

	@IsOptional()
	storeId?: number;

	@IsString()
	@IsOptional()
	searchNotConcluded?: string;

	@IsString()
	@IsOptional()
	searchConcluded?: string;

	@IsEnum(PrizeType)
	@IsNotEmpty({ message: 'Target Type is required.' })
	type: PrizeType;
}
