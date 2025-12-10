import { QuestionEntity } from '../../models/entities/QuestionEntity';

export interface UpdateQuizRequest {
	description?: string;
	points?: number;
	countryId?: number;
	questions?: QuestionEntity[];
}
