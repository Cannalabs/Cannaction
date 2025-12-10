import { IsOptional, IsString } from 'class-validator';

export class FilterClubCardUserRequest {
	@IsOptional()
	@IsString()
	search?: string;

}
