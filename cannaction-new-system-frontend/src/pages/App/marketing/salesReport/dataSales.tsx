import { Column } from '../../../../components/tableDinamic';
import { useTranslation } from 'react-i18next';

export const useSalesReportColumns = () => {
	const { t } = useTranslation();

	const columnsSalesStore: Column[] = [
		{ id: 'store', label: t('marketing.salesReport.columns.stores'), minWidth: 170 },
		{
			id: 'country',
			label: t('marketing.salesReport.columns.country'),
			minWidth: 100,
		},
		{ id: 'sales', label: t('marketing.salesReport.columns.sales'), minWidth: 100 },
		{
			id: 'percent',
			label: t('marketing.salesReport.columns.percent'),
			minWidth: 100,
		},
	];

	const columnsSalesProduct: Column[] = [
		{
			id: 'product',
			label: t('marketing.salesReport.columns.products'),
			minWidth: 170,
		},
		{
			id: 'country',
			label: t('marketing.salesReport.columns.country'),
			minWidth: 100,
		},
		{ id: 'sales', label: t('marketing.salesReport.columns.sales'), minWidth: 100 },
		{
			id: 'percent',
			label: t('marketing.salesReport.columns.percent'),
			minWidth: 100,
		},
	];

	return {
		columnsSalesStore,
		columnsSalesProduct,
	};
};
