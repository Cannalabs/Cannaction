import { Question } from '@/modules/question/question.entity';
import { IsOptional } from 'class-validator';

export class QuizzUpdateRequest {
	@IsOptional()
	description?: string;

	@IsOptional()
	points?: number;

	@IsOptional()
	countryId?: number;

	@IsOptional()
	questions?: Question[];
}
