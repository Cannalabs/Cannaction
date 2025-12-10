import { PrizeType } from '../../../../../models/enums/prizeType.enum';
import { PromotionType } from '../../../../../models/enums/promotion.enum';
import { FormValues } from './formValues';

export const initialValues: FormValues = {
	id: null,
	name: '',
	contactEmail: '',
	coupons: null,
	active: true,
	countryId: null,
	emailText: '',
	code: '',
	beginDate: '',
	finalDate: '',
	prizeMoney: null,
	success: true,
	type: PromotionType.PROMOTION,
	targetPromo: null,
	finalDateTarget: '',
	prizeTarget: null,
	prizeType: PrizeType.ITEM,
	prizeItemId: null,
	itemId: null,
	lastInteractionDate: '',
};
