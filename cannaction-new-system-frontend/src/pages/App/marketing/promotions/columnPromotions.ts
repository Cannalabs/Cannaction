import { Column } from '../../../../components/tableDinamic';
import { useTranslation } from 'react-i18next';

export const useColumnsPromotions = () => {
	const { t } = useTranslation();

	const columnsPromotions: Column[] = [
		{
			id: 'thumb',
			label: t('tables.userMarketing.promotions.thumb'),
			minWidth: 170,
		},
		{
			id: 'promotion',
			label: t('tables.userMarketing.promotions.promotion'),
			minWidth: 100,
		},
		{
			id: 'maxCoupons',
			label: t('tables.userMarketing.promotions.maxCoupons'),
			minWidth: 100,
		},
		{
			id: 'created',
			label: t('tables.userMarketing.promotions.created'),
			minWidth: 100,
		},
		{
			id: 'active',
			label: t('tables.userMarketing.promotions.status'),
			minWidth: 100,
		},
		{
			id: 'actions',
			label: t('tables.userMarketing.promotions.actions'),
			minWidth: 100,
		},
	];

	return { columnsPromotions };
};
