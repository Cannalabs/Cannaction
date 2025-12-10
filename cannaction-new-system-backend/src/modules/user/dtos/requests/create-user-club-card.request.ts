import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClubCardUserRequest {
	@IsNotEmpty({ message: 'Card ID is mandatory.' })
	@IsString()
	cardId: string;

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
