import { Column } from '../../../../components/tableDinamic';
import { useTranslation } from 'react-i18next';

export const useColumnsUser = () => {
	const { t } = useTranslation();

	const columnsUser: Column[] = [
		{ id: 'name', label: t('tables.userMarketing.users.name'), minWidth: 150 },
		{ id: 'email', label: t('tables.userMarketing.users.email'), minWidth: 150 },
		{
			id: 'country',
			label: t('tables.userMarketing.users.country'),
			minWidth: 100,
		},
		{ id: 'role', label: t('tables.userMarketing.users.role'), minWidth: 100 },
		{
			id: 'active',
			label: t('tables.userMarketing.users.status'),
			minWidth: 100,
		},
		{
			id: 'actions',
			label: t('tables.userMarketing.users.actions'),
			minWidth: 100,
		},
	];

	return { columnsUser };
};
