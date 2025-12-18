/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CreateUserRequest from '../../../dtos/requests/CreateUserRequest';
import StoreService from '../../../services/StoreService';
import UserService from '../../../services/UserService';
import './Register.styles.css';
import FormValues from './formValues';
import { useFormik } from 'formik';
import initialValues from './initialValues';
import validationSchema from './validationSchema';
import { UserTypeEnum } from '../../../models/enums/userType.enum';
import { FirstStep } from './steps/firstStep';
import { StoreEntity } from '../../../models/entities/StoreEntity';
import FormikHook from '../../../models/interfaces/FormikHook';
import { SecondStep } from './steps/secondStep';
import { Buttons } from './steps/buttons';
import { StateEntity } from '../../../models/entities/StateEntity';
import { CityEntity } from '../../../models/entities/CityEntity';
import StateService from '../../../services/StateService';
import CityService from '../../../services/CityService';
import { useNavigate } from 'react-router-dom';
import { useCountries } from '../../../hooks/querys/country/useCountries';
import { useLanguages } from '../../../hooks/querys/language/useLanguages';
import { useSnackbar } from '../../../contexts/Snackbar';
import { isAxiosError } from 'axios';

const Register: React.FC = () => {
	const [storeList, setStoreList] = useState<StoreEntity[]>([]);
	const [cityList, setCityList] = useState<CityEntity[]>([]);
	const [stateList, setStateList] = useState<StateEntity[]>([]);
	const [step, setStep] = useState(1);
	const navigate = useNavigate();

	const { openSnackbar } = useSnackbar();

	const { data: countryList } = useCountries();
	const { data: languageList } = useLanguages();

	const composeRequestBody = (user: FormValues): CreateUserRequest => {
		// Validation should be handled by formik, but adding safety checks
		if (!user.countryId) {
			throw new Error('Country is required');
		}
		if (!user.languageId) {
			throw new Error('Language is required');
		}
		
		// For customer users, storeId is mandatory
		if (user.userType === UserTypeEnum.CUSTOMER) {
			if (!user.storeId || user.storeId === 0 || user.storeId === undefined) {
				throw new Error('Store is required for customer users');
			}
		}

		const request: CreateUserRequest = {
			name: user.name.trim(),
			lastName: user.lastName.trim(),
			email: user.email.trim(),
			nickname: user.nickname.trim(),
			password: user.password,
			countryId: Number(user.countryId),
			languageId: Number(user.languageId),
			birthdate: user.birthdate || '',
			userType: user.userType as UserTypeEnum,
			telephone: user.telephone,
		};

		// For customer users, storeId is required and must be included
		if (user.userType === UserTypeEnum.CUSTOMER) {
			request.storeId = Number(user.storeId);
		}

		// Only include optional fields if they have values
		if (user.cityId) request.cityId = Number(user.cityId);
		if (user.stateId) request.stateId = Number(user.stateId);
		if (user.userType !== UserTypeEnum.CUSTOMER && user.storeId && user.storeId !== 0) {
			request.storeId = Number(user.storeId);
		}
		if (user.address?.trim()) request.storeAddress = user.address.trim();
		if (user.storeContactEmail?.trim()) request.storeContactEmail = user.storeContactEmail.trim();
		if (user.storeContactTelephone) request.storeContactTelephone = user.storeContactTelephone;
		if (user.storeName?.trim()) request.storeName = user.storeName.trim();

		return request;
	};

	const onSubmit = async (values: FormValues) => {
		try {
			console.log('Form values before composing request:', values);
			const requestBody = composeRequestBody(values);
			console.log('Sending user creation request:', JSON.stringify(requestBody, null, 2));
			await UserService.createNewUser(requestBody);
			openSnackbar('User created sucessfully!', 'success');

			setTimeout(() => {
				navigate('/login');
			}, 15 * 1000);
		} catch (e: unknown) {
			console.error('Error creating user:', e);
			if (isAxiosError(e)) {
				const errorMessage = 
					Array.isArray(e.response?.data?.message)
						? e.response.data.message[0]
						: e.response?.data?.message || 
						Array.isArray(e.response?.data?.data?.message)
						? e.response.data.data.message[0]
						: e.response?.data?.data?.message ||
						e.message ||
						'Failed to create user';
				openSnackbar(errorMessage, 'error');
			} else if (e instanceof Error) {
				openSnackbar(e.message, 'error');
			} else {
				openSnackbar('An unexpected error occurred.', 'error');
			}
		} finally {
			navigate('/login');
		}
	};

	const formik: FormikHook<FormValues> = useFormik<FormValues>({
		initialValues,
		validationSchema,
		onSubmit,
	});

	const { values, handleSubmit } = formik;

	const getStoresByCountry = async () => {
		if (!values.countryId || values.countryId == 0) {
			setStoreList([]);
			return;
		}
		const stores = await StoreService.getLabeledStoresByCountry(
			values.countryId
		);
		if (stores) setStoreList(stores);
	};

	const getStatesByCountry = async () => {
		if (!values.countryId || values.countryId == 0) return;
		const states = await StateService.getStatesByCountry(values.countryId);
		if (states) setStateList(states);
	};

	const getCitiesByState = async () => {
		if (!values.stateId) return;
		const cities = await CityService.getCitiesByState(values?.stateId);
		if (cities) setCityList(cities);
	};

	useEffect(() => {
		getStoresByCountry();
		if (values.userType === UserTypeEnum.STORE) getStatesByCountry();
	}, [values.countryId, values.userType]);

	useEffect(() => {
		getCitiesByState();
	}, [values.stateId]);

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
			<Box sx={{ width: { md: '70%' } }}>
				<form id="wrapped" onSubmit={handleSubmit} autoComplete="off">
					<Grid id="middle-wizard">
						<FirstStep
							step={step}
							countryList={countryList != undefined ? countryList : []}
							languageList={languageList != undefined ? languageList : []}
							storeList={storeList}
							formik={formik}
						/>
						<SecondStep
							step={step}
							stateList={stateList}
							cityList={cityList}
							formik={formik}
						/>
						<Buttons step={step} setStep={setStep} formik={formik} />
					</Grid>
				</form>
			</Box>
		</Grid>
	);
};

export default Register;
