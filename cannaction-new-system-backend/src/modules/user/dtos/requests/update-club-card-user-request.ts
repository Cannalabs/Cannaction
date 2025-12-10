import { IsOptional } from "class-validator";

export class UpdateClubCardUserRequest {
	@IsOptional()
	storeId?: number;

	@IsOptional()
	name?: string;

	@IsOptional()
	lastName?: string;

	@IsOptional()
	birthdate?: string;

	@IsOptional()
	email?: string;

	@IsOptional()
	password?: string;
}