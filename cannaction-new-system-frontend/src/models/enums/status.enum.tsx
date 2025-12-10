import { Chip } from '@mui/material';
import i18n from '../../utils/i18n';

export const getTypeStatusText = (active: boolean) => {
	switch (active) {
		case true:
			return i18n.t('enums.status.active');
		case false:
			return i18n.t('enums.status.disabled');
	}
};

export const getStatusChip = (active: boolean) => {
	let background = '';
	let color = '';
	switch (active) {
		case true:
			background = 'rgba( 218, 239, 237, 1 )';
			color = '#00ac69';
			break;
		case false:
			background = '#f1e0e3';
			color = '#CE290C';
			break;
		default:
			background = '';
			break;
	}

	const label = getTypeStatusText(active);

	return (
		<Chip
			label={label}
			sx={{
				height: '20px',
				background: background,
				color: color,
				borderRadius: '5px',
				fontSize: '12px',
			}}
		/>
	);
};
