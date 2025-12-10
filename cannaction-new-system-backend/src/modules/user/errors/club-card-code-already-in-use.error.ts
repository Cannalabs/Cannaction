import { BaseHttpError } from '@/errors/base-http-error.dto';
import { HttpStatus } from '@nestjs/common';

export class ClubCardCodeAlreadyInUseError extends BaseHttpError {
	constructor() {
		super(HttpStatus.BAD_REQUEST, `club-card-code-in-use`, `Club Card Code already in use.`);
	}
}
