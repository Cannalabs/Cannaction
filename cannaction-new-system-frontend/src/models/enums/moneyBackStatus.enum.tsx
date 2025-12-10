import { Chip } from '@mui/material';
import i18n from '../../utils/i18n';

export const getMoneyBackStatusText = (status: boolean) => {
	switch (status) {
		case false:
			return i18n.t('enums.moneyBackStatus.targetDisabled');
		case true:
			return i18n.t('enums.moneyBackStatus.targetInProgress');
	}
};

export const getMoneyBackStatusChip = (status: boolean) => {
	let background = '';
	switch (status) {
		case true:
			background = '#F4A100';
			break;
		case false:
			background = '#CE290C';
			break;
		default:
			background = '';
			break;
	}

	const label = getMoneyBackStatusText(status);

	return (
		<Chip
			label={label}
			sx={{ height: '25px', background: background, color: '#fff' }}
		/>
	);
};
