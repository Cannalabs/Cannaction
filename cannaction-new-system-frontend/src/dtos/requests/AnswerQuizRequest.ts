export interface Answer {
	questionId: number;
	answer: string;
}
export interface AnswerQuizRequest {
	userId: number;
	quizId: number;
	answers: Answer[];
}