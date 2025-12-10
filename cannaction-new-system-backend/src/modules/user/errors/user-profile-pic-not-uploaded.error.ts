import { BaseHttpError } from "@/errors/base-http-error.dto";
import { HttpStatus } from "@nestjs/common";

export class UserProfilePicNotUploadError extends BaseHttpError {
	constructor(error: string) {
		super(HttpStatus.BAD_GATEWAY, 'error-profile-pic', `Error uploading user's profile pic. Reason: ${error}`,);
	}
}
