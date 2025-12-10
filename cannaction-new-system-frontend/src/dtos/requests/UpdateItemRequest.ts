import { ClothingSize } from '../../models/enums/clothingSize.enum';

export interface UpdateItemRequest {
	name?: string;
	description?: string;
	image?: string;
	storeIds?: number[];
	dots?: number;
	exchange?: boolean;
	size?: ClothingSize;
	points?: number;
	barcodes: {
		barcode?: string;
		country: {
			id: number;
			name: string;
		}
	}[]
}
