import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { QuestionType } from '../enums/question-type.enum';

export class QuestionCreateRequest {
	@IsNotEmpty({ message: 'Question text is mandatory.' })
	question: string;

	@IsNotEmpty({ message: 'Question type is mandatory.' })
	@IsEnum(QuestionType)
	type: QuestionType;

	@IsOptional()
	options?: string[];

	@IsNotEmpty({ message: 'Quizz is mandatory.' })
	quizzId: number;
}
