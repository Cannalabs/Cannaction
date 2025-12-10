import { BaseHttpError } from "@/errors/base-http-error.dto";
import { HttpStatus } from "@nestjs/common";

export class UserNotCreatedError extends BaseHttpError {
	constructor(error: string) {
		super(HttpStatus.BAD_REQUEST, 'user-not-created', `Error creating user. Reason: ${error}`);
	}
}
