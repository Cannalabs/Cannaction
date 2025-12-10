import { IsNumber, IsOptional } from 'class-validator';

export class FilterQuizzDto {
	@IsNumber()
	@IsOptional()
	countryId?: number;
}
