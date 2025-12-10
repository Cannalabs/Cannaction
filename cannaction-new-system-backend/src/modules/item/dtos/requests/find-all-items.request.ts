import { IsOptional, IsString } from 'class-validator';

export class FindAllItemsRequest {
	@IsOptional()
	@IsString()
	search?: string;
}
