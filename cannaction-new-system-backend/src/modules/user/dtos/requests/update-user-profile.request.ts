import { IsOptional } from "class-validator";

export class UpdateUserProfileRequest {
	@IsOptional()
	name?: string;

	@IsOptional()
	lastName?: string;

	@IsOptional()
	nickname?: string;

	@IsOptional()
	birthdate?: string;

	@IsOptional()
	gender?: string;

	@IsOptional()
	password?: string;

	@IsOptional()
	languageId?: number;

	@IsOptional()
	newEmail?: string;

	@IsOptional()
	newPassword?: string;

	@IsOptional()
	repeatNewPassword?: string;

}