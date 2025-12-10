import { QuestionType } from '../../../../../models/enums/questionType.enum';

export interface Question {
	id: number;
	question: string;
	type: QuestionType;
	options?: string;
}

export default interface FormValues {
	id: number | undefined;
	description: string;
	points: number | undefined;
	countryId: number | undefined;
	questions: Question[];
}
