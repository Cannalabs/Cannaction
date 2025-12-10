import React from 'react';
import FormikHook from '../../../../../models/interfaces/FormikHook';
import { FormValues } from '../form/FormValues';
import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import './styles.css';
import { useProfilePontuations } from '../../../../../hooks/querys/profilePontuation/useProfilePontuations';
import { LanguageEntity } from '../../../../../models/entities/LanguageEntity';
import { useLanguages } from '../../../../../hooks/querys/language/useLanguages';
import { inputPreventSubmit } from '../../../../../utils/form';
import { DatePicker } from '@mui/x-date-pickers';
import { DateTime } from 'luxon';
import { useAuth } from '../../../../../contexts/Auth';
import { useTranslation } from 'react-i18next';

interface Props {
	formik: FormikHook<FormValues>;
	isLoading: boolean;
	onSubmit: (values: FormValues) => void;
}

export const Information: React.FC<Props> = ({
	formik: { handleChange, values, setFieldValue },
	isLoading,
	onSubmit,
}) => {
	const { setLanguage } = useAuth();
	const { t } = useTranslation();

	const { data: languages, isLoading: loadingLanguages } = useLanguages();

	const { data, isLoading: isLoadingProfilePoints } = useProfilePontuations();

	const submit = async () => {
		onSubmit(values);
		const language = languages?.find((l) => l.id == values.languageId);
		if (language) {
			setLanguage(language.code);
		}
	};

	return (
		<div className="col-xl-8">
			<div className="card mb-4">
				<div className="card-header">
					{t('marketing.promoReport.actionsColumnDetailsTooltip')}
				</div>
				<div className="card-body">
					<div className="mb-3">
						<div className="row">
							<div className="col-md-6 mb-2">
								<TextField
									fullWidth
									disabled={isLoading}
									name="name"
									id="name"
									placeholder={t('marketing.addUser.firstNameInput')}
									label={t('marketing.addUser.firstNameInput')}
									value={values.name}
									onChange={handleChange}
								/>
							</div>
							<div className="col-md-6">
								<TextField
									fullWidth
									disabled={isLoading}
									id="lastName"
									placeholder={t('marketing.addUser.lastName')}
									label={t('marketing.addUser.lastName')}
									name="lastName"
									value={values.lastName}
									onChange={handleChange}
								/>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-6 mb-2">
							<DatePicker
								sx={{
									width: '100%',

									'.MuiInputBase-root': {
										fontSize: '0.8rem',
									},
									'.MuiOutlinedInput-root': {},
								}}
								label={t('marketing.profilePunctuation.birthdateBoxTitle')}
								format="yyyy/MM/dd"
								placeholderText="YYYY/MM/DD"
								value={values.birthDate ? DateTime.fromISO(values.birthDate) : null}
								onChange={(date: string | null) => {
									return setFieldValue('birthDate', date);
								}}
							/>
							<small>
								Enter your birthdate and earn{' '}
								{data?.filter((pp) => pp.id == 5)[0]?.points} points!
							</small>
						</div>
						<div className="col-md-6 mb-2">
							<FormControl fullWidth className="selectpicker w-100">
								<InputLabel id="gender">
									{t('marketing.profilePunctuation.genderBoxTitle')}
								</InputLabel>
								<Select
									id="gender"
									label={t('marketing.profilePunctuation.genderBoxTitle')}
									disabled={isLoading}
									name="gender"
									value={values.gender || ''}
									onChange={handleChange}
									onKeyDown={inputPreventSubmit}
								>
									<MenuItem value=""></MenuItem>
									<MenuItem value="M"> Male </MenuItem>
									<MenuItem value="F"> Female </MenuItem>
									<MenuItem value="O"> Other </MenuItem>
								</Select>
							</FormControl>
							<small>
								Enter your gender and earn {data?.filter((pp) => pp.id == 6)[0]?.points}{' '}
								points!
							</small>
						</div>
					</div>

					<div className="mb-3">
						<div className="row">
							<div className="col-md-6 mb-4">
								<TextField
									fullWidth
									disabled={isLoading}
									id="nickname"
									placeholder={t('marketing.addUser.nicknameInput')}
									label={t('marketing.addUser.nicknameInput')}
									name="nickname"
									value={values.nickname}
									onChange={handleChange}
								/>
							</div>
							<div className="col-md-6">
								<FormControl fullWidth className="selectpicker w-100">
									<InputLabel id="chooseLanguage">
										{t('accountProfile.language')}
									</InputLabel>
									<Select
										id="chooseLanguage"
										label={t('accountProfile.language')}
										disabled={isLoading || loadingLanguages}
										name="languageId"
										value={values.languageId || 1}
										onChange={(e) => {
											const value = e.target.value as string;
											setFieldValue('languageId', value === '' ? null : (value as ''));
										}}
										onKeyDown={inputPreventSubmit}
									>
										{languages?.map((data: LanguageEntity) => (
											<MenuItem value={data.id}> {data.name} </MenuItem>
										))}
									</Select>
								</FormControl>
							</div>
						</div>
					</div>
					<div className="mb-3">
						<Typography sx={{ fontWeight: '600', fontSize: '1rem' }}>
							{t('accountProfile.password')}
						</Typography>

						<div className="row">
							<div className="col-md-4">
								<TextField
									disabled={isLoading}
									fullWidth
									name="password"
									sx={{ marginTop: '10px' }}
									placeholder={t('accountProfile.currentPassword')}
									type="password"
									label={t('accountProfile.currentPassword')}
									value={values.password}
									onChange={handleChange}
								/>
							</div>
							<div className="col-md-4">
								<TextField
									fullWidth
									sx={{ marginTop: '10px' }}
									id="newPassword"
									disabled={isLoading}
									placeholder={t('accountProfile.newPassword')}
									label={t('accountProfile.newPassword')}
									name="newPassword"
									type="password"
									value={values.newPassword}
									onChange={handleChange}
								/>
							</div>
							<div className="col-md-4">
								<TextField
									fullWidth
									type="password"
									sx={{ marginTop: '10px' }}
									disabled={isLoading}
									id="repeatNewPassword"
									placeholder={t('accountProfile.repeatPassword')}
									name="repeatNewPassword"
									label={t('accountProfile.repeatPassword')}
									value={values.repeatNewPassword}
									onChange={handleChange}
								/>
							</div>
							{values.repeatNewPassword !== null &&
								values.repeatNewPassword !== undefined &&
								values.repeatNewPassword !== '' &&
								values.newPassword !== values.repeatNewPassword && (
									<div className="row">
										<div className="col">
											<p className="text-danger">{t('accountProfile.passwordsMatch')}</p>
										</div>
									</div>
								)}
						</div>
					</div>

					<div className="mb-3">
						<Typography sx={{ fontWeight: '600', fontSize: '1rem' }}>
							{t('accountProfile.changeEmail')}
						</Typography>
						<div className="row">
							<div className="col-md-6">
								<TextField
									sx={{ marginTop: '10px' }}
									fullWidth
									disabled={true}
									id="currentEmail"
									placeholder={t('accountProfile.currentEmail')}
									label={t('accountProfile.currentEmail')}
									name="email"
									value={values.email}
									onChange={handleChange}
								/>
							</div>
							<div className="col-md-6">
								<TextField
									fullWidth
									sx={{ marginTop: '10px' }}
									disabled={isLoading}
									id="newEmail"
									placeholder={t('accountProfile.newEmail')}
									label={t('accountProfile.newEmail')}
									name="newEmail"
									value={values.newEmail}
									onChange={handleChange}
								/>
							</div>
						</div>
					</div>

					{/* <div className="row">
						<div className="col">
							<a
								onClick={() => handleDelete}
								className="delete-account-link:hover"
								style={{ cursor: 'pointer' }}
							>
								<p className="text-danger">Delete Account</p>
							</a>
						</div>
					</div> */}

					<Button
						className="btn btn-primary"
						type="submit"
						disabled={
							isLoading ||
							loadingLanguages ||
							isLoadingProfilePoints ||
							values.newPassword !== values.repeatNewPassword
						}
						onClick={submit}
						sx={{
							textTransform: 'capitalize',
						}}
					>
						{t('marketing.profilePunctuation.saveButton')}
					</Button>
				</div>
			</div>
		</div>
	);
};
