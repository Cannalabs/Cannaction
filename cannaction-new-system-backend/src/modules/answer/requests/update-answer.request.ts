import { IsOptional } from 'class-validator';

export class AnswerUpdateRequest {
	@IsOptional()
	answer?: string;
}
