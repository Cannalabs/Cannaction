import { Question } from '../../pages/App/marketing/quiz/form/formValues';

export interface CreateQuizRequest {
	description: string;
	points: number | null;
	countryId: number | null;
	questions: Question[];
}
