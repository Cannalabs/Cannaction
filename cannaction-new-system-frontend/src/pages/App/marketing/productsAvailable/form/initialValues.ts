import { ClothingSize } from '../../../../../models/enums/clothingSize.enum';
import { ItemType } from '../../../../../models/enums/itemType.enum';
import { FormValues } from './formValues';

export const initialValues: FormValues = {
	id: undefined,
	name: '',
	description: '',
	exchange: false,
	image: '',
	dots: undefined,
	active: true,
	type: ItemType.OTHERS,
	size: ClothingSize.M,
	points: null,
	storeIds: [],
	barcodes: []
};
