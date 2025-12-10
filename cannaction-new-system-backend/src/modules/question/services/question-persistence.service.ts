import { Injectable } from '@nestjs/common';
import { QuestionType } from '../enums/question-type.enum';
import { QuestionNotFoundError } from '../errors/question-not-found.error';
import { QuestionRepository } from '../question.repository';
import { QuestionCreateRequest } from '../requests/create-question.request';
import { QuestionUpdateRequest } from '../requests/update-question.request';

@Injectable()
export class QuestionPersistenceService {
	constructor(
		private readonly questionRepository: QuestionRepository,
	) {}

	async create(newQuestion: QuestionCreateRequest) {
		const question = await this.questionRepository.create({
			question: newQuestion.question,
			type: newQuestion.type,
			options: newQuestion.type === QuestionType.TEXT ? [] : newQuestion.options,
		});

		await this.questionRepository.addQuestionToQuizz(question.id, newQuestion.quizzId);
	}

	async update(id: number, body: QuestionUpdateRequest) {
		const question = await this.questionRepository.findOne(id);
		if (!question) throw new QuestionNotFoundError();

		await this.questionRepository.update({
			id,
			question: body.question,
			type: body.type,
			options: body.type === QuestionType.TEXT ? [] : body.options,
		});

		await this.questionRepository.addQuestionToQuizz(question.id, body.quizzId);
	}

	async delete(questionId: number) {
		await this.questionRepository.deleteQuestion(questionId);
	}
}
