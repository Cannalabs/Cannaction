import { IsNotEmpty, IsOptional } from 'class-validator';

export class StoreCreateRequest {
	@IsNotEmpty({ message: 'Name is mandatory.' })
	name: string;

	// @IsNotEmpty({ message: 'State is mandatory.' })
	// stateId: number;

	// @IsNotEmpty({ message: 'City is mandatory.' })
	// cityId: number;

	@IsOptional()
	address?: string;

	@IsOptional()
	contactTelephone?: string;

	@IsOptional()
	contactEmail?: string;
}
