import { Question } from '@/modules/question/question.entity';
import { IsNotEmpty } from 'class-validator';
import { DeepPartial } from 'typeorm';

export class QuizzCreateRequest {
	@IsNotEmpty({ message: 'Quizz description is mandatory.' })
	description: string;

	@IsNotEmpty({ message: 'Quizz punctuation is mandatory.' })
	points: number;

	@IsNotEmpty({ message: 'Quizz country is mandatory.' })
	countryId: number;

	@IsNotEmpty({ message: 'Quiz questions are mandatory.' })
	questions: DeepPartial<Question>[];
}
