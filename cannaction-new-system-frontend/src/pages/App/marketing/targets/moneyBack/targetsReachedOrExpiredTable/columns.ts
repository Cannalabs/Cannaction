import { Column } from '../../../../../../components/tableDinamic';
import { useTranslation } from 'react-i18next';

export const useTargetsReachedOrExpiredTable = () => {
	const { t } = useTranslation();

	const targetsReachedOrExpiredTable: Column[] = [
		{
			id: 'country',
			label: t('tables.userMarketing.targets.targetsReachedOrExpired.country'),
			minWidth: 100,
		},
		{
			id: 'store',
			label: t('tables.userMarketing.targets.targetsReachedOrExpired.store'),
			minWidth: 100,
		},
		{
			id: 'target',
			label: t('tables.userMarketing.targets.targetsReachedOrExpired.target'),
			minWidth: 100,
		},
		{
			id: 'progress',
			label: t('tables.userMarketing.targets.targetsReachedOrExpired.progress'),
			minWidth: 100,
		},
		{
			id: 'prize',
			label: t('tables.userMarketing.targets.targetsReachedOrExpired.prize'),
			minWidth: 100,
		},
		{
			id: 'created',
			label: t('tables.userMarketing.targets.targetsReachedOrExpired.created'),
			minWidth: 100,
		},
		{
			id: 'deadline',
			label: t('tables.userMarketing.targets.targetsReachedOrExpired.deadline'),
			minWidth: 100,
		},
		{
			id: 'status',
			label: t('tables.userMarketing.targets.targetsReachedOrExpired.status'),
			minWidth: 100,
		},
	];

	return { targetsReachedOrExpiredTable };
};
