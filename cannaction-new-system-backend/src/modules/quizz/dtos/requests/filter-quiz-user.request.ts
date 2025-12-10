import { IsOptional, IsString } from 'class-validator';

export class FilterQuizUserRequest {
	@IsString()
	@IsOptional()
	search?: string;
}
