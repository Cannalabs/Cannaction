import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Answer } from './answer.entity';

@Injectable()
export class AnswerRepository {
	constructor(
		@InjectRepository(Answer)
		private repository: Repository<Answer>
	) {}

	async findByQuestion(
		questionId: number
	): Promise<Answer> {
		const queryBuilder = this.repository.manager
			.getRepository(Answer)
			.createQueryBuilder('answer');
		queryBuilder.innerJoin('answer.question', 'question');
		queryBuilder.where('question.id = :id', { id: questionId });

		return queryBuilder.getOne();
	}

	async findOne(id: number): Promise<Answer> {
		return this.repository.findOne({ where: { id } });
	}

	async create(entity: DeepPartial<Answer>): Promise<Answer | null> {
		const answer = await this.repository.save(entity);
		return this.findOne(answer.id);
	}

	async update(entity: DeepPartial<Answer>): Promise<Answer> {
		await this.repository.update(entity.id, entity);
		return this.findOne(entity.id);
	}

	async deleteAnswer(answerId: number) {
		await this.repository.delete(answerId);
	}
}
