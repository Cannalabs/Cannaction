import { Question } from '@/modules/question/question.entity';
import { Quizz } from '@/modules/quizz/entities/quizz.entity';
import { User } from '@/modules/user/user.entity';
import { Injectable } from '@nestjs/common';
import { Answer } from '../answer.entity';
import { AnswerRepository } from '../answer.repository';
import { AnswerNotFoundError } from '../errors/answer-not-found.error';
import { AnswerCreateRequest } from '../requests/create-answer.request';
import { AnswerUpdateRequest } from '../requests/update-answer.request';

@Injectable()
export class AnswerPersistenceService {
	constructor(
		private readonly answerRepository: AnswerRepository,
	) {}

	async create(
		newAnswer: AnswerCreateRequest
	): Promise<Answer> {
		return this.answerRepository.create({
			answer: newAnswer.answer,
			user: new User({ id: newAnswer.userId }),
			question: new Question({ id: newAnswer.questionId }),
			quizz: new Quizz({ id: newAnswer.quizId }),
		});
	}

	async update(id: number, body: AnswerUpdateRequest): Promise<Answer> {
		const answer = await this.answerRepository.findOne(id);
		if (!answer) throw new AnswerNotFoundError();

		return this.answerRepository.update({
			id,
			answer: body.answer,
		});
	}

	async delete(answerId: number) {
		await this.answerRepository.deleteAnswer(answerId);
	}
}
