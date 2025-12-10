import { Chip } from '@mui/material';
import i18n from '../../utils/i18n';

export const getNewsletterStatusText = (type: boolean) => {
	switch (type) {
		case true:
			return i18n.t('enums.newsletterStatus.send');

		case false:
			return i18n.t('enums.newsletterStatus.draft');
	}
};

export const getNewsletterStatusChip = (status: boolean) => {
	let background = '';
	let color = '';

	switch (status) {
		case true:
			background = 'rgba( 218, 239, 237, 1 )';
			color = '#00ac69';
			break;
		case false:
			background = '#E0E5EC';
			color = 'black';
			break;
		default:
			background = '';
			color = '';
			break;
	}

	const label = getNewsletterStatusText(status);

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
