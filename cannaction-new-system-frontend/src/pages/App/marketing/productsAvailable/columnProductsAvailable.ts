import { Column } from '../../../../components/tableDinamic';
import { useTranslation } from 'react-i18next';

export const useColumnsProductAvailable = () => {
	const { t } = useTranslation();

	const columnsProductAvailable: Column[] = [
		{
			id: 'thumb',
			label: t('tables.userMarketing.productsAvailable.thumb'),
			minWidth: 170,
		},
		{
			id: 'name',
			label: t('tables.userMarketing.productsAvailable.name'),
			minWidth: 100,
		},
		{
			id: 'description',
			label: t('tables.userMarketing.productsAvailable.description'),
			minWidth: 100,
		},
		{
			id: 'points',
			label: t('tables.userMarketing.productsAvailable.points'),
			minWidth: 100,
		},
		{
			id: 'status',
			label: t('tables.userMarketing.productsAvailable.status'),
			minWidth: 100,
		},
		{
			id: 'type',
			label: t('tables.userMarketing.productsAvailable.type'),
			minWidth: 100,
		},
		{
			id: 'actions',
			label: t('tables.userMarketing.productsAvailable.actions'),
			minWidth: 100,
		},
	];

	return { columnsProductAvailable };
};
