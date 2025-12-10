import { Column } from '../../../../components/tableDinamic';
import { useTranslation } from 'react-i18next';

export const usePromotionsColumns = () => {
	const { t } = useTranslation();

	const columnsPromotions: Column[] = [
		{ id: 'thumb', label: t('tables.userStore.promotions.thumb'), minWidth: 170 },
		{
			id: 'promotion',
			label: t('tables.userStore.promotions.promotion'),
			minWidth: 100,
		},
		{
			id: 'coupons',
			label: t('tables.userStore.promotions.coupons'),
			minWidth: 100,
		},
		{
			id: 'created',
			label: t('tables.userStore.promotions.created'),
			minWidth: 100,
		},
		{
			id: 'actions',
			label: t('tables.userStore.promotions.actions'),
			minWidth: 100,
		},
	];

	return {
		columnsPromotions,
	};
};
