import { Chip } from '@mui/material';
import i18n from '../../utils/i18n';

export const getShopStatusText = (status?: boolean) => {
	switch (status) {
		case true:
			return i18n.t('enums.shopStatus.accepted');
		case undefined:
		case null:
			return i18n.t('enums.shopStatus.waiting');
		case false:
			return i18n.t('enums.shopStatus.refused');
	}
};

export const getShopStatusChip = (status?: boolean) => {
	let className = '';
	switch (status) {
		case true:
			className = ' text-primary bg-green-soft';
			break;
		case undefined:
		case null:
			className = ' text-warning bg-yellow-soft';
			break;
		case false:
			className = ' text-danger bg-red-soft';
			break;

		default:
			className = '';
			break;
	}

	const label = getShopStatusText(status);

	return (
		<Chip
			label={label}
			sx={{ height: '25px', color: '#fff' }}
			className={className}
		/>
	);
};
