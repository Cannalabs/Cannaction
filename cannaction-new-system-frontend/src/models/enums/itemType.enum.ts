import i18n from '../../utils/i18n';

export enum ItemType {
	CLOTHING = 'clothing',
	OTHERS = 'other',
}

export const getProductTypeText = (type: ItemType) => {
	switch (type) {
		case ItemType.CLOTHING:
			return i18n.t('enums.productType.clothing');
		case ItemType.OTHERS:
			return i18n.t('enums.productType.other');
	}
};
