import CountryEntity from './CountryEntity';
import { QuestionEntity } from './QuestionEntity';
import { QuizUserEntity } from './QuizUserEntity';

export default interface QuizzEntity {
	id: number;
	description: string;
	points: number;
	published: boolean;
	country: CountryEntity;
	quizUsers: QuizUserEntity[];
	questions: QuestionEntity[];
	createdAt: string;
	updatedAt: string;
}
