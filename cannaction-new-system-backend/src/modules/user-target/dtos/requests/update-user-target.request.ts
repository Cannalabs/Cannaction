import { IsOptional } from 'class-validator';

export class UpdateUserTargetRequest {
	@IsOptional()
	target?: number;

	@IsOptional()
	date?: string;

	@IsOptional()
	itemId?: number;

	@IsOptional()
	active?: boolean;
}

