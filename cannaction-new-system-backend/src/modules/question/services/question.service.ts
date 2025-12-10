import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { Injectable } from '@nestjs/common';
import { Question } from '../question.entity';
import { QuestionRepository } from '../question.repository';

@Injectable()
export class QuestionService {
	constructor(private readonly questionRepository: QuestionRepository) {}

	async findByQuizz(
		currentUser: CurrentUser,
		quizzId: number
	): Promise<Question[]> {
		return this.questionRepository.findByQuizz(currentUser, quizzId);
	}

	async findById(currentUser: CurrentUser, id: number): Promise<Question> {
		return this.questionRepository.findOne(id);
	}
}
