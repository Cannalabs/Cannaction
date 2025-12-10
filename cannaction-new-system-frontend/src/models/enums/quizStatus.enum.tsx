import { Chip } from '@mui/material';
import i18n from '../../utils/i18n';

export const getTypeStatusQuizText = (type: boolean) => {
	switch (type) {
		case true:
			return i18n.t('enums.quizStatus.published');

		case false:
			return i18n.t('enums.quizStatus.unpublished');
	}
};

export const getStatusChipQuiz = (status: boolean) => {
	let background = '';
	switch (status) {
		case true:
			background = '#0D675E';
			break;
		case false:
			background = '#CE290C';
			break;
		default:
			background = '';
			break;
	}

	const label = getTypeStatusQuizText(status);

	return (
		<Chip
			label={label}
			sx={{ height: '25px', background: background, color: '#fff' }}
		/>
	);
};
