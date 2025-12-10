import { Grid, IconButton, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';
import { BsInfoCircle } from '../../../themes/icons';

interface Props {
	title: string;
}

export const ThumbContainer: React.FC<Props> = ({ title }) => {
	return (
		<Grid
			container
			justifyContent="space-between"
			bgcolor={'#FFFFFF'}
			borderRadius={'8px'}
			boxShadow="0.15rem 0 1.75rem 0 rgba(33, 40, 50, 0.15)"
			spacing={{ xs: 2, md: 3 }}
			columns={{ xs: 4, sm: 8, md: 12 }}
			xs={4}
			height={400}
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
				<Tooltip
					placement="top"
					title="Select image upload only images with .jpg, .jpeg, .png and gif extension and size less than 150kb, max width: 1024px, and max height: 768px"
				>
					<IconButton>
						<BsInfoCircle size={16} />
					</IconButton>
				</Tooltip>
			</Grid>
		</Grid>
	);
};
