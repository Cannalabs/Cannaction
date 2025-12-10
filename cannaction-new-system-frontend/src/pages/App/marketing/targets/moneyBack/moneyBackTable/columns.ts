import { Column } from '../../../../../../components/tableDinamic';
import { useTranslation } from 'react-i18next';

export const useMoneyBackTable = () => {
	const { t } = useTranslation();

	const moneyBackTable: Column[] = [
		{
			id: 'country',
			label: t('tables.userMarketing.targets.moneybackTargets.country'),
			minWidth: 100,
		},
		{
			id: 'store',
			label: t('tables.userMarketing.targets.moneybackTargets.store'),
			minWidth: 100,
		},
		{
			id: 'target',
			label: t('tables.userMarketing.targets.moneybackTargets.target'),
			minWidth: 100,
		},
		{
			id: 'progress',
			label: t('tables.userMarketing.targets.moneybackTargets.progress'),
			minWidth: 100,
		},
		{
			id: 'prize',
			label: t('tables.userMarketing.targets.moneybackTargets.prize'),
			minWidth: 100,
		},
		{
			id: 'deadline',
			label: t('tables.userMarketing.targets.moneybackTargets.deadline'),
			minWidth: 100,
		},
		{
			id: 'status',
			label: t('tables.userMarketing.targets.moneybackTargets.status'),
			minWidth: 100,
		},
		{
			id: 'actions',
			label: t('tables.userMarketing.targets.moneybackTargets.actions'),
			minWidth: 100,
		},
	];

	return { moneyBackTable };
};
