import {
	Autocomplete,
	Button,
	FormControl,
	InputLabel,
	LinearProgress,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { StyledPatterInput } from '../../../../../components/customSelect/styles';
import CustomButton from '../../../../../components/customButton/CustomButton';
import { QuillComponent } from '../../../../../components/quill';
import { Preview } from './preview';
import { useNavigate, useParams } from 'react-router-dom';
import {
	setNewsletter,
	useNewsletter,
} from '../../../../../hooks/querys/newsletter/userNewsletter';
import { useSnackbar } from '../../../../../contexts/Snackbar';
import NewsletterEntity from '../../../../../models/entities/NewsletterEntity';
import { FormValues } from './formValues';
import { initialValues } from './initialValues';
import validationSchema from './schema';
import { CreateNewsletterRequest } from '../../../../../dtos/requests/CreateNewsletterRequest';
import { UpdateNewsletterRequest } from '../../../../../dtos/requests/UpdateNewsletterRequest';
import NewsletterService from '../../../../../services/NewsletterService';
import { useMutation } from '@tanstack/react-query';
import FormikHook from '../../../../../models/interfaces/FormikHook';
import { useFormik } from 'formik';
import { useCountriesLabeled } from '../../../../../hooks/querys/country/useCountryLabeled';
import { NewsletterUserType } from '../../../../../models/enums/NewsletterUserType.enum';
import { inputPreventSubmit } from '../../../../../utils/form';
import {
	StoreType,
	useStoreLabeledByCountry,
} from '../../../../../hooks/querys/store/useStoreLabeledByCountry';
import { useAuth } from '../../../../../contexts/Auth';
import { UserTypeEnum } from '../../../../../models/enums/userType.enum';
import { useTranslation } from 'react-i18next';

export const FormNewsletter: React.FC = () => {
	const { userTypeLogged, userCountry } = useAuth();
	const { id } = useParams();
	const {
		data: newsletter,
		isLoading,
		isRefetching,
	} = useNewsletter(id ? +id : undefined);
	const { countries } = useCountriesLabeled();
	const navigate = useNavigate();
	const { openSnackbar } = useSnackbar();
	const [initialStores, setInitialStores] = useState<StoreType[]>([]);
	const { t } = useTranslation();

	const composeFormValues = (newsletter: NewsletterEntity): FormValues => ({
		id: newsletter.id,
		title: newsletter.title,
		body: newsletter.body,
		footer: newsletter.footer,
		countryId: newsletter.country.id,
		userType: newsletter.userType,
		storeIds: newsletter.stores.map((s) => s.id),
	});

	const composeRequestBody = (
		values: FormValues
	): CreateNewsletterRequest | UpdateNewsletterRequest => ({
		title: values.title,
		body: values.body,
		footer: values.footer,
		countryId: values.countryId,
		storeIds: values.storeIds,
		userType: values.userType,
	});

	const create = (values: FormValues) =>
		NewsletterService.createNewsletter(
			composeRequestBody(values) as CreateNewsletterRequest
		);

	const update = (values: FormValues) => {
		if (!values.id) return;
		NewsletterService.updateNewsletter(
			values.id,
			composeRequestBody(values) as UpdateNewsletterRequest
		);
	};

	const { mutateAsync } = useMutation(
		async (values: FormValues) => (values.id ? update(values) : create(values)),
		{
			onSuccess: (entity) => {
				setNewsletter(entity);
				openSnackbar(
					`${t('marketing.newsletter.title')} ${
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
		values,
		handleChange,
	} = formik;

	useEffect(() => {
		if (userTypeLogged !== UserTypeEnum.SUPER) {
			setFieldValue('countryId', userCountry);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values]);

	useEffect(() => {
		if (!newsletter) {
			resetForm({ values: initialValues });
			return;
		}
		resetForm({ values: composeFormValues(newsletter) });
	}, [newsletter, resetForm]);

	const handleClear = () => {
		setFieldValue('countryId', undefined);
		setFieldValue('userType', NewsletterUserType.ALL);
		setFieldValue('storeIds', []);
	};

	const handleBodyChange = (value: string) => {
		setFieldValue('body', value);
	};
	const { stores, refetch: refetchStores } = useStoreLabeledByCountry(
		values.countryId
	);

	useEffect(() => {
		refetchStores();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values.countryId]);

	useEffect(() => {
		const selectedStores = stores.filter((store) =>
			values.storeIds.includes(store.value)
		);
		setInitialStores(selectedStores);
	}, [stores, values.storeIds]);

	return (
		<div className="row gx-4">
			<div className="col-lg-9">
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
											placeholder={t('marketing.addNewsletter.countryDropdown')}
											variant="outlined"
											value={countries}
											name="countryId"
										/>
									)}
								/>
							</div>
							<div className="col-md-6 col-12 mb-3">
								<FormControl fullWidth>
									<InputLabel id="userType">User Type</InputLabel>
									<Select
										id="userType"
										label="User Type"
										disabled={isLoading || isSubmitting}
										name="userType"
										value={values.userType || ''}
										onChange={(e) => {
											const value = e.target.value as string;
											setFieldValue('userType', value as NewsletterUserType);
										}}
										onKeyDown={inputPreventSubmit}
									>
										<MenuItem value={NewsletterUserType.ALL}>All</MenuItem>
										<MenuItem value={NewsletterUserType.CUSTOMER}>Customer</MenuItem>
										<MenuItem value={NewsletterUserType.STORE}>Store</MenuItem>
									</Select>
								</FormControl>
							</div>
							<div className="col-md-6 col-12 mb-3">
								{values.userType === NewsletterUserType.STORE && (
									<>
										{isLoading || isRefetching ? (
											<LinearProgress />
										) : (
											<Autocomplete
												disablePortal
												disabled={isLoading || isSubmitting || isRefetching}
												multiple
												sx={StyledPatterInput}
												options={stores}
												value={initialStores}
												getOptionLabel={(option) => option.label}
												isOptionEqualToValue={(option, value) =>
													option.value === value.value
												}
												onChange={(_, selectedOptions) => {
													const selectedValues = selectedOptions.map(
														(option) => option.value
													);
													setFieldValue('storeIds', selectedValues);
													setInitialStores(selectedOptions);
												}}
												renderInput={(params) => (
													<TextField
														{...params}
														variant="outlined"
														placeholder="Choose Type Store"
														label="Stores"
													/>
												)}
											/>
										)}
									</>
								)}
							</div>
							<div className="col-md-12 col-12">
								<CustomButton onClick={handleClear} type="button" showLoading={false}>
									Clear
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
										placeholder="Newsletter Title"
										sx={{
											'& input[footer=number]::-webkit-inner-spin-button': {
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
						<div className="mb-3">
							<div className="row">
								<div className="col">
									<TextField
										fullWidth
										value={values.footer}
										name="footer"
										onChange={handleChange}
										placeholder="All rights reserved"
										sx={{
											'& input[footer=number]::-webkit-inner-spin-button': {
												'-webkit-appearance': 'none',
											},
										}}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Preview content={values.body} footer={values.footer} />
			</div>
			<div className="col-lg-3">
				<div className="card mb-4">
					<div className="card-body">
						<div className="d-grid mb-3">
							<Button
								disabled={isLoading || isSubmitting}
								onClick={() => onSubmit(values)}
								variant="contained"
								sx={{
									backgroundColor: '#E0EBFC',
									color: '#1b7f75',
									width: '100%',
									height: 45,
									fontWeight: 'bold',
								}}
							>
								Save as Draft
							</Button>
						</div>
						<div className="d-grid">
							<Button
								disabled={isLoading || isSubmitting}
								onClick={() => onSubmit(values)}
								variant="contained"
							>
								Save and Send Now
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
