import { CircularProgress, Grid } from '@mui/material';
import React from 'react';

interface Props {
	width?: number;
	height?: string;
}

export const Loading: React.FC<Props> = ({ width, height }) => {
	return (
		<Grid
			container
			justifyContent={'center'}
			alignItems={'center'}
			height={height}
		>
			<CircularProgress size={width} />
		</Grid>
	);
};
