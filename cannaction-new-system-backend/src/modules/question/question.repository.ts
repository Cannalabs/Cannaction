
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Quizz } from '../quizz/entities/quizz.entity';
import { Question } from './question.entity';

@Injectable()
export class QuestionRepository {
	constructor(
		@InjectRepository(Question)
		private repository: Repository<Question>
	) {}

	async findByQuizz(
		currentUser: CurrentUser,
		quizz_id: number
	): Promise<Question[]> {
		const queryBuilder = this.repository.manager
			.getRepository(Question)
			.createQueryBuilder('question');
		queryBuilder.innerJoin('question.quizzes', 'quizz');
		queryBuilder.where('quizz.id = :id', { id: quizz_id });

		return queryBuilder.getMany();
	}

	async findOne(id: number): Promise<Question> {
		return this.repository.findOne({ where: { id } });
	}

	async create(entity: DeepPartial<Question>): Promise<Question | null> {
		const question = await this.repository.save(entity);
		return this.findOne(question.id);
	}

	async update(entity: DeepPartial<Question>): Promise<Question> {
		await this.repository.update(entity.id, entity);
		return this.findOne(entity.id);
	}

	public async addQuestionToQuizz(question_id: number, quizz_id: number) {
		const queryBuilder = this.repository.manager
			.getRepository(Quizz)
			.createQueryBuilder('quizz');
		queryBuilder.innerJoinAndSelect(
			'quizz_question',
			'qq',
			'qq.quizz_id = :quizz_id AND qq.question_id = :question_id',
			{
				quizz_id,
				question_id,
			}
		);

		if (await queryBuilder.getRawOne()) {
			return;
		}

		await this.repository.manager
			.createQueryBuilder()
			.insert()
			.into('quizz_question')
			.values({
				question_id,
				quizz_id,
			})
			.execute();
	}

	async deleteQuestion(question_id: number) {
		await this.repository.delete(question_id);
	}
}
