import { BaseHttpError } from '@/errors/base-http-error.dto';

export class AnswerNotFoundError extends BaseHttpError {
	constructor() {
		super(404, 'answer-not-found', 'Answer not Found.');
	}
}
