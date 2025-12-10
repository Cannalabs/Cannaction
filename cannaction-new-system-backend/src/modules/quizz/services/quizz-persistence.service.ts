import { AnswerPersistenceService } from '@/modules/answer/services/answer-persistence.service';
import { Country } from '@/modules/country/country.entity';
import { ExtractOperator } from '@/modules/extract/enums/extract-operator.enum';
import { QuestionPersistenceService } from '@/modules/question/services/question-persistence.service';

import { ExtractPersistenceService } from '@/modules/extract/services/extract-persistence.service';
import { UserPersistenceService } from '@/modules/user/services/user-persistence.service';
import { UserService } from '@/modules/user/services/user.service';
import { Injectable } from '@nestjs/common';
import { AnswerQuizRequest } from '../dtos/requests/answer-quiz.request';
import { QuizzCreateRequest } from '../dtos/requests/create-quizz.request';
import { QuizzUpdateRequest } from '../dtos/requests/update-quizz.request';
import { Quizz } from '../entities/quizz.entity';
import { QuizNotFoundError } from '../errors/quiz-not-found.error';
import { QuizzRepository } from '../quizz.repository';

@Injectable()
export class QuizzPersistenceService {
	constructor(
		private readonly quizRepository: QuizzRepository,
		private readonly questionPersistenceService: QuestionPersistenceService,
		private readonly answerPersistenceService: AnswerPersistenceService,
		private readonly userPersistenceService: UserPersistenceService,
		private readonly userService: UserService,
		private readonly extractPersistenceService: ExtractPersistenceService
	) {}

	async create(newQuizz: QuizzCreateRequest) {
		const quiz = await this.quizRepository.create({
			description: newQuizz.description,
			country: new Country({ id: newQuizz.countryId }),
			published: false,
			points: newQuizz.points,
		});

		for (const question of newQuizz.questions) {
			await this.questionPersistenceService.create({ quizzId: quiz.id, question: question.question, options: question.options, type: question.type });
		}
	}

	async update(id: number, body: QuizzUpdateRequest) {
		const quizz = await this.quizRepository.findOne(id);
		if (!quizz) throw new QuizNotFoundError();
		await this.quizRepository.removeQuizQuestions(id);
		await this.quizRepository.removeQuizUser(id);

		await this.quizRepository.update({ id, description: body.description, country: new Country({ id: body.countryId }), points: body.points });
		for (const question of body.questions) {
			await this.questionPersistenceService.update(question.id, {
				question: question.question,
				options: question.options,
				quizzId: id,
				type: question.type
			})
		}

		if (quizz.published) {
			const userList = await this.quizRepository.getUsersForQuiz(body.countryId);
			for (const user of userList) {
				await this.quizRepository.insertQuizUser({ user, quiz: new Quizz({ id }), answerDate: null });
			}
		}
	}

	async publishQuiz(id: number) {
		const quiz = await this.quizRepository.findOne(id);
		if (!quiz) throw new QuizNotFoundError();
		if (quiz.published) return;
		await this.quizRepository.update({ id, published: true });

		const userList = await this.quizRepository.getUsersForQuiz(quiz.country.id);
		for (const user of userList) {
			await this.quizRepository.insertQuizUser({ user, quiz, answerDate: null });
		}
	}

	async unpublishQuiz(id: number) {
		const quiz = await this.quizRepository.findOne(id);
		if (!quiz) throw new QuizNotFoundError();
		if (!quiz.published) return;
		await this.quizRepository.update({ id, published: false });

		await this.quizRepository.removeQuizUser(id);
	}

	async delete(id: number) {
		await this.quizRepository.removeQuizQuestions(id);
		await this.quizRepository.removeQuizUser(id);
		await this.quizRepository.delete(id);
	}

	async answerQuiz(body: AnswerQuizRequest) {
		for (const answer of body.answers) {
			await this.answerPersistenceService.create({
				userId: body.userId,
				quizId: body.quizId,
				answer: answer.answer,
				questionId: answer.questionId
			})
		}
		const user = await this.userService.findOne(body.userId);
		await this.quizRepository.setQuizUserAnswerDate(body.quizId, body.userId);
		const quiz = await this.quizRepository.findOne(body.quizId);
		if (!quiz) throw new QuizNotFoundError();
		await this.extractPersistenceService.createExtract(
			{
				points: quiz.points,
				userId: body.userId,
				balance: user.points + quiz.points,
				description: 'Quiz Answer Registration',
				operator: ExtractOperator.ADDITION,
				amount: 1
			});
		await this.userPersistenceService.updateUserPoints(body.userId, ExtractOperator.ADDITION, quiz.points);
	}
}
