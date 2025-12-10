import { Column } from '../../../../components/tableDinamic';
import { useTranslation } from 'react-i18next';

export const useColumnsNotifications = () => {
	const { t } = useTranslation();

	const columnsNotifications: Column[] = [
		{
			id: 'title',
			label: t('tables.userMarketing.notification.title'),
			minWidth: 100,
		},
		{
			id: 'typeUser',
			label: t('tables.userMarketing.notification.typeUser'),
			minWidth: 100,
		},
		{
			id: 'country',
			label: t('tables.userMarketing.notification.country'),
			minWidth: 100,
		},
		{
			id: 'created',
			label: t('tables.userMarketing.notification.created'),
			minWidth: 100,
		},
		{
			id: 'active',
			label: t('tables.userMarketing.notification.status'),
			minWidth: 100,
		},
		{
			id: 'actions',
			label: t('tables.userMarketing.notification.actions'),
			minWidth: 100,
		},
	];

	return { columnsNotifications };
};
