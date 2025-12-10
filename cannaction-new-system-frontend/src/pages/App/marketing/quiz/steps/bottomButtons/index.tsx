import { Box, Button, Grid } from '@mui/material';
import React from 'react';

interface Props {
	activeStep: number;
	steps: string[];
	handleBack: () => void;
	handleNext: () => void;
}

export const BottomButtons: React.FC<Props> = ({
	activeStep,
	steps,
	handleBack,
	handleNext,
}) => {
	return (
		<Grid width={'65%'} justifyContent={'flex-end'} container p={2}>
			{activeStep !== 0 && (
				<Button
					variant="contained"
					disabled={activeStep === 0}
					onClick={handleBack}
					sx={{ mr: 1 }}
				>
					Previous
				</Button>
			)}

			<Button onClick={handleNext} variant="contained">
				{activeStep === steps.length - 1 ? 'Publish' : 'Next'}
			</Button>
		</Grid>
	);
};
