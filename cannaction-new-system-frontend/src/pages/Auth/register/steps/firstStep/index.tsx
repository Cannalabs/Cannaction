import {
	Box,
	Checkbox,
	FormControlLabel,
	Grid,
	Typography,
} from '@mui/material';
import React from 'react';
import { SelectLogin } from '../../../components/selectLogin';
import FormikHook from '../../../../../models/interfaces/FormikHook';
import FormValues from '../../formValues';
import { InputLogin } from '../../../components/inputLogin';
import { LanguageEntity } from '../../../../../models/entities/LanguageEntity';
import { StoreEntity } from '../../../../../models/entities/StoreEntity';
import CountryEntity from '../../../../../models/entities/CountryEntity';
import InputPassword from '../../../../../components/passwordInput';
import { HeadStep } from '../headStep';
import { useTheme } from '@mui/system';
import { Link } from 'react-router-dom';
import { Modal } from '../../../../../components/Modal';
import { TermsConditions } from '../../../termsConditions';
import { PrivacyPolicy } from '../../../privacyPolicy';
import { useTranslation } from 'react-i18next';

interface FirstStepProps {
	formik: FormikHook<FormValues>;
	step: number;
	languageList: LanguageEntity[];
	storeList: StoreEntity[];
	countryList: CountryEntity[];
}

