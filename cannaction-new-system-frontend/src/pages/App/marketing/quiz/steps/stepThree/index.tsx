import { Grid, TextField, Typography } from '@mui/material';
import React from 'react';

export const StepThree: React.FC = () => {
	return (
		<Grid
			width={'60%'}
			container
			alignItems={'center'}
			justifyItems={'center'}
			justifyContent="center"
			p={2}
			gap={2}
		>
			<Grid
				container
				justifyContent={'center'}
				alignContent={'flex-start'}
				direction={'column'}
			>
				<Typography variant="h4" color={'grey'} fontWeight="bold">
					Step 3
				</Typography>
				<Typography variant="h5">
					Review the following information and Publish
				</Typography>
			</Grid>
			<Grid container justifyContent={'space-between'}>
				<Grid item xs={3}>
					<Typography variant="body1" color={'grey'}>
						Question: 1
					</Typography>
				</Grid>
				<Grid item xs={5}>
					<Typography variant="body1" color={'grey'}>
						Simple Text
					</Typography>
				</Grid>
			</Grid>
			<Grid container justifyContent={'space-between'}>
				<Grid item xs={3}>
					<Typography variant="body1" color={'grey'}>
						Question: 2
					</Typography>
				</Grid>
				<Grid item xs={5}>
					<Typography variant="body1" color={'grey'}>
						Simple Text
					</Typography>
				</Grid>
			</Grid>
		</Grid>
	);
};
