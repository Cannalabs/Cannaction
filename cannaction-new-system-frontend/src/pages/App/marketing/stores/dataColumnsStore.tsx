import { Column } from '../../../../components/tableDinamic';
import { useTranslation } from 'react-i18next';

export const useStoreColumns = () => {
	const { t } = useTranslation();

	const columnsStore: Column[] = [
		{ id: 'name', label: t('tables.stores.columns.name'), minWidth: 100 },
		{ id: 'country', label: t('tables.stores.columns.country'), minWidth: 100 },
		{ id: 'region', label: t('tables.stores.columns.region'), minWidth: 100 },
		{ id: 'city', label: t('tables.stores.columns.city'), minWidth: 100 },
		{ id: 'active', label: t('tables.stores.columns.status'), minWidth: 100 },
		{
			id: 'lastInteraction',
			label: t('tables.stores.columns.lastInteraction'),
			minWidth: 100,
		},
		{ id: 'actions', label: t('tables.stores.columns.actions'), minWidth: 100 },
	];

	return { columnsStore };
};
