import * as yup from 'yup';
import { PromotionType } from '../../../../../models/enums/promotion.enum';
import { PrizeType } from '../../../../../models/enums/prizeType.enum';

const schema = yup.object().shape({
	id: yup.number(),
	name: yup.string(),
	contactEmail: yup.string(),
	coupons: yup.number(),
	active: yup.boolean(),
	countryId: yup.number(),
	emailText: yup.string(),
	code: yup.string(),
	beginDate: yup.string(),
	finalDate: yup.string(),
	prizeMoney: yup.number(),
	success: yup.boolean(),
	type: yup.string().required().default(PromotionType.PROMOTION),
	targetPromo: yup.number(),
	finalDateTarget: yup.string(),
	prizeTarget: yup.number(),
	prizeType: yup.string().required().default(PrizeType.ITEM),
	prizeItemId: yup.number(),
	itemId: yup.number(),
	lastInteractionDate: yup.string(),
});

export default schema;
