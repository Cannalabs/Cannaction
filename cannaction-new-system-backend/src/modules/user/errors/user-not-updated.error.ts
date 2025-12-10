import { BaseHttpError } from "@/errors/base-http-error.dto";
import { HttpStatus } from "@nestjs/common";

export class UserNotUpdatedError extends BaseHttpError {
	constructor(error: string) {
		super(HttpStatus.BAD_REQUEST, 'user-not-updated', `Error updating user. Reason: ${error}`);
	}
}
