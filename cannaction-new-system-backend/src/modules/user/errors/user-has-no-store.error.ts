import { BaseHttpError } from "@/errors/base-http-error.dto";
import { HttpStatus } from "@nestjs/common";

export class UserHasNoStoreError extends BaseHttpError {
	constructor() {
		super(HttpStatus.BAD_REQUEST, 'user-no-store', `User has no store.`);
	}
}
