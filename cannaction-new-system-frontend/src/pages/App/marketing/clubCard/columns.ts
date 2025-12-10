import { Column } from '../../../../components/tableDinamic';
import { useTranslation } from 'react-i18next';

export const useColumnsClubCard = () => {
	const { t } = useTranslation();

	const columnsClubCard: Column[] = [
		{
			id: 'cardId',
			label: t('tables.userMarketing.clubCard.cardId'),
			minWidth: 100,
		},
		{ id: 'name', label: t('tables.userMarketing.clubCard.name'), minWidth: 100 },
		{
			id: 'email',
			label: t('tables.userMarketing.clubCard.email'),
			minWidth: 100, 
			maxWidth: 200,
		},
		{
			id: 'birthdate',
			label: t('tables.userMarketing.clubCard.birthdate'),
			minWidth: 100,
		},
		{
			id: 'created',
			label: t('tables.userMarketing.clubCard.created'),
			minWidth: 100,
		},
		{
			id: 'linkedStore',
			label: t('tables.userMarketing.clubCard.linkedStore'),
			minWidth: 100,
		},
		{
			id: 'status',
			label: t('tables.userMarketing.clubCard.status'),
			minWidth: 100,
		},
		{
			id: 'actions',
			label: t('tables.userMarketing.clubCard.actions'),
			minWidth: 100,
		},
	];

	return { columnsClubCard };
};
