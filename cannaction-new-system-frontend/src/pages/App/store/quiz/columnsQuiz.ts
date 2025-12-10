import { Column } from '../../../../components/tableDinamic';
import { useTranslation } from 'react-i18next';

export const useColumnsQuiz = () => {
	const { t } = useTranslation();

	const columnsQuiz: Column[] = [
		{ id: 'name', label: t('tables.userStore.quiz.name'), minWidth: 170 },
		{ id: 'points', label: t('tables.userStore.quiz.points'), minWidth: 100 },
		{ id: 'created', label: t('tables.userStore.quiz.created'), minWidth: 100 },
		{ id: 'actions', label: t('tables.userStore.quiz.actions'), minWidth: 100 },
	];

	const columnsQuizAnswered: Column[] = [
		{ id: 'name', label: t('tables.userStore.quiz.name'), minWidth: 170 },
		{ id: 'points', label: t('tables.userStore.quiz.points'), minWidth: 100 },
		{ id: 'created', label: t('tables.userStore.quiz.created'), minWidth: 100 },
		{ id: 'answered', label: t('tables.userStore.quizAnswered.answered'), minWidth: 100 },
	];

	return {
		columnsQuiz,
		columnsQuizAnswered,
	};
};
