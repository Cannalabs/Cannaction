import { IsEnum, IsOptional } from 'class-validator';
import { QuestionType } from '../enums/question-type.enum';

export class QuestionUpdateRequest {
	@IsOptional()
	question: string;

	@IsOptional()
	@IsEnum(QuestionType)
	type: QuestionType;

	@IsOptional()
	options: string[];

	@IsOptional()
	quizzId: number;
}
