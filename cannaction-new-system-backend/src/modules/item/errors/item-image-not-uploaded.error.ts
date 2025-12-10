import { HttpException, HttpStatus } from "@nestjs/common";

export class ItemImageNotUploadError extends HttpException {
	constructor(error: string) {
		super(`Error uploading item's image. Reason: ${error}`, HttpStatus.BAD_GATEWAY);
	}
}
