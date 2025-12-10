import { Column } from '../../../../components/tableDinamic';
import { useTranslation } from 'react-i18next';

export const useColumnsDownload = () => {
	const { t } = useTranslation();

	const columnsDownload: Column[] = [
		{
			id: 'folder',
			label: t('tables.userMarketing.upload.folder'),
			minWidth: 100,
		},
		{
			id: 'created',
			label: t('tables.userMarketing.upload.created'),
			minWidth: 100,
		},
		{
			id: 'actions',
			label: t('tables.userMarketing.upload.actions'),
			minWidth: 100,
		},
	];

	return { columnsDownload };
};
