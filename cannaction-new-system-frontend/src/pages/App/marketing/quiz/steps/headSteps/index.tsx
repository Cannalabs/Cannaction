import { Grid, Stepper, Step, Typography } from '@mui/material';
import React from 'react';

interface Props {
	activeStep: number;
	steps: string[];
}

export const HeadSteps: React.FC<Props> = ({ activeStep, steps }) => {
	return (
		<Grid
			bgcolor={'#F8F8F9'}
			sx={{ borderTopLeftRadius: '6px', borderTopRightRadius: '6px' }}
			container
			justifyContent="space-between"
			p={2}
			gap={2}
			height={'150px'}
		>
			<Stepper
				connector={null}
				activeStep={activeStep}
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					width: '100%',
				}}
			>
				{steps.map((label, index) => {
					const stepProps: { completed?: boolean } = {};
					const isActiveStep = activeStep === index;

					return (
						<Step
							sx={{
								display: 'flex',
								alignItems: 'center',

								height: '104px',
								borderRadius: '6px',
								padding: '16px',
								width: 300,
								gap: 2,
								background: isActiveStep ? '#0D675E' : '',
							}}
							key={label}
							{...stepProps}
						>
							<Grid
								container
								alignItems="center"
								justifyContent="center"
								sx={{
									height: '40px',
									borderRadius: '6px',
									width: '40px',
									background: isActiveStep ? '#eaeaf0' : '#0D675E',
								}}
							>
								<Typography
									variant="h4"
									fontWeight="bold"
									sx={{
										color: isActiveStep ? '#0D675E' : '#eaeaf0',
									}}
								>
									{`${index + 1}`}
								</Typography>
							</Grid>
							<Typography
								variant="h5"
								fontWeight="bold"
								sx={{ color: isActiveStep ? '#eaeaf0' : '#0D675E' }}
							>
								{label}
							</Typography>
						</Step>
					);
				})}
			</Stepper>
		</Grid>
	);
};
