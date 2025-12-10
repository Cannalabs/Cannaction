import { Column } from '../../../../components/tableDinamic';
import { useTranslation } from 'react-i18next';

export const useClubCardColumns = () => {
	const { t } = useTranslation();

	const columnsClubCard: Column[] = [
		{
			id: 'cardId',
			label: t('tables.userStore.clubCard.cardId'),
			minWidth: 100,
		},
		{
			id: 'name',
			label: t('tables.userStore.clubCard.name'),
			minWidth: 100,
		},
		{
			id: 'email',
			label: t('tables.userStore.clubCard.email'),
			minWidth: 100,
		},
		{
			id: 'birthdate',
			label: t('tables.userStore.clubCard.birthdate'),
			minWidth: 100,
		},
		{
			id: 'created',
			label: t('tables.userStore.clubCard.created'),
			minWidth: 100,
		},
		{
			id: 'linkedStore',
			label: t('tables.userStore.clubCard.linkedStore'),
			minWidth: 100,
		},
		{
			id: 'status',
			label: t('tables.userStore.clubCard.status'),
			minWidth: 100,
		},
		{
			id: 'actions',
			label: t('tables.userStore.clubCard.actions'),
			minWidth: 100,
		},
	];

	return { columnsClubCard };
};
