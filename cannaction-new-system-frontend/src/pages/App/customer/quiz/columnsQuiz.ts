import { Column } from '../../../../components/tableDinamic';

export const columnsQuiz: Column[] = [
	{ id: 'name', label: 'Name', minWidth: 170 },
	{ id: 'points', label: 'Points', minWidth: 100 },
	{ id: 'created', label: 'Created', minWidth: 100 },
	{ id: 'actions', label: 'Actions', minWidth: 100 },
];
export const columnsQuizAnswered: Column[] = [
	{ id: 'name', label: 'Name', minWidth: 170 },
	{ id: 'points', label: 'Points', minWidth: 100 },
	{ id: 'created', label: 'Created', minWidth: 100 },
	{ id: 'answered', label: 'Answered', minWidth: 100 },
];
