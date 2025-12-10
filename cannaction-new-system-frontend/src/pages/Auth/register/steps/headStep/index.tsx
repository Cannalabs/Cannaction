import { Grid, IconButton, Typography } from '@mui/material';
import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';

interface HeadStepProps {
	step: string;
	info: string;
}

export const HeadStep: React.FC<HeadStepProps> = ({ step, info }) => {
	const navigate = useNavigate();

	const handleBack = () => {
		navigate(-1);
	};

	return (
		<Grid container gap={2} alignItems="center">
			<IconButton title="Back to login" onClick={handleBack}>
				<ArrowBackIosIcon />
			</IconButton>
			<Typography variant="h5" color="#999" fontSize="1.125rem" fontWeight="bold">
				{step}
			</Typography>

			<Typography variant="h5" color="#4f4f4f" fontSize="1.125rem">
				{info}
			</Typography>
		</Grid>
	);
};
