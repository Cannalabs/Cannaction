import { Column } from '../../../../components/tableDinamic';
import { useTranslation } from 'react-i18next';

export const useColumnsQuiz = () => {
	const { t } = useTranslation();

	const columnsQuiz: Column[] = [
		{ id: 'name', label: t('tables.userMarketing.quiz.name'), minWidth: 170 },
		{ id: 'points', label: t('tables.userMarketing.quiz.points'), minWidth: 100 },
		{
			id: 'country',
			label: t('tables.userMarketing.quiz.country'),
			minWidth: 100,
		},
		{
			id: 'created',
			label: t('tables.userMarketing.quiz.created'),
			minWidth: 100,
		},
		{ id: 'active', label: t('tables.userMarketing.quiz.status'), minWidth: 100 },
		{
			id: 'actions',
			label: t('tables.userMarketing.quiz.actions'),
			minWidth: 100,
		},
	];

	return { columnsQuiz };
};
