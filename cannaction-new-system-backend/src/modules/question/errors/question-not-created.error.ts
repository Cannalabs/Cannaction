import { HttpException, HttpStatus } from '@nestjs/common';

export class QuestionNotCreatedError extends HttpException {
	constructor() {
		super(`Question not created.`, HttpStatus.BAD_REQUEST);
	}
}
