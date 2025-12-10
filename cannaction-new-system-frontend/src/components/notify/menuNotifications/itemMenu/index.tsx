import { Avatar, Grid, MenuItem, Typography } from '@mui/material';
import React from 'react';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

interface Props {
	handleClose: () => void;
	date: string;
	title: string;
	viewed: boolean;
}

const styledTitle = {
	overflow: 'hidden',
	textOverflow: 'ellipsis',
};

export const ItemMenu: React.FC<Props> = ({
	handleClose,
	date,
	title,
	viewed,
}) => {
	return (
		<MenuItem
			onClick={handleClose}
			disableRipple
			sx={{ height: 70, borderBottom: '1px solid lightGray' }}
		>
			<Grid container flexWrap={'nowrap'} alignItems="center" gap={2}>
				<Avatar sx={{ bgcolor: viewed ? '#C5CCD6' : 'red' }}>
					<NotificationsNoneOutlinedIcon sx={{ fill: '#fff' }} />
				</Avatar>

				<Grid container direction={'column'}>
					<Typography color="#a7aeb8">{date}</Typography>
					<Typography letterSpacing={0.4} variant="h5" sx={styledTitle}>
						{title}
					</Typography>
				</Grid>
			</Grid>
		</MenuItem>
	);
};
