import { ClothingSize } from '../../../../../models/enums/clothingSize.enum';
import { ItemType } from '../../../../../models/enums/itemType.enum';
import { FormValues } from './formValues';

export const initialValues: FormValues = {
	id: undefined,
	name: '',
	description: '',
	image: '',
	dots: undefined,
	active: true,
	type: ItemType.OTHERS,
	barCode: '',
	size: ClothingSize.M,
	maxCoupon: 0,
	points: 0,
};
