import * as React from 'react';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { IconButton } from '@mui/material';
import { MenuNotifications } from './menuNotifications';

export const Notify: React.FC = () => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Stack spacing={4} direction="row" sx={{ color: 'action.active' }}>
			<IconButton onClick={handleClick}>
				<Badge color="error" badgeContent={3}>
					<NotificationsNoneOutlinedIcon />
				</Badge>
			</IconButton>
			<MenuNotifications
				anchorEl={anchorEl}
				open={open}
				handleClose={handleClose}
			/>
		</Stack>
	);
};
