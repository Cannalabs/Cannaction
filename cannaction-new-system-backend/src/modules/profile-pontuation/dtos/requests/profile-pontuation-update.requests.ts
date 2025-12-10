import { IsOptional } from 'class-validator';

export class ProfilePontuationUpdateRequest {
	@IsOptional()
	points?: number;

	@IsOptional()
	active?: boolean;
}
