import QuizzEntity from "./QuizEntity";
import UserEntity from "./UserEntity";

export interface QuizUserEntity {	
    id: number;
	quiz: QuizzEntity;
	user: UserEntity;
	answerDate?: string;
	createdAt: string;
	updatedAt: string;
}