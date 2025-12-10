import { IsNotEmpty } from 'class-validator';

export class AnswerCreateRequest {
	@IsNotEmpty({ message: 'Answer is mandatory.' })
	answer: string;

	@IsNotEmpty({ message: 'Question is mandatory.' })
	questionId: number;

	@IsNotEmpty({ message: 'Quiz is mandatory.' })
	quizId: number;

	@IsNotEmpty({ message: 'User is mandatory.' })
	userId: number;
}
