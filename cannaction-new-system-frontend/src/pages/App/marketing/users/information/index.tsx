import {
	Autocomplete,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	Switch,
	TextField,
	Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import FormValues from '../form/formValues';
import FormikHook from '../../../../../models/interfaces/FormikHook';
import {
	UserTypeEnum,
	getUserTypeText,
} from '../../../../../models/enums/userType.enum';
import { useAuth } from '../../../../../contexts/Auth';
import { useCountriesLabeled } from '../../../../../hooks/querys/country/useCountryLabeled';
import { useStoreLabeledByCountry } from '../../../../../hooks/querys/store/useStoreLabeledByCountry';
import { StyledPatterInput } from '../../../../../components/customSelect/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { usePasswordValidator } from '../../../../../utils/string';

interface Props {
	formik: FormikHook<FormValues>;
	isDetails: boolean;
	points?: number;
}

export const Information: React.FC<Props> = ({
	formik: { handleChange, setFieldValue, values },
	isDetails,
}) => {
	const { userTypeLogged, userCountry } = useAuth();
	const {
		stores: data,
		isLoading,
		refetch,
	} = useStoreLabeledByCountry(
		userTypeLogged === UserTypeEnum.SUPER ? values.countryId : userCountry
	);
	const { countries, isLoading: isLoadingCountries } = useCountriesLabeled();
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const { t } = useTranslation();
	const { validatePasswordStrenght, validateEmail } = usePasswordValidator();

	const handleMouseDownPassword = (event: React.MouseEvent) => {
		event.preventDefault();
	};

	const handlePassword = () => {
		setShowPassword(!showPassword);
	};

	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values.countryId]);

	useEffect(() => {
		if (userTypeLogged === UserTypeEnum.MARKETING && userTypeLogged && userCountry) {
			setFieldValue('countryId', userCountry);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userTypeLogged, userCountry, setFieldValue]);

	return (
		<div className="col-lg-8">
			<div className="card mb-4">
				<div className="card-header">{t('marketing.addUser.userInformation')}</div>
				<div className="card-body">
					<div className="row">
						<div className="col-md-6 mb-3">
							<TextField
								fullWidth
								disabled={isDetails}
								placeholder={t('marketing.addUser.firstNameInput')}
								label={t('marketing.addUser.firstNameInput')}
								value={values.name}
								onChange={handleChange}
								name="name"
							/>
						</div>
						<div className="col-md-6 mb-3">
							<TextField
								fullWidth
								placeholder={t('marketing.addUser.lastName')}
								label={t('marketing.addUser.lastName')}
								disabled={isDetails}
								value={values.lastName}
								onChange={handleChange}
								name="lastName"
							/>
						</div>
						<div className="col-md-6 mb-3">
							<TextField
								fullWidth
								placeholder={t('marketing.addUser.nicknameInput')}
								label={t('marketing.addUser.nicknameInput')}
								value={values.nickname}
								disabled={isDetails}
								onChange={handleChange}
								name="nickname"
							/>
						</div>
						<div className="col-md-6 mb-3">
							<FormControl fullWidth>
								<InputLabel id="role">
									{t('marketing.addUser.userTypeDropdown')}
								</InputLabel>
								<Select
									labelId="role"
									label={t('marketing.addUser.userTypeDropdown')}
									placeholder={t('marketing.addUser.userTypeDropdown')}
									id="role"
									disabled={isDetails}
									name="role"
									value={values.role}
									onChange={(e) => setFieldValue('role', e.target.value)}
								>
									<MenuItem value={UserTypeEnum.CUSTOMER}>
										{getUserTypeText(UserTypeEnum.CUSTOMER)}
									</MenuItem>
									<MenuItem value={UserTypeEnum.STORE}>
										{getUserTypeText(UserTypeEnum.STORE)}
									</MenuItem>
									{userTypeLogged === UserTypeEnum.SUPER && (
										<MenuItem value={UserTypeEnum.MARKETING}>
											{getUserTypeText(UserTypeEnum.MARKETING)}
										</MenuItem>
									)}
								</Select>
							</FormControl>
						</div>
						<div className="col-md-6 mb-3">
							<TextField
								fullWidth
								placeholder={t('marketing.addUser.emailInput')}
								label={t('marketing.addUser.emailInput')}
								value={values.email}
								disabled={isDetails}
								onChange={handleChange}
								name="email"
							/>
							{values.email && (
								<>{validateEmail(values.email)}</>
							)}
						</div>
						<div className="col-md-6 mb-3">
							<FormControl sx={{ width: '100%' }} variant="outlined">
								<InputLabel>{`${
									values.id
										? t('marketing.addUser.updateUser')
										: t('marketing.addUser.createUser')
								} ${t('marketing.addUser.password')}`}</InputLabel>
								<OutlinedInput
									size={'medium'}
									id="outlined-adornment-password"
									type={showPassword ? 'text' : 'password'}
									value={values.password}
									name={'password'}
									placeholder={t('marketing.addUser.password')}
									label={`${
										values.id
											? t('marketing.addUser.updateUser')
											: t('marketing.addUser.createUser')
									} ${t('marketing.addUser.password')}`}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handlePassword}
												onMouseDown={handleMouseDownPassword}
												edge="end"
											>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									}
									onChange={(e) => {
										setFieldValue('password', e.target.value);
									}}
								/>
							</FormControl>
							{values.password && <>{validatePasswordStrenght(values.password)}</>}
						</div>
						{userTypeLogged === UserTypeEnum.SUPER && (
							<div className="col-md-6 mb-3">
								<Autocomplete
									disablePortal
									sx={StyledPatterInput}
									options={countries}
									disabled={isDetails || isLoadingCountries}
									value={countries.find((c) => c.value === values.countryId) || null}
									onChange={(_, newValue) => setFieldValue('countryId', newValue?.value)}
									renderInput={(params) => (
										<TextField
											{...params}
											variant="outlined"
											value={countries}
											placeholder={t('marketing.addUser.countryDropDown')}
											label={t('marketing.addUser.countryDropDown')}
										/>
									)}
								/>
							</div>
						)}
						{(values.countryId || userCountry) &&
							values.role != UserTypeEnum.MARKETING && (
								<div className="col-md-6 mb-3">
									<Autocomplete
										disablePortal
										sx={StyledPatterInput}
										disabled={isLoading}
										options={data}
										value={data.find((s) => s.value == values.storeId) || null}
										getOptionLabel={(option) => option.label}
										isOptionEqualToValue={(option, value) => option.value === value.value}
										onChange={(_, newValue) => {
											setFieldValue('storeId', newValue?.value);
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												variant="outlined"
												placeholder={t('marketing.targets.StoreDropDown')}
												label={t('marketing.targets.StoreDropDown')}
											/>
										)}
									/>
								</div>
							)}

						<div className="mb-3">
							<Switch
								disabled={isDetails}
								checked={values.newsLetter}
								onChange={(checked) => setFieldValue('newsLetter', checked.target.checked)}
								name="newsLetter"
							/>
							<Typography variant="h5">
								{t('marketing.addUser.switchInput')}
							</Typography>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
