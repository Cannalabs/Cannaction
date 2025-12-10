import { Chip } from '@mui/material';
import i18n from '../../utils/i18n';
export enum InviteStatus {
	SENT = 'sent',
	ACCEPTED = 'accepted',
}

export const getInviteStatusText = (status: InviteStatus) => {
	switch (status) {
		case InviteStatus.SENT:
			return i18n.t('enums.inviteStatus.sent');
		case InviteStatus.ACCEPTED:
			return i18n.t('enums.inviteStatus.accepted');
	}
};

export const getInviteStatusChip = (status: InviteStatus) => {
	let className = '';
	switch (status) {
		case InviteStatus.SENT:
			className = 'bg-warning-soft text-warning';
			break;
		case InviteStatus.ACCEPTED:
			className = 'bg-green-soft text-primary';
			break;

		default:
			className = '';
			break;
	}

	const label = getInviteStatusText(status);

	return (
		<Chip
			label={label}
			sx={{ height: '25px', color: '#fff' }}
			className={className}
		/>
	);
};
