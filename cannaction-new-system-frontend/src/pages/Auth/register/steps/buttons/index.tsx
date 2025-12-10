import { Grid, Button, CircularProgress } from '@mui/material';
import React from 'react';
import { UserTypeEnum } from '../../../../../models/enums/userType.enum';
import FormikHook from '../../../../../models/interfaces/FormikHook';
import FormValues from '../../formValues';

interface ButtonsProps {
	step: number;
	formik: FormikHook<FormValues>;
	setStep: (step: number) => void;
}

export const Buttons: React.FC<ButtonsProps> = ({
	step,
	setStep,
	formik: { values, isSubmitting },
}) => {
	const handleNext = () => {
		setStep(step + 1);
	};

	const handleBack = () => {
		setStep(step - 1);
	};

	return (
		<Grid id="bottom-wizard" display="flex" justifyContent="flex-end">
			{step > 1 && (
				<Button
					variant="contained"
					sx={{
						textTransform: 'lowercase',
						backgroundColor: '#0D675E',
						width: '15%',
						marginRight: '0.5rem',
						fontWeight: 600,
					}}
					onClick={handleBack}
				>
					Prev
				</Button>
			)}
			{step < 2 && values.userType === UserTypeEnum.STORE && (
				<Button
					variant="contained"
					sx={{
						textTransform: 'capitalize',
						backgroundColor: '#0D675E',
						width: '15%',
						fontWeight: 600,
					}}
					onClick={handleNext}
				>
					Next
				</Button>
			)}
			{step === 2 && (
				<Button
					type="submit"
					variant="contained"
					sx={{
						textTransform: 'lowercase',
						backgroundColor: '#0D675E',
						fontWeight: 600,
						width: '15%',
					}}
				>
					Submit
				</Button>
			)}
			{values.userType === UserTypeEnum.CUSTOMER && (
				<>
					{isSubmitting ? (
						<CircularProgress />
					) : (
						<Button
							type="submit"
							variant="contained"
							sx={{
								textTransform: 'lowercase',
								backgroundColor: '#0D675E',
								fontWeight: 600,

								width: '15%',
							}}
						>
							Submit
						</Button>
					)}
				</>
			)}
		</Grid>
	);
};
