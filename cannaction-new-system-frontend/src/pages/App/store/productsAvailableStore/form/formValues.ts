import { ClothingSize } from '../../../../../models/enums/clothingSize.enum';
import { ItemType } from '../../../../../models/enums/itemType.enum';

export interface FormValues {
	id: number | undefined;
	name: string;
	description?: string;
	image?: string;
	dots?: number | undefined;
	active: boolean;
	barCode: string;
	size?: ClothingSize;
	type: ItemType;
	maxCoupon: number;
	points: number;
}
