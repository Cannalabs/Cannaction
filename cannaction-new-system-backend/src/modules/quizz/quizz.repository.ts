
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { PaginationService } from '../database/pagination.service';
import { PaginationOptionsDto } from '../database/pagination/pagination-options';
import { PaginationDto } from '../database/pagination/pagination.dto';
import { UserType } from '../user/enums/user-type.enum';
import { User } from '../user/user.entity';
import { FilterQuizUserRequest } from './dtos/requests/filter-quiz-user.request';
import { FilterQuizzDto } from './dtos/requests/filter-quizz.dto';
import { QuizUser } from './entities/quizz-user.entity';
import { Quizz } from './entities/quizz.entity';

@Injectable()
export class QuizzRepository {
	constructor(
		@InjectRepository(Quizz)
		private repository: Repository<Quizz>,
		@InjectRepository(QuizUser)
		private quizUserRepository: Repository<QuizUser>,
		private readonly paginationService: PaginationService
	) {}

	async findAll(
		currentUser: CurrentUser,
		filter: FilterQuizzDto,
		options: PaginationOptionsDto
	): Promise<PaginationDto<Quizz>> {
		const queryBuilder = this.repository.manager
			.getRepository(Quizz)
			.createQueryBuilder('quizz');
		queryBuilder.innerJoin('quizz.country', 'country');

		if (currentUser.userType != UserType.SUPER || filter.countryId) {
			queryBuilder.andWhere('country.id = :countryId', {
				countryId: filter.countryId ? filter.countryId : currentUser.userCountry,
			});
		}

		queryBuilder.select(['quizz.id', 'quizz.description', 'quizz.points', 'quizz.createdAt', 'quizz.published', 'country.id', 'country.name'])
		queryBuilder.orderBy('quizz.createdAt', 'DESC');

		return this.paginationService.paginate(options, queryBuilder)
	}

	async findOne(id: number): Promise<Quizz | null> {
		return this.repository.findOne({
			where: { id },
			relations: ['questions', 'country']
		});
	}

	async create(entity: DeepPartial<Quizz>): Promise<Quizz | null> {
		const quizz = await this.repository.save(entity);
		return this.findOne(quizz.id);
	}

	async update(entity: DeepPartial<Quizz>): Promise<Quizz> {
		await this.repository.update(entity.id, entity);
		return this.findOne(entity.id);
	}

	async delete(quizId: number) {
		await this.removeQuizQuestions(quizId);
		await this.repository.delete(quizId);
	}

	async removeQuizQuestions(
		quizzId: number
	) {
		await this.repository.manager
			.createQueryBuilder()
			.delete()
			.from('quizz_question')
			.where('quizz_id = :quizzId', {
				quizzId,
			})
			.execute();
	}

	async getUsersForQuiz(countryId: number) {
		const queryBuilder = this.repository.manager.getRepository(User).createQueryBuilder('user');
		queryBuilder.andWhere('user.country_id = :countryId', { countryId });
		queryBuilder.andWhere('user.active = true');
		queryBuilder.andWhere('user.userType <> :marketing', { marketing: UserType.MARKETING });
		queryBuilder.andWhere('user.userType <> :marketing', { marketing: UserType.CLUB_CARD });
		queryBuilder.andWhere('user.userType <> :userType', { userType: UserType.SUPER });
		return queryBuilder.getMany();
	}

	async insertQuizUser(entity: DeepPartial<QuizUser>) {
		const quizUser = await this.getQuizUser(entity.quiz.id, entity.user.id);
		if (quizUser) return;
		await this.quizUserRepository.save(entity);
	}

	async getQuizUser(quizId: number, userId: number) {
		return this.quizUserRepository.findOne({ where: { user: { id: userId }, quiz: { id: quizId } } });
	}

	async setQuizUserAnswerDate(quizId: number, userId: number) {
		const quizUser = await this.getQuizUser(quizId, userId);
		await this.quizUserRepository.update(quizUser.id, { answerDate: new Date() });
	}

	async removeQuizUser(quizId: number) {
		await this.repository.manager.createQueryBuilder()
			.delete().from(QuizUser).where('quiz_id = :quizId', { quizId }).andWhere('answer_date is null').execute();
	}

	async getQuizUserList(userId: number, answered: boolean, filter: FilterQuizUserRequest, options: PaginationOptionsDto) {
		const queryBuilder = this.repository.manager
			.getRepository(Quizz)
			.createQueryBuilder('quizz');
		queryBuilder.innerJoin('quizz.quizUsers', 'qu');
		queryBuilder.andWhere('qu.user_id = :userId', { userId });
		if (answered) {
			queryBuilder.andWhere('qu.answerDate is not null');
		} else {
			queryBuilder.andWhere('qu.answerDate is null');
		}

		if (filter.search) {
			const searchTerm = `%${filter.search.toLowerCase()}%`;
			queryBuilder.andWhere('quizz.description like :searchTerm', { searchTerm });
		}

		queryBuilder.select(['quizz.id', 'quizz.description', 'quizz.points', 'quizz.createdAt', 'qu.id', 'qu.answerDate']);
		queryBuilder.orderBy('quizz.createdAt', 'DESC');

		return this.paginationService.paginate(options, queryBuilder)
	}
}
