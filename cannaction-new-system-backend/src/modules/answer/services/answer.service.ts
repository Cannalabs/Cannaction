import { Injectable } from '@nestjs/common';
import { Answer } from '../answer.entity';
import { AnswerRepository } from '../answer.repository';

@Injectable()
export class AnswerService {
	constructor(private readonly answerRepository: AnswerRepository) {}

	async findByQuestion(
		questionId: number
	): Promise<Answer> {
		return this.answerRepository.findByQuestion(questionId);
	}

}
