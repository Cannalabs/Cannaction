import { Stack, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

export const HeadText: React.FC<Props> = ({ children }) => {
	const StyledStack = {
		display: 'flex',
		alignItems: 'center',
	};

	return (
		<Stack sx={StyledStack}>
			<Typography fontWeight="700" lineHeight="20px">
				{children}
			</Typography>
		</Stack>
	);
};
