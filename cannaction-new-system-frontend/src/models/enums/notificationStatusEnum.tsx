import { Chip } from '@mui/material';
import i18n from '../../utils/i18n';
export enum NotificationStatusEnum {
	ACTIVATED = 'activated',
	DISABLED = 'disabled',
}

export const getNotificationStatusText = (type: NotificationStatusEnum) => {
	switch (type) {
		case NotificationStatusEnum.ACTIVATED:
			return i18n.t('enums.notificationStatus.activated');

		case NotificationStatusEnum.DISABLED:
			return i18n.t('enums.notificationStatus.disabled');
	}
};

export const getNotificationStatusChip = (status: NotificationStatusEnum) => {
	let background = '';
	let color = '';

	switch (status) {
		case NotificationStatusEnum.ACTIVATED:
			background = 'rgba( 218, 239, 237, 1 )';
			color = '#00ac69';
			break;
		case NotificationStatusEnum.DISABLED:
			background = '#E0E5EC';
			color = 'black';
			break;
		default:
			background = '';
			color = '';
			break;
	}

	const label = getNotificationStatusText(status);

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
