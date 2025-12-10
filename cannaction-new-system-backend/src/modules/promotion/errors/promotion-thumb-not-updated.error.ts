import { HttpException, HttpStatus } from "@nestjs/common";

export class PromotionThumbNotUploadError extends HttpException {
	constructor(error: string) {
		super(`Error uploading promotion's thumb. Reason: ${error}`, HttpStatus.BAD_GATEWAY);
	}
}
