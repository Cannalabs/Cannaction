import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	UseGuards,
} from '@nestjs/common';
import {
	CurrentUser,
	ReqCurrentUser,
} from '../auth/decorators/current-user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { PaginationOptionsDto } from '../database/pagination/pagination-options';
import { AnswerQuizRequest } from './dtos/requests/answer-quiz.request';
import { QuizzCreateRequest } from './dtos/requests/create-quizz.request';
import { FilterQuizUserRequest } from './dtos/requests/filter-quiz-user.request';
import { FilterQuizzDto } from './dtos/requests/filter-quizz.dto';
import { QuizzUpdateRequest } from './dtos/requests/update-quizz.request';
import { QuizzPersistenceService } from './services/quizz-persistence.service';
import { QuizzService } from './services/quizz.service';

@Controller('quiz')
export class QuizzController {
	constructor(
		private readonly quizzService: QuizzService,
		private readonly quizzPersistenceService: QuizzPersistenceService
	) {}

	@UseGuards(JwtGuard)
	@Get(':id')
	public async findById(@Param('id') id: string) {
		return this.quizzService.findOne(+id);
	}

	@UseGuards(JwtGuard)
	@Get('answered-quiz')
	public async findAnsweredQuizByUser(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Query() filter: FilterQuizUserRequest,
		@Query() options: PaginationOptionsDto
	) {
		return this.quizzService.findAnsweredQuizByUser(currentUser, filter, options);
	}


	@UseGuards(JwtGuard)
	@Get('unanswered-quiz')
	public async findUnansweredQuizByUser(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Query() filter: FilterQuizUserRequest,
		@Query() options: PaginationOptionsDto
	) {
		return this.quizzService.findUnansweredQuizByUser(currentUser, filter, options);
	}

	@UseGuards(JwtGuard)
	@Post()
	public async create(@Body() quiz: QuizzCreateRequest) {
		await this.quizzPersistenceService.create(quiz);
	}

	@UseGuards(JwtGuard)
	@Post('answer-quiz')
	public async answerQuiz(@Body() body: AnswerQuizRequest) {
		await this.quizzPersistenceService.answerQuiz(body);
	}

	@UseGuards(JwtGuard)
	@Put(':id')
	public async update(@Param('id') id: number, @Body() body: QuizzUpdateRequest) {
		await this.quizzPersistenceService.update(id, body);
	}

	@UseGuards(JwtGuard)
	@Put(':id/publish')
	public async publishQuiz(@Param('id') id: number) {
		await this.quizzPersistenceService.publishQuiz(id);
	}

	@UseGuards(JwtGuard)
	@Put(':id/unpublish')
	public async unpublishQuiz(@Param('id') id: number) {
		await this.quizzPersistenceService.unpublishQuiz(id);
	}

	@UseGuards(JwtGuard)
	@Get()
	public async findAllQuizes(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Query() filter: FilterQuizzDto,
		@Query() options: PaginationOptionsDto
	) {
		return this.quizzService.findAll(currentUser, filter, options);
	}

	@UseGuards(JwtGuard)
	@Delete(':id')
	public async delete(@Param('id') id: number) {
		await this.quizzPersistenceService.delete(id);
	}
}
