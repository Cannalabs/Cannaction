import { Column } from '../../../../components/tableDinamic';
import { useTranslation } from 'react-i18next';

export const useCustomerColumns = () => {
	const { t } = useTranslation();

	const columnsCustomers: Column[] = [
		{
			id: 'nome',
			label: t('tables.userStore.customer.customers.name'),
			minWidth: 170,
		},
		{
			id: 'email',
			label: t('tables.userStore.customer.customers.email'),
			minWidth: 100,
		},
		{
			id: 'joined',
			label: t('tables.userStore.customer.customers.joined'),
			minWidth: 120,
		},
		{
			id: 'status',
			label: t('tables.userStore.customer.customers.status'),
			minWidth: 120,
		},
		{
			id: 'actions',
			label: t('tables.userStore.customer.customers.actions'),
			minWidth: 100,
		},
	];

	const columnsAnonymousCustomers: Column[] = [
		{ id: 'cardId', label: t('tables.customers.columns.cardId'), minWidth: 170 },
		{ id: 'joined', label: t('tables.customers.columns.joined'), minWidth: 120 },
		{ id: 'status', label: t('tables.customers.columns.status'), minWidth: 120 },
		{
			id: 'actions',
			label: t('tables.customers.columns.actions'),
			minWidth: 100,
		},
	];

	return {
		columnsCustomers,
		columnsAnonymousCustomers,
	};
};
