import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Answer } from './answer.entity';
import { AnswerCreateRequest } from './requests/create-answer.request';
import { AnswerUpdateRequest } from './requests/update-answer.request';
import { AnswerPersistenceService } from './services/answer-persistence.service';
import { AnswerService } from './services/answer.service';

@Controller('answer')
@UseGuards(JwtGuard)
export class AnswerController {
	constructor(
		private readonly answerService: AnswerService,
		private readonly answerPersistenceService: AnswerPersistenceService
	) {}

	@Get(':id')
	public async findByQuestion(
		@Param('id') id: number,
	) {
		return this.answerService.findByQuestion(id);
	}

	@Post()
	public async create(
		@Body() answer: AnswerCreateRequest,
	): Promise<Answer> {
		return this.answerPersistenceService.create(answer);
	}

	@Put(':id')
	public async update(
		@Param('id') id: number,
		@Body() body: AnswerUpdateRequest
	): Promise<Answer> {
		return this.answerPersistenceService.update(id, body);
	}
}
