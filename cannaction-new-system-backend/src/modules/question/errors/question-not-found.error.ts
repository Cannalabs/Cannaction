import { HttpException, HttpStatus } from '@nestjs/common';

export class QuestionNotFoundError extends HttpException {
	constructor() {
		super(`Question not found.`, HttpStatus.NOT_FOUND);
	}
}
