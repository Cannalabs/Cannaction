import { BaseHttpError } from '@/errors/base-http-error.dto';

export class QuizNotFoundError extends BaseHttpError {
	constructor() {
		super(404, 'quiz-not-found', `Quiz not found.`);
	}
}