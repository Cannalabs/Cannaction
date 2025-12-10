import { HttpException, HttpStatus } from '@nestjs/common';

export class NewsletterNotFoundError extends HttpException {
	constructor() {
		super(`Newsletter not found.`, HttpStatus.NOT_FOUND);
	}
}
