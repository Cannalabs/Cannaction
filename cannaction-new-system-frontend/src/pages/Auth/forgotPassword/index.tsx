// src/pages/Auth/forgotPassword/ForgotPassword.tsx

import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Button, Grid, Link, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import { FormValues } from './formValues';
import { useFormik } from 'formik';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { InputLogin } from '../components/inputLogin';
import AuthService from '../../../services/AuthService';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from '../../../contexts/Snackbar';

const ForgotPassword: React.FC = () => {
	const theme = useTheme();
	const { t } = useTranslation();
	const navigate = useNavigate();

	const { openSnackbar } = useSnackbar();

	const fontColor = theme.palette.grey[800];
	const linkColor = theme.palette.primary[900];

	const onSubmit = async (values: FormValues) => {
		try {
			await AuthService.forgotPassword(values);
			openSnackbar(t('login.passwordMailSent'), 'success');
			navigate('/login');
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (e: unknown) {
			openSnackbar(e, 'error');
		}
	};

	const { handleSubmit, handleChange, values } = useFormik<FormValues>({
		initialValues,
		validationSchema,
		onSubmit,
	});

	return (
		<Grid
			item
			xs={12}
			md={6}
			sx={{ marginTop: { xs: '1rem', md: 0 } }}
			display="flex"
			justifyContent="center"
			alignItems="center"
			flexDirection="column"
		>
			<Box width={{ md: '70%', xs: '80%' }}>
				<Box
					display="flex"
					alignItems="center"
					flexDirection="column"
					mb={3}
					pb={3}
				>
					<Box mb="0.5rem">
						<Typography
							ml="0.3rem"
							variant="h4"
							fontWeight="bold"
							color={fontColor}
							fontSize="1.2rem"
						>
							Recover your access
						</Typography>
					</Box>
					<Typography
						textAlign="center"
						variant="body2"
						color={fontColor}
						fontSize="0.8rem"
					>
						Correctly fill in the requested fields!
					</Typography>
				</Box>

				<form method="" action="" onSubmit={handleSubmit} autoComplete="off">
					<Box mt={2}>
						<InputLogin
							id="email"
							onChange={handleChange}
							name="email"
							placeholder="Email"
							type="email"
						/>
					</Box>

					<Box mt={3}>
						<Button
							onClick={() => onSubmit(values)}
							disabled={!values.email}
							sx={{
								textTransform: 'capitalize',
								width: '100%',
								fontSize: '.875rem',
								fontWeight: '600',
								'&:hover': {
									backgroundColor: 'rgba(13, 103, 94, 0.7)',
								},
							}}
							color="primary"
							variant="contained"
						>
							{t('general.submit')}
						</Button>
					</Box>
				</form>

				<Box mt="0.2rem" pl="0.1rem">
					<Typography fontSize="0.8rem" color="textSecondary">
						Back to
						<Link
							component={RouterLink}
							to="/login"
							color={linkColor}
							fontWeight="bold"
							sx={{ marginLeft: '0.2rem', marginRight: '0.2rem' }}
						>
							Sign in
						</Link>
						or
						<Link
							component={RouterLink}
							to="/register"
							color={linkColor}
							fontWeight="bold"
							sx={{ marginLeft: '0.2rem' }}
						>
							Register
						</Link>
					</Typography>
				</Box>
			</Box>
		</Grid>
	);
};

export default ForgotPassword;
