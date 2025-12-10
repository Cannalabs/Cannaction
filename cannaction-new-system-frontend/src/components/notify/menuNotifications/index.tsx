import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Grid, Typography } from '@mui/material';
import { ItemMenu } from './itemMenu';

const StyledMenu = styled((props: MenuProps) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'right',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'right',
		}}
		{...props}
	/>
))(({ theme }) => ({
	'& .MuiPaper-root': {
		borderRadius: 6,
		marginTop: theme.spacing(1),
		minWidth: 300,
		color:
			theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
		boxShadow:
			'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
		'& .MuiMenu-list': {
			padding: '0 0',
		},
		'& .MuiMenuItem-root': {
			'& .MuiSvgIcon-root': {
				fontSize: 18,
				color: theme.palette.text.secondary,
			},
			'&:active': {
				backgroundColor: alpha(
					theme.palette.primary.main,
					theme.palette.action.selectedOpacity
				),
			},
			'&:hover': {
				backgroundColor: '#F2F6FC',
			},
		},
	},
}));

interface Props {
	open: boolean;
	anchorEl: HTMLElement | null;
	handleClose: () => void;
}

const notifications = [
	{ date: 'April 29, 2024', title: 'Text Notification', viewed: false },
	{ date: 'April 29, 2024', title: 'Text Notification', viewed: true },
	{ date: 'April 29, 2024', title: 'Text Notification', viewed: false },
	{ date: 'April 29, 2024', title: 'Text Notification', viewed: false },
	{ date: 'April 29, 2024', title: 'Text Notification', viewed: false },
];

export const MenuNotifications: React.FC<Props> = ({
	open,
	anchorEl,
	handleClose,
}) => {
	return (
		<div>
			<StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
				<Grid
					marginLeft={2.5}
					width={'55%'}
					justifyContent={'space-between'}
					container
					alignContent={'center'}
					alignItems={'center'}
					height={55}
				>
					<NotificationsNoneOutlinedIcon fontSize="small" color="primary" />
					<Typography color="primary" fontWeight={'bold'}>
						Notifications center
					</Typography>
				</Grid>
				<Divider orientation="horizontal" />
				{notifications.map((notify) => (
					<ItemMenu
						date={notify.date}
						title={notify.title}
						viewed={notify.viewed}
						handleClose={handleClose}
					/>
				))}

				<MenuItem
					onClick={handleClose}
					disableRipple
					sx={{ height: '60px', alignItems: 'center' }}
				>
					<Grid
						container
						flexWrap={'nowrap'}
						alignItems="center"
						gap={2}
						justifyContent={'center'}
					>
						<Typography color="#a7aeb8">View All Notifications</Typography>
					</Grid>
				</MenuItem>
			</StyledMenu>
		</div>
	);
};
