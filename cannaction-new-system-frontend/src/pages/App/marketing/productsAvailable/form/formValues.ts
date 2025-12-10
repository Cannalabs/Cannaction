import { ClothingSize } from '../../../../../models/enums/clothingSize.enum';
import { ItemType } from '../../../../../models/enums/itemType.enum';

export interface FormValues {
	id: number | undefined;
	name: string;
	description?: string;
	image?: string;
	dots?: number | undefined;
	exchange: boolean;
	active: boolean;
	size?: ClothingSize;
	type: ItemType;
	points: number | null;
	storeIds: number[];
	barcodes: {
		barcode: string;
		country: {
			id: number;
			name: string;
		}
	}[];
}
