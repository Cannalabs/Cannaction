import { IsOptional, IsString } from "class-validator";

export class ClubCardCodeListRequest {
	@IsOptional()
	@IsString()
	search?: string;
}