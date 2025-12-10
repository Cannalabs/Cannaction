import { Grid, Switch, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

interface Props {
	title: string;
	hasSwitcher?: boolean;
	children: ReactNode;
	height?: string;
}

export const Target: React.FC<Props> = ({
	title,
	hasSwitcher,
	children,
	height = '350px',
}) => {
	return (
		<Grid
			container
			justifyContent="space-between"
			flexWrap={'nowrap'}
			direction={'column'}
			bgcolor={'#FFFFFF'}
			borderRadius={'8px'}
			boxShadow="0.15rem 0 1.75rem 0 rgba(33, 40, 50, 0.15)"
			xs={3.8}
			height={height}
			mt={2}
		>
			<Grid
				bgcolor={'#F8F8F9'}
				sx={{ borderTopLeftRadius: '6px', borderTopRightRadius: '6px' }}
				container
				justifyContent="space-between"
				alignItems="center"
				p={2}
				height={'60px'}
				borderBottom={'1px solid lightgray'}
			>
				<Typography color="primary" variant="h4">
					{title}
				</Typography>
				{hasSwitcher && <Switch />}
			</Grid>

			<Grid
				container
				alignItems="center"
				justifyContent={'center'}
				p={2}
				height={height}
			>
				{children}
			</Grid>
		</Grid>
	);
};
