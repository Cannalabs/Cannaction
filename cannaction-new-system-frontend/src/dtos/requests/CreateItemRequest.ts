import { ClothingSize } from '../../models/enums/clothingSize.enum';
import { ItemType } from '../../models/enums/itemType.enum';

export interface CreateItemRequest {
	name: string;
	description?: string;
	image?: string;
	dots?: number;
	size?: ClothingSize;
	points: number;
	exchange: boolean;
	storeIds: number[];
	type: ItemType;
	barcodes: {
		barcode?: string;
		country: {
			id: number;
			name: string;
		}
	}[]
}
