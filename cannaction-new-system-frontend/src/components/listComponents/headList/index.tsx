import { Grid } from '@mui/material';
import { useTheme } from '@mui/system';
import React, { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

export const HeadList: React.FC<Props> = ({ children }) => {
	const theme = useTheme();
	const borderColor = theme.palette.grey[50];

	const Container = {
		borderTop: `1px solid ${borderColor}`,
		borderBottom: `1px solid ${borderColor}`,
		justifyContent: 'space-around',
		alignItems: 'center',
		height: '50px',
	};

	return (
		<Grid container sx={Container}>
			{children}
		</Grid>
	);
};
