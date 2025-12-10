import { Chip } from '@mui/material';
import i18n from '../../utils/i18n';

export const getTargetStatusText = (status: boolean) => {
	switch (status) {
		case true:
			return i18n.t('enums.targetStatus.targetReached');
		case false:
			return i18n.t('enums.targetStatus.targetExpired');
	}
};

export const getTargetStatusChip = (status: boolean) => {
	let background = '';
	switch (status) {
		case false:
			background = '#F76400';
			break;
		case true:
			background = '#1B7F75';
			break;
		default:
			background = '';
			break;
	}

	const label = getTargetStatusText(status);

	return (
		<Chip
			label={label}
			sx={{ height: '25px', background: background, color: '#fff' }}
		/>
	);
};
