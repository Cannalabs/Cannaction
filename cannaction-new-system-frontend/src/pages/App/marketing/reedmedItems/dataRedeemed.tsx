import { Column } from '../../../../components/tableDinamic';
import { useTranslation } from 'react-i18next';

export const useRedeemedItemsColumns = () => {
	const { t } = useTranslation();

	const columnsItemsToCheck: Column[] = [
		{ id: 'code', label: t('marketing.redeemedItems.columns.code'), minWidth: 50 },
		{
			id: 'promotion',
			label: t('marketing.redeemedItems.columns.promotion'),
			minWidth: 120,
		},
		{
			id: 'created',
			label: t('marketing.redeemedItems.columns.created'),
			minWidth: 100,
		},
		{
			id: 'customer',
			label: t('marketing.redeemedItems.columns.customer'),
			minWidth: 120,
		},
		{
			id: 'store',
			label: t('marketing.redeemedItems.columns.store'),
			minWidth: 100,
		},
		{
			id: 'location',
			label: t('marketing.redeemedItems.columns.location'),
			minWidth: 100,
		},
		{
			id: 'actions',
			label: t('marketing.redeemedItems.columns.actions'),
			minWidth: 100,
		},
	];

	const columnsHistoryCheckedItems: Column[] = [
		{ id: 'code', label: t('marketing.redeemedItems.columns.code'), minWidth: 50 },
		{
			id: 'promotion',
			label: t('marketing.redeemedItems.columns.promotion'),
			minWidth: 120,
		},
		{
			id: 'created',
			label: t('marketing.redeemedItems.columns.created'),
			minWidth: 100,
		},
		{
			id: 'checked',
			label: t('marketing.redeemedItems.columns.checked'),
			minWidth: 120,
		},
		{
			id: 'customer',
			label: t('marketing.redeemedItems.columns.customer'),
			minWidth: 100,
		},
		{
			id: 'store',
			label: t('marketing.redeemedItems.columns.store'),
			minWidth: 100,
		},
		{
			id: 'location',
			label: t('marketing.redeemedItems.columns.location'),
			minWidth: 100,
		},
	];

	return {
		columnsItemsToCheck,
		columnsHistoryCheckedItems,
	};
};
