import * as yup from 'yup';
import { ClothingSize } from '../../../../../models/enums/clothingSize.enum';
import { ItemType } from '../../../../../models/enums/itemType.enum';

const schema = yup.object().shape({
	id: yup.number(),
	name: yup.string(),
	description: yup.string(),
	image: yup.string(),
	dots: yup.number(),
	active: yup.boolean(),
	type: yup.string().default(ItemType.OTHERS),
	barCode: yup.string(),
	size: yup.string().default(ClothingSize.M),
	maxCoupon: yup.number(),
	points: yup.number(),
	storeId: yup.number(),
	saleId: yup.number(),
	stock: yup.number(),
});

export default schema;
