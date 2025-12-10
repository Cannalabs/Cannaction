import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { PaginationOptionsDto } from '@/modules/database/pagination/pagination-options';
import { PaginationDto } from '@/modules/database/pagination/pagination.dto';
import { Injectable } from '@nestjs/common';
import { FilterQuizUserRequest } from '../dtos/requests/filter-quiz-user.request';
import { FilterQuizzDto } from '../dtos/requests/filter-quizz.dto';
import { Quizz } from '../entities/quizz.entity';
import { QuizzRepository } from '../quizz.repository';

@Injectable()
export class QuizzService {
	constructor(private readonly quizzRepository: QuizzRepository) {}

	async findAll(
		currentUser: CurrentUser,
		filter: FilterQuizzDto,
		options: PaginationOptionsDto
	): Promise<PaginationDto<Quizz>> {
		return this.quizzRepository.findAll(currentUser, filter, options);
	}

	async findOne(id: number): Promise<Quizz | undefined> {
		return this.quizzRepository.findOne(id);
	}

	async findUnansweredQuizByUser(currentUser: CurrentUser, filter: FilterQuizUserRequest, options: PaginationOptionsDto) {
		return this.quizzRepository.getQuizUserList(currentUser.userId, false, filter, options);
	}

	async findAnsweredQuizByUser(currentUser: CurrentUser, filter: FilterQuizUserRequest, options: PaginationOptionsDto) {
		return this.quizzRepository.getQuizUserList(currentUser.userId, true, filter, options);
	}
}
