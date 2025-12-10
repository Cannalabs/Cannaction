import { IsOptional, IsString } from "class-validator";

export class FindNewsletterRequest {
	@IsOptional()
	@IsString()
	search?: string;
}