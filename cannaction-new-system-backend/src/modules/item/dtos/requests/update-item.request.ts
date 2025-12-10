import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { ClothingSize } from '../../enums/clothing-size.enum';

export class ItemUpdateRequest {
	@IsOptional()
	name?: string;

	@IsOptional()
	description?: string;

	@IsOptional()
	image?: string;

	@IsOptional()
	dots?: number;

	@IsOptional()
	exchange?: boolean;

	@IsOptional()
	@IsEnum(ClothingSize)
	size?: ClothingSize;

	@IsOptional()
	points?: number;

	@IsOptional()
	active?: boolean;

	@IsOptional()
	@IsArray()
	storeIds?: number[];

	@IsOptional()
	barcodes?: {
		country: { id: number, name: string },
		barcode: string
	}[];
}
