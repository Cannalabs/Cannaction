import { Chip } from '@mui/material';
import i18n from '../../utils/i18n';

export const getSituationTypeText = (situation: boolean) => {
	switch (situation) {
		case true:
			return i18n.t('enums.situation.accepted');

		case false:
			return i18n.t('enums.situation.rejected');
	}
};

export const getSituationChip = (situation: boolean) => {
	let background = '';
	switch (situation) {
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

	const label = getSituationTypeText(situation);

	return (
		<Chip
			label={label}
			sx={{ height: '25px', background: background, color: '#fff' }}
		/>
	);
};
