import { IsNotEmpty } from "class-validator";

export class AnswerQuizRequest {
	@IsNotEmpty()
	userId: number;

	@IsNotEmpty()
	quizId: number;

	@IsNotEmpty()
	answers: {
		questionId: number;
		answer: string;
	}[];
}