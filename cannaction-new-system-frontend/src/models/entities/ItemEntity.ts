import { ClothingSize } from '../enums/clothingSize.enum';
import { ItemType } from '../enums/itemType.enum';
import { BarcodeEntity } from './BarcodeEntity';
import { SaleEntity } from './SaleEntity';
import { StoreEntity } from './StoreEntity';

export interface ItemEntity {
	id: number;
	name: string;
	description?: string;
	image?: string;
	dots?: number;
	active: boolean;
	barcodes: BarcodeEntity[];
	size?: ClothingSize;
	exchange: boolean;
	type: ItemType;
	points: number;	
	stores: StoreEntity[];
	sales: SaleEntity[];
	createdAt: Date;
	updatedAt: Date;
}
