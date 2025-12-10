import { Card, Grid, Typography } from '@mui/material';
import React from 'react';

interface Props {
	title: string;
	value: number;
}

export const Cards: React.FC<Props> = ({ title, value }) => {
	return (
		<Grid item xs={1.8}>
			<Card sx={{ padding: '16px', height: '95px' }}>
				<Typography variant="body1" fontWeight={'bold'}>
					{title}
				</Typography>
				<Typography sx={{ marginTop: '4px' }}>{value}</Typography>
			</Card>
		</Grid>
	);
};
