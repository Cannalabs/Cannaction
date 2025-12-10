import { useTranslation } from 'react-i18next';
import { Column } from '../../../../components/tableDinamic';

export const usePointsStatementColumns = () => {
	const { t } = useTranslation();

	const pointRegistrationColumn: Column[] = [
		{
			id: 'pointRegistration',
			label: t('tables.userStore.dashboard.pointRegistration.pointRegistration'),
			minWidth: 100,
		},
		{
			id: 'type',
			label: t('tables.userStore.dashboard.pointRegistration.type'),
			minWidth: 120,
		},
		{
			id: 'points',
			label: t('tables.userStore.dashboard.pointRegistration.points'),
			minWidth: 120,
		},
		{
			id: 'quantity',
			label: t('tables.userStore.dashboard.pointRegistration.quantity'),
			minWidth: 100,
		},
		{
			id: 'total',
			label: t('tables.userStore.dashboard.pointRegistration.total'),
			minWidth: 100,
		},
		{
			id: 'balance',
			label: t('tables.userStore.dashboard.pointRegistration.balance'),
			minWidth: 100,
		},
		{
			id: 'created',
			label: t('tables.userStore.dashboard.pointRegistration.created'),
			minWidth: 100,
		},
	];

	const stockColumn: Column[] = [
		{
			id: 'product',
			label: t('tables.userStore.dashboard.stock.product'),
			minWidth: 100,
		},
		{
			id: 'lastUpdate',
			label: t('tables.userStore.dashboard.stock.lastUpdate'),
			minWidth: 100,
		},
		{
			id: 'input',
			label: t('tables.userStore.dashboard.stock.input'),
			minWidth: 100,
		},
		{
			id: 'output',
			label: t('tables.userStore.dashboard.stock.output'),
			minWidth: 100,
		},
		{
			id: 'total',
			label: t('tables.userStore.dashboard.stock.total'),
			minWidth: 100,
		},
	];

	return {
		pointRegistrationColumn,
		stockColumn,
	};
};
