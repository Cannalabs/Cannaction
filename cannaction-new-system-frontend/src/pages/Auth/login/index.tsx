import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
	Box,
	Button,
	CircularProgress,
	Grid,
	Link as MuiLink,
	Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import './Login.styles.css';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../contexts/Auth';
import FormValues from './formValues';
import initialValues from './initialValues';
import validationSchema from './schema';
import { InputLogin } from '../components/inputLogin';
import InputPassword from '../../../components/passwordInput';
import { useSnackbar } from '../../../contexts/Snackbar';

const Login: React.FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { t } = useTranslation();
	const { openSnackbar } = useSnackbar();

	const { login } = useAuth();

	const onSubmit = async ({ emailOrNickname, password }: FormValues) => {
		try {
			setIsLoading(true);
			await login({
				emailOrNickname,
				password,
			});
		} catch (e: unknown) {
			openSnackbar(e, 'error');
		} finally {
			setIsLoading(false);
		}
	};

	const { handleSubmit, handleChange, values, errors, touched, isValid, dirty, setFieldValue } =
		useFormik<FormValues>({
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
							display="flex"
							variant="h4"
							fontWeight="normal"
							color="#4f4f4f"
							fontSize="calc(1.275rem + 0.3vw)"
						>
							{t('login.welcome')}
							<Typography
								ml="0.3rem"
								variant="h4"
								fontWeight="bold"
								color="#4f4f4f"
								fontSize="calc(1.275rem + 0.3vw)"
							>
								Cannaction Club
							</Typography>
						</Typography>
					</Box>
					<Typography
						textAlign="center"
						variant="body2"
						color="textSecondary"
						mb={0}
					>
						{t('login.signIn')}
					</Typography>
				</Box>

				<form method="" action="" onSubmit={handleSubmit} autoComplete="off">
					<InputLogin
						label="E-mail / Nickname"
						name="emailOrNickname"
						isLogin
						placeholder={t('login.emailNickname')}
						value={values.emailOrNickname}
						error={touched.emailOrNickname && Boolean(errors.emailOrNickname)}
						helperText={touched.emailOrNickname && errors.emailOrNickname}
						onChange={handleChange}
						setFieldValue={setFieldValue}
					/>

					<Typography
						mt="0.1rem"
						fontSize="0.8rem"
						style={{ color: 'rgba(79, 79, 79, 0.75)' }}
					>
						{t('login.shareEmail')}
					</Typography>

					<Box mt={2}>
						<InputPassword
							name="password"
							id="password-test"
							value={values.password}
							onChange={handleChange}
							error={touched.password && Boolean(errors.password)}
							helperText={touched.password && errors.password}
							placeholder={t('login.password')}
						/>
					</Box>
					<Box mt="1rem" pl="0.1rem">
						<MuiLink
							component={Link}
							to="/forgot-password"
							fontSize="0.875rem"
							sx={{
								textDecoration: 'none',
								'&:focus': {
									textDecoration: 'underline',
								},
							}}
						>
							{t('login.forgotPassword')}
						</MuiLink>
					</Box>

					<Box mt={3}>
						<Button
							type="submit"
							disabled={!(isValid && dirty)}
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
							{isLoading ? (
								<CircularProgress size={24} color="inherit" />
							) : (
								t('general.submit')
							)}
						</Button>
					</Box>
				</form>
				<Box
					sx={{
						width: '100%',
						height: '2px',
						backgroundColor: '#ededed',
						my: 2,
					}}
				/>

				<Box mt="0.2rem" pl="0.1rem" textAlign="center">
					<Typography fontSize="1rem" color="textSecondary" sx={{ mb: 1 }}>
						{t('login.noAccount')}{' '}
						<MuiLink
							component={Link}
							to="/register"
							color="#14a44d"
							fontWeight="bold"
							sx={{
								textDecoration: 'none',
								'&:focus': {
									textDecoration: 'underline',
								},
							}}
						>
							{t('login.register')}
						</MuiLink>
					</Typography>
				</Box>
			</Box>
		</Grid>
	);
};

export default Login;
