import { QuestionType } from "../enums/questionType.enum";

export interface QuestionEntity {
	id: number;
	question: string;
	type: QuestionType;
	options: string[];
}