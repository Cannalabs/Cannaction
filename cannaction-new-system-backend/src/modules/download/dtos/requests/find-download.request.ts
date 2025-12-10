import { IsOptional } from "class-validator";

export class FindDownloadRequest {
	@IsOptional()
	search?: string;
}