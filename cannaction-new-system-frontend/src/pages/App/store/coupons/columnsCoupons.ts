import { Column } from '../../../../components/tableDinamic';
import { useTranslation } from 'react-i18next';

export const useColumnsCoupons = () => {
	const { t } = useTranslation();

	const columnsCoupons: Column[] = [
		{
			id: 'code',
			label: t('tables.userStore.coupon.coupons.code'),
			minWidth: 170,
		},
		{
			id: 'item',
			label: t('tables.userStore.coupon.coupons.item'),
			minWidth: 100,
		},
		{
			id: 'amount',
			label: t('tables.userStore.coupon.coupons.amount'),
			minWidth: 100,
		},
		{
			id: 'date',
			label: t('tables.userStore.coupon.coupons.date'),
			minWidth: 100,
		},
		{
			id: 'customer',
			label: t('tables.userStore.coupon.coupons.customer'),
			minWidth: 120,
		},
		{
			id: 'actions',
			label: t('tables.userStore.coupon.coupons.actions'),
			minWidth: 100,
		},
	];

	const columnCheckedCoupons: Column[] = [
		{
			id: 'code',
			label: t('tables.userStore.coupon.couponsChecked.code'),
			minWidth: 50,
		},
		{
			id: 'promotion',
			label: t('tables.userStore.coupon.couponsChecked.promotion'),
			minWidth: 100,
		},
		{
			id: 'created',
			label: t('tables.userStore.coupon.couponsChecked.created'),
			minWidth: 120,
		},
		{
			id: 'checked',
			label: t('tables.userStore.coupon.couponsChecked.checked'),
			minWidth: 120,
		},
	];

	return { columnsCoupons, columnCheckedCoupons };
};
