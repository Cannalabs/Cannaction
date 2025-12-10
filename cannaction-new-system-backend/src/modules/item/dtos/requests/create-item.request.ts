import { IsArray, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ClothingSize } from '../../enums/clothing-size.enum';
import { ItemType } from '../../enums/item-type.enum';

export class ItemCreateRequest {
	@IsNotEmpty({ message: 'Name is mandatory.' })
	name: string;

	@IsOptional()
	description?: string;

	@IsOptional()
	image?: string;

	@IsOptional()
	dots?: number;

	@IsOptional()
	@IsEnum(ClothingSize)
	size?: ClothingSize;

	@IsNotEmpty({ message: 'Stores are mandatory.' })
	@IsArray()
	storeIds: number[];

	@IsNotEmpty({ message: 'Exchange parameter is mandatory.' })
	exchange: boolean;

	@IsNotEmpty({ message: 'Points is mandatory.' })
	points: number;

	@IsNotEmpty({ message: 'Item Type is mandatory.' })
	@IsEnum(ItemType)
	type: ItemType;

	@IsNotEmpty()
	barcodes: {
		country: { id: number, name: string },
		barcode: string
	}[];
}
