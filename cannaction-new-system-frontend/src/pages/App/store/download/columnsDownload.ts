import { Column } from '../../../../components/tableDinamic';
import { useTranslation } from 'react-i18next';

export const useDownloadColumns = () => {
	const { t } = useTranslation();

	const columnsDownload: Column[] = [
		{
			id: 'folder',
			label: t('tables.userStore.download.downloads.folder'),
			minWidth: 300,
		},
		{
			id: 'actions',
			label: t('tables.userStore.download.downloads.actions'),
			minWidth: 10,
		},
	];

	return { columnsDownload };
};
