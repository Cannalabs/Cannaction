import {
	Autocomplete,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomButton from '../../../../../components/customButton/CustomButton';
import { StyledPatterInput } from '../../../../../components/customSelect/styles';
import { useNavigate, useParams } from 'react-router-dom';
import {
	setNotification,
	useNotification,
} from '../../../../../hooks/querys/notification/useNotification';
import { useCountriesLabeled } from '../../../../../hooks/querys/country/useCountryLabeled';
import { useSnackbar } from '../../../../../contexts/Snackbar';
import { FormValues } from './formValues';
import NotificationEntity from '../../../../../models/entities/NotificationEntity';
import { CreateNotificationRequest } from '../../../../../dtos/requests/CreateNotificationRequest';
import { UpdateNotificationRequest } from '../../../../../dtos/requests/UpdateNotificationRequest';
import NotificationService from '../../../../../services/NotificationService';
import { initialValues } from './initialValues';
import validationSchema from './schema';
import { useMutation } from '@tanstack/react-query';
import FormikHook from '../../../../../models/interfaces/FormikHook';
import { useFormik } from 'formik';
import { NotificationUserType } from '../../../../../models/enums/NotificationUserTypeEnum';
import { inputPreventSubmit } from '../../../../../utils/form';
import { useAuth } from '../../../../../contexts/Auth';
import { UserTypeEnum } from '../../../../../models/enums/userType.enum';
import { QuillComponent } from '../../../../../components/quill';
import { useTranslation } from 'react-i18next';

export const FormNotification: React.FC = () => {
	const { userTypeLogged, userCountry } = useAuth();
	const { id } = useParams();
	const [active, setActive] = useState<boolean>(false);
	const { data: notification, isLoading } = useNotification(
		id ? +id : undefined
	);
	const { countries } = useCountriesLabeled();
	const navigate = useNavigate();
	const { openSnackbar } = useSnackbar();
	const { t } = useTranslation();

	const composeFormValues = (notification: NotificationEntity): FormValues => ({
		id: notification.id,
		title: notification.title,
		body: notification.body,
		countryId: notification.country.id,
		userType: notification.userType,
	});

	const composeRequestBody = (
		values: FormValues
	): CreateNotificationRequest | UpdateNotificationRequest => ({
		title: values.title,
		body: values.body,
		countryId: values.countryId,
		active,
		userType: values.userType,
	});

	const create = (values: FormValues) =>
		NotificationService.createNotification(
			composeRequestBody(values) as CreateNotificationRequest
		);

	const update = (values: FormValues) => {
		if (!values.id) return;
		NotificationService.updateNotification(
			values.id,
			composeRequestBody(values) as UpdateNotificationRequest
		);
	};

	const { mutateAsync } = useMutation(
		async (values: FormValues) => (values.id ? update(values) : create(values)),
		{
			onSuccess: (entity) => {
				setNotification(entity);
				openSnackbar(
					`${t('marketing.notification.title')} ${
						id
							? t('marketing.addStore.storeUpdated')
							: t('marketing.addStore.storeCreated')
					}`,
					'success'
				);
				navigate(-1);
			},
			retry: 1,
		}
	);

	const onSubmit = async (values: FormValues) => {
		setSubmitting(true);
		try {
			await mutateAsync(values);
		} catch (e: unknown) {
			openSnackbar(e, 'error');
		} finally {
			setSubmitting(false);
		}
	};

	const formik: FormikHook<FormValues> = useFormik<FormValues>({
		initialValues,
		validationSchema,
		onSubmit,
	});

	const {
		resetForm,
		isSubmitting,
		setSubmitting,
		setFieldValue,
		handleChange,
		values,
	} = formik;

	useEffect(() => {
		if (userTypeLogged !== UserTypeEnum.SUPER) {
			setFieldValue('countryId', userCountry);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values]);

	useEffect(() => {
		if (!notification) {
			resetForm({ values: initialValues });
			return;
		}
		resetForm({ values: composeFormValues(notification) });
	}, [notification, resetForm]);

	const handleClear = () => {
		setFieldValue('countryId', undefined);
		setFieldValue('userType', NotificationUserType.ALL);
	};

	const handleBodyChange = (value: string) => {
		setFieldValue('body', value);
	};

	const handleSaveNotification = (status: boolean, values: FormValues) => {
		setActive(status);
		onSubmit(values);
	};

	return (
		<div className="row gx-4">
			<div className="col-lg-8">
				<div className="card mb-4">
					<div className="card-body">
						<div className="row">
							<div className="col-md-6 col-12 mb-3">
								<Autocomplete
									disablePortal
									sx={StyledPatterInput}
									options={countries}
									fullWidth
									disabled={userTypeLogged !== UserTypeEnum.SUPER}
									value={
										userTypeLogged !== UserTypeEnum.SUPER
											? countries.find((c) => c.value === userCountry)
											: countries.find((c) => c.value === values.countryId) || null
									}
									onChange={(_, value) => setFieldValue('countryId', value?.value)}
									renderInput={(params) => (
										<TextField
											{...params}
											placeholder={t('marketing.addNotification.countryDropdown')}
											variant="outlined"
											value={countries}
											name="countryId"
										/>
									)}
								/>
							</div>
							<div className="col-md-6 col-12 mb-3">
								<FormControl fullWidth>
									<InputLabel id="userType">
										{t('marketing.addNotification.userTypeDropdown')}
									</InputLabel>
									<Select
										id="userType"
										label={t('marketing.addNotification.userTypeDropdown')}
										disabled={isLoading || isSubmitting}
										name="userType"
										value={values.userType || ''}
										onChange={(e) => {
											const value = e.target.value as string;
											setFieldValue('userType', value as NotificationUserType);
										}}
										onKeyDown={inputPreventSubmit}
									>
										<MenuItem value={NotificationUserType.ALL}>All</MenuItem>
										<MenuItem value={NotificationUserType.CUSTOMER}>Customer</MenuItem>
										<MenuItem value={NotificationUserType.STORE}>Store</MenuItem>
									</Select>
								</FormControl>
							</div>
							<div className="col-md-12 col-12">
								<CustomButton onClick={handleClear} type="button" showLoading={false}>
									{t('marketing.addNotification.clearButton')}
								</CustomButton>
							</div>
						</div>
					</div>
				</div>
				<div className="card mb-4">
					<div className="card-body">
						<div className="mb-3">
							<div className="row">
								<div className="col">
									<TextField
										fullWidth
										name="title"
										onChange={handleChange}
										value={values.title}
										placeholder={t('marketing.addNotification.newsletterTitleInput')}
										sx={{
											'& input[type=number]::-webkit-inner-spin-button': {
												'-webkit-appearance': 'none',
											},
										}}
									/>
								</div>
							</div>
						</div>
						<div className="mb-3">
							<div className="row">
								<div className="col">
									<div id="summernote" className="summernote"></div>
									<QuillComponent
										onContentChange={handleBodyChange}
										value={values.body}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="col-lg-4">
				<div className="card mb-4">
					<div className="card-body">
						<div className="d-grid mb-3">
							<Button
								onClick={() => handleSaveNotification(false, values)}
								variant="contained"
								sx={{
									textTransform: 'capitalize',
									fontSize: '0.875rem',
									backgroundColor: '#CE290C',
									color: '#fff',
									width: '100%',
									height: 45,
									fontWeight: '600',
								}}
							>
								{t('marketing.addNotification.saveDisabled')}
							</Button>
						</div>
						<div className="d-grid">
							<Button
								onClick={() => handleSaveNotification(true, values)}
								variant="contained"
								sx={{
									textTransform: 'capitalize',
									fontSize: '0.875rem',
									width: '100%',
									height: 45,
									fontWeight: '600',
									background: '#f1e0e3',
									color: '#1b7f75',
								}}
							>
								{t('marketing.addNotification.saveNow')}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
