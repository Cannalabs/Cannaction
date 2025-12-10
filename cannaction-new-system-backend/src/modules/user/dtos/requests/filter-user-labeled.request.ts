import { IsEnum, IsOptional } from 'class-validator';
import { UserType } from '../../enums/user-type.enum';

export class FilterUserLabeledDto {
	@IsOptional()
	countryId?: number;

	@IsOptional()
	@IsEnum(UserType)
	userType?: UserType;

	@IsOptional()
	active?: boolean;
}
