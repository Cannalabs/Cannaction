import { Column } from '../../../../components/tableDinamic';
import { useTranslation } from 'react-i18next';

export const useColumnsShopToCheck = () => {
	const { t } = useTranslation();

	const columnsShopToCheck: Column[] = [
		{
			id: 'customer',
			label: t('tables.userMarketing.checkChangeShop.columnsShopToCheck.customer'),
			minWidth: 170,
		},
		{
			id: 'oldShop',
			label: t('tables.userMarketing.checkChangeShop.columnsShopToCheck.oldShop'),
			minWidth: 100,
		},
		{
			id: 'newShop',
			label: t('tables.userMarketing.checkChangeShop.columnsShopToCheck.newShop'),
			minWidth: 100,
		},
		{
			id: 'created',
			label: t('tables.userMarketing.checkChangeShop.columnsShopToCheck.created'),
			minWidth: 100,
		},
		{
			id: 'reasonToChange',
			label: t(
				'tables.userMarketing.checkChangeShop.columnsShopToCheck.reasonToChange'
			),
			minWidth: 100,
		},
		{
			id: 'actions',
			label: t('tables.userMarketing.checkChangeShop.columnsShopToCheck.actions'),
			minWidth: 100,
		},
	];

	const columnsHistoryCheckedShops: Column[] = [
		{
			id: 'customer',
			label: t(
				'tables.userMarketing.checkChangeShop.columnsHistoryCheckedShops.customer'
			),
			minWidth: 170,
		},
		{
			id: 'oldShop',
			label: t(
				'tables.userMarketing.checkChangeShop.columnsHistoryCheckedShops.oldShop'
			),
			minWidth: 100,
		},
		{
			id: 'newShop',
			label: t(
				'tables.userMarketing.checkChangeShop.columnsHistoryCheckedShops.newShop'
			),
			minWidth: 100,
		},
		{
			id: 'created',
			label: t(
				'tables.userMarketing.checkChangeShop.columnsHistoryCheckedShops.created'
			),
			minWidth: 100,
		},
		{
			id: 'checked',
			label: t('marketing.checkChangShop.historyShopTableStatusColumn'),
			minWidth: 100,
		},
		{
			id: 'reasonToChange',
			label: t(
				'tables.userMarketing.checkChangeShop.columnsShopToCheck.reasonToChange'
			),
			minWidth: 100,
		},
	];

	return { columnsShopToCheck, columnsHistoryCheckedShops };
};
