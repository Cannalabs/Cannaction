import { Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import { HeadSteps } from './headSteps';
import { BottomButtons } from './bottomButtons';
import { StepOne } from './stepOne';
import { StepTwo } from './stepTwo';
import { StepThree } from './stepThree';
import FormValues from '../form/formValues';
import { useFormik } from 'formik';
import FormikHook from '../../../../../models/interfaces/FormikHook';
import initialValues from '../form/initialValues';
import validationSchema from '../form/schema';

const steps = ['Basic Info', 'Questions', 'Review and Publish'];

export const Steps: React.FC = () => {
	const [activeStep, setActiveStep] = React.useState(0);
	const [skipped, setSkipped] = React.useState(new Set<number>());

	const isStepSkipped = (step: number) => {
		return skipped.has(step);
	};

	const handleNext = () => {
		let newSkipped = skipped;
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values());
			newSkipped.delete(activeStep);
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped(newSkipped);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const onSubmit = async (values: FormValues) => {};

	const formik: FormikHook<FormValues> = useFormik<FormValues>({
		initialValues,
		validationSchema,
		onSubmit,
	});

	const renderStepContent = (stepIndex: number) => {
		switch (stepIndex) {
			case 0:
				return <StepOne formik={formik} />;
			case 1:
				return <StepTwo formik={formik} />;
			case 2:
				return <StepThree />;
			default:
				return <Typography>Step {stepIndex + 1}</Typography>;
		}
	};

	return (
		<Grid
			container
			justifyContent="space-between"
			bgcolor={'#FFFFFF'}
			borderRadius={'8px'}
			boxShadow="0.15rem 0 1.75rem 0 rgba(33, 40, 50, 0.15)"
		>
			<HeadSteps activeStep={activeStep} steps={steps} />

			<Grid container width={'100%'} justifyContent={'center'}>
				<Grid
					container
					p={2}
					direction={'column'}
					justifyContent={'center'}
					alignItems={'center'}
					gap={2}
					width={'70%'}
				>
					{renderStepContent(activeStep)}
					<Divider sx={{ width: '60%' }} />

					<BottomButtons
						activeStep={activeStep}
						handleNext={handleNext}
						handleBack={handleBack}
						steps={steps}
					/>
				</Grid>
			</Grid>
		</Grid>
	);
};
