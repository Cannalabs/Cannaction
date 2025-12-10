import { HttpException, HttpStatus } from '@nestjs/common';

export class NewsletterNotCreatedError extends HttpException {
	constructor(error: string) {
		super(`Error creating Promotion. Reason: ${error}`, HttpStatus.BAD_REQUEST);
	}
}
