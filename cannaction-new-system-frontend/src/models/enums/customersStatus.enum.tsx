import { Chip } from '@mui/material';
import i18n from '../../utils/i18n';

export enum CustomersStatusEnum {
	ACTIVATED = 'activated',
	DISABLED = 'disabled',
}

export const getTypeStatusPointsText = (type: CustomersStatusEnum) => {
	switch (type) {
		case CustomersStatusEnum.ACTIVATED:
			return i18n.t('enums.customersStatus.activated');

		case CustomersStatusEnum.DISABLED:
			return i18n.t('enums.customersStatus.disabled');
	}
};

export const getStatusChipCustomers = (status: CustomersStatusEnum) => {
	let background = '';
	const color = '#fff';

	switch (status) {
		case CustomersStatusEnum.ACTIVATED:
			background = '#1B7F75';
			break;
		case CustomersStatusEnum.DISABLED:
			background = '#E81500';
			break;
	}

	const label = getTypeStatusPointsText(status);

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
