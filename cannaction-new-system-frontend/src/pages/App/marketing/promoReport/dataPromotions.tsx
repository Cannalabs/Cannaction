import { Column } from '../../../../components/tableDinamic';
import { useTranslation } from 'react-i18next';

export const usePromotionsColumns = () => {
	const { t } = useTranslation();

	const columnsPromotions: Column[] = [
		{ id: 'promoCode', label: t('marketing.promoReport.couponsTableCodeColumn'), minWidth: 50 },
		{
			id: 'promotion',
			label: t('marketing.promotions.promotionsTablePromotionColumn'),
			minWidth: 50,
		},
		{ id: 'item', label: t('marketing.promoReport.couponsTableItemColumn'), minWidth: 50 },
		{ id: 'date', label: t('marketing.promoReport.couponsTableDateColumn'), minWidth: 50 },
		{
			id: 'customer',
			label: t('marketing.promoReport.couponsTableCustomerColumn'),
			minWidth: 50,
		},
		{ id: 'store', label: t('marketing.promoReport.couponsTableStoreColumn'), minWidth: 50 },
		{
			id: 'country',
			label: t('marketing.promoReport.couponsTableCountryColumn'),
			minWidth: 50,
		},
		// {
		// 	id: 'actions',
		// 	label: t('marketing.promoReport.couponsTableActionsColumn'),
		// 	minWidth: 50,
		// },
	];

	return { columnsPromotions };
};