export const FirstStep: React.FC<FirstStepProps> = ({
	step,
	languageList,
	storeList,
	countryList,
	formik: { handleChange, setFieldValue, values, errors, touched },
}) => {
	const theme = useTheme();
	const error = theme.palette.error[300];
	const { t } = useTranslation();

	const [termsOpen, setTermsOpen] = React.useState(false);
	const [privacyOpen, setPrivacyOpen] = React.useState(false);

	const handleTerms = () => {
		setTermsOpen(true);
	};

	const handlePrivacyPolicy = () => {
		setPrivacyOpen(true);
	};

	return (
		<>
			<Modal open={termsOpen} onClose={() => setTermsOpen(false)}>
				<TermsConditions />
			</Modal>

			<Modal open={privacyOpen} onClose={() => setPrivacyOpen(false)}>
				<PrivacyPolicy />
			</Modal>

			{step === 1 && (
				<Grid>
					<HeadStep step="1/2" info="Please fill with your details" />
					<Grid
						mt={2}
						display="flex"
						alignItems="center"
						justifyContent="center"
						gap={2}
					>
						{/*	<FormControl fullWidth>
					 		<InputLabel style={{ fontSize: '0.8rem' }}>Member</InputLabel>
					 		<Select
					 			labelId="member-label"
					 			id="member"
					 			size="small"
					 			label="Member"
					 			value={values.userType || UserTypeEnum.CUSTOMER}
					 			name="userType"
					 			onChange={(e) => {
					 				const value = e.target.value as string;
					 				setFieldValue(
					 					'userType',
					 					value === '' ? null : (value as UserTypeEnum)
					 				);
					 			}}
					 		>
					 			<MenuItem style={{ fontSize: '0.8rem' }} value={UserTypeEnum.CUSTOMER}>
					 				Customer
					 			</MenuItem>
					 			<MenuItem style={{ fontSize: '0.8rem' }} value={UserTypeEnum.STORE}>
					 				Store
					 			</MenuItem>
					 		</Select>
					 	</FormControl> */}
						<SelectLogin
							labelId="languageId"
							inputLabel="Language"
							id="languageId"
							label="Language"
							value={values.languageId || ''}
							placeholder="Language"
							name="languageId"
							onChange={(e) => {
								const value = e.target.value as string;
								setFieldValue('languageId', value === '' ? null : (value as string));
							}}
							helperText={touched.languageId && errors.languageId}
							error={touched.languageId && Boolean(errors.languageId)}
							valueList={languageList}
						/>
					</Grid>

					<Grid
						display="flex"
						alignItems="center"
						justifyContent="center"
						gap={2}
						mt={1}
					>
						<InputLogin
							name="name"
							placeholder="First name"
							label="First name"
							value={values.name}
							error={touched.name && Boolean(errors.name)}
							helperText={touched.name && errors.name}
							onChange={handleChange}
						/>
						<InputLogin
							id="lastName"
							name="lastName"
							onChange={handleChange}
							error={touched.lastName && Boolean(errors.lastName)}
							helperText={touched.lastName && errors.lastName}
							value={values.lastName}
							placeholder="Last name"
							label="Last name"
						/>
					</Grid>

					<Grid
						display="flex"
						alignItems="center"
						justifyContent="center"
						gap={2}
						mt={1}
					>
						<InputLogin
							id="nickName"
							name="nickname"
							onChange={handleChange}
							error={touched.nickname && Boolean(errors.nickname)}
							helperText={touched.nickname && errors.nickname}
							placeholder={t('marketing.addUser.nicknameInput')}
							label={t('marketing.addUser.nicknameInput')}
							value={values.nickname}
						/>

						<SelectLogin
							inputLabel="Country"
							label="Country"
							labelId="countrySelect"
							id="country"
							value={values.countryId || ''}
							placeholder="Country"
							valueList={countryList}
							name="countryId"
							onChange={(e) => {
								const value = e.target.value as string;
								setFieldValue('countryId', value === '' ? null : (value as string));
							}}
						/>
					</Grid>

					<Grid
						display="flex"
						alignItems="center"
						justifyContent="center"
						sx={{ marginBottom: '0.1rem' }}
						gap={2}
						mt={1}
					>
						<InputLogin
							placeholder="Email"
							label="Email"
							id="yourEmail"
							name="email"
							onChange={handleChange}
							value={values.email}
							error={touched.email && Boolean(errors.email)}
							helperText={touched.email && errors.email}
						/>

						{values.userType === 'customer' && (
							<SelectLogin
								inputLabel="Store"
								label="Store"
								labelId="Store"
								id="store"
								value={values.storeId || ''}
								valueList={storeList}
								name="storeId"
								onChange={(e) => {
									const value = e.target.value as string;
									setFieldValue('storeId', value === '' ? null : (value as string));
								}}
							/>
						)}
					</Grid>

					<Grid
						display="flex"
						alignItems="center"
						justifyContent="center"
						gap={2}
						mt={1}
					>
						<InputPassword
							name="password"
							id="password-test"
							value={values.password}
							onChange={handleChange}
							error={touched.password && Boolean(errors.password)}
							helperText={touched.password && errors.password}
							placeholder="Password"
							label="Password"
						/>

						<InputPassword
							name="confirmPassword"
							id="confirmPassword-test"
							value={values.confirmPassword}
							onChange={handleChange}
							error={touched.confirmPassword && Boolean(errors.confirmPassword)}
							helperText={touched.confirmPassword && errors.confirmPassword}
							placeholder="Confirm Password"
							label="Confirm Password"
						/>
					</Grid>

					<Grid>
						<FormControlLabel
							control={
								<Checkbox
									name="terms"
									value={values.terms}
									checked={values.terms}
									onChange={handleChange}
									sx={{
										color: touched.terms && errors.terms ? error : '#d2d8dd',

										'& .MuiSvgIcon-root': {
											fontSize: 26,
										},
										'&.Mui-checked': {
											color: '#0D675E',
										},
									}}
								/>
							}
							label={
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										gap: 0.5,
									}}
								>
									<Typography fontSize=".875rem">Please accept our</Typography>
									<Box sx={{ fontSize: { xs: '.875rem', sm: '.875rem' } }}>
										<Link
											onClick={handleTerms}
											style={{
												textDecoration: 'none',
												cursor: 'pointer',
												'&:hover': {
													textDecoration: 'underline',
												},
											}}
										>
											Terms and conditions
										</Link>
									</Box>
								</Box>
							}
						/>
						{touched.terms && errors.terms ? (
							<Typography variant="body2" color="error">
								{errors.terms}
							</Typography>
						) : null}
					</Grid>

					<Grid>
						<FormControlLabel
							control={
								<Checkbox
									name="privacy"
									value={values.privacy}
									checked={values.privacy}
									onChange={handleChange}
									sx={{
										color: touched.privacy && errors.privacy ? error : '#d2d8dd',
										'& .MuiSvgIcon-root': {
											fontSize: 26,
										},
										'&.Mui-checked': {
											color: '#0D675E',
										},
									}}
								/>
							}
							label={
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										gap: 0.5,
									}}
								>
									<Typography fontSize=".875rem">Please accept our</Typography>
									<Box sx={{ fontSize: { xs: '.875rem', sm: '.875rem' } }}>
										<Link
											onClick={handlePrivacyPolicy}
											style={{
												textDecoration: 'none',
												cursor: 'pointer',
												'&:hover': {
													textDecoration: 'underline',
												},
											}}
										>
											Privacy Policy
										</Link>
									</Box>
								</Box>
							}
						/>
						{touched.privacy && errors.privacy ? (
							<Typography variant="body2" color="error">
								{errors.privacy}
							</Typography>
						) : null}
					</Grid>
				</Grid>
			)}
		</>
	);
};
