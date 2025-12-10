import { Column } from '../../../../components/tableDinamic';
import { useTranslation } from 'react-i18next';

export const useColumnsClubCard = () => {
	const { t } = useTranslation();

	const columnsClubCardList: Column[] = [
		{ id: 'code', label: t('tables.userMarketing.clubCardCodeList.code'), minWidth: 100 },
		{
			id: 'status',
			label: t('tables.userMarketing.clubCard.status'),
			minWidth: 100,
		},
	];

	return { columnsClubCardList };
};
