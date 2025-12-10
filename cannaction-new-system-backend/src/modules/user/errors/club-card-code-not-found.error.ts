import { BaseHttpError } from '@/errors/base-http-error.dto';
import { HttpStatus } from '@nestjs/common';

export class ClubCardCodeNotFoundError extends BaseHttpError {
	constructor() {
		super(HttpStatus.NOT_FOUND, `club-card-code-not-found`, `Club Card Code not found.`);
	}
}
