import { BaseHttpError } from "@/errors/base-http-error.dto";
import { HttpStatus } from "@nestjs/common";

export class UserPasswordNotUpdatedError extends BaseHttpError {
	constructor(error: string) {
		super(HttpStatus.BAD_REQUEST, 'user-password-not-updated', `Error updating user password. Reason: ${error}`);
	}
}
