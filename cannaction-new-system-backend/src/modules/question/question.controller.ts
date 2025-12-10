import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common';
import {
	CurrentUser,
	ReqCurrentUser,
} from '../auth/decorators/current-user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { QuestionCreateRequest } from './requests/create-question.request';
import { QuestionUpdateRequest } from './requests/update-question.request';
import { QuestionPersistenceService } from './services/question-persistence.service';
import { QuestionService } from './services/question.service';

@Controller('question')
@UseGuards(JwtGuard)
export class QuestionController {
	constructor(
		private readonly questionService: QuestionService,
		private readonly questionPersistenceService: QuestionPersistenceService
	) {}

	@Get(':id')
	public async findByQuizz(
		@Param('id') id: number,
		@ReqCurrentUser() currentUser: CurrentUser
	) {
		return this.questionService.findByQuizz(currentUser, id);
	}

	@Post()
	public async create(
		@Body() question: QuestionCreateRequest
	) {
		await this.questionPersistenceService.create(question);
	}

	@Put(':id')
	public async update(
		@Param('id') id: number,
		@Body() body: QuestionUpdateRequest
	) {
		await this.questionPersistenceService.update(id, body);
	}
}
