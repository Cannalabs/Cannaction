import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { StyledPatterInput } from '../../../../../components/customSelect/styles';
import FormikHook from '../../../../../models/interfaces/FormikHook';
import FormValues from '../form/formValues';
import { useCountriesLabeled } from '../../../../../hooks/querys/country/useCountryLabeled';
import {
	UserType,
	useUserLabeled,
} from '../../../../../hooks/querys/user/useUsersLabeled';
import { UserTypeEnum } from '../../../../../models/enums/userType.enum';
import {
	StateType,
	useStatesLabeled,
} from '../../../../../hooks/querys/state/useLabeledStates';
import {
	CityType,
	useCitiesLabeled,
} from '../../../../../hooks/querys/city/useLabeledCities';
import { useTranslation } from 'react-i18next';

interface Props {
	formik: FormikHook<FormValues>;
	isDetails: boolean;
}

export const Information: React.FC<Props> = ({
	formik: { handleChange, setFieldValue, values },
	isDetails,
}) => {
	const [userList, setUserList] = useState<UserType[]>([]);
	const [stateList, setStateList] = useState<StateType[]>([]);
	const [cityList, setCityList] = useState<CityType[]>([]);
	const { countries, isLoading: isLoadingCountries } = useCountriesLabeled();
	const [workersList, setWorkersList] = useState<UserType[]>();
	const {
		states,
		refetch: refetchStates,
		isLoading: isLoadingStates,
		isRefetching: isRefetchingStates,
	} = useStatesLabeled(values.countryId);
	const {
		cities,
		refetch: refetchCities,
		isLoading: isLoadingCities,
		isRefetching: isRefetchingCities,
	} = useCitiesLabeled(values.stateId);

	const {
		users,
		isLoading: isLoadingUsers,
		isRefetching: isRefetchingUsers,
		refetch: refetchUsers,
	} = useUserLabeled({
		active: true,
		countryId: values.countryId,
		userType: UserTypeEnum.STORE,
	});
	const { t } = useTranslation();

	useEffect(() => {
		if (!values.countryId) {
			setStateList([]);
		} else {
			refetchStates();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values.countryId]);

	useEffect(() => {
		if (!values.stateId) {
			setCityList([]);
		} else {
			refetchCities();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values.stateId]);

	useEffect(() => {
		if (!values.countryId) {
			setUserList([]);
		} else {
			refetchUsers();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values.countryId]);

	useEffect(() => {
		setStateList(states);
		setUserList(users);
		setCityList(cities);
	}, [users, states, cities]);

	useEffect(() => {
		const workers = users.filter((u) => values.workers.includes(u.value));
		setWorkersList(workers);
	}, [users, values.workers]);

	return (
		<div className="col-lg-8">
			<div className="card mb-4">
				<div className="card-header">{t('marketing.addStore.storeInformation')}</div>
				<div className="card-body">
					<div className="row">
						<div className="mb-3">
							<TextField
								fullWidth
								disabled={isDetails}
								placeholder={t('marketing.addStore.doingBusinessInput')}
								label={t('marketing.addStore.doingBusinessInput')}
								value={values.name}
								onChange={handleChange}
								name="name"
							/>
						</div>
						<div className="mb-3">
							<div className="row">
								<div className="col-md-6 ">
									<TextField
										disabled={isDetails}
										placeholder={t('marketing.addStore.phoneInput')}
										label={t('marketing.addStore.phoneInput')}
										fullWidth
										value={values.contactTelephone}
										name="contactTelephone"
										onChange={handleChange}
										id="contactTelephone"
									/>
								</div>
								<div className="col-md-6">
									<TextField
										fullWidth
										disabled={isDetails}
										placeholder={t('marketing.addStore.emailInput')}
										label={t('marketing.addStore.emailInput')}
										onChange={handleChange}
										value={values.contactEmail}
										name="contactEmail"
									/>
								</div>
							</div>
						</div>
						<div className="mb-3">
							<div className="row">
								<div className="col-md-6">
									<TextField
										fullWidth
										disabled={isDetails}
										placeholder={t('marketing.addStore.adressInput')}
										label={t('marketing.addStore.adressInput')}
										value={values.address}
										onChange={handleChange}
										name="address"
									/>
								</div>
								{/* <div className="col-md-7">
								<TextField
									fullWidth
									placeholder="Website"
									label="Website"
									value={values.s}
									onChange={handleChange}
									name="website"
								/>
							</div> */}
							</div>
						</div>
						<div className="mb-3">
							<div className="row">
								<div className="col-md-4 mb-3">
									<Autocomplete
										disablePortal
										sx={StyledPatterInput}
										options={countries}
										disabled={isDetails || isLoadingCountries}
										value={countries.find((c) => c.value === values.countryId) || null}
										onChange={(_, newValue) =>
											setFieldValue('countryId', newValue?.value)
										}
										renderInput={(params) => (
											<TextField
												{...params}
												variant="outlined"
												value={countries}
												placeholder={t('marketing.addStore.countryDropDown')}
												label={t('marketing.addStore.countryDropDown')}
											/>
										)}
									/>
								</div>
								<div className="col-md-4 mb-3">
									<Autocomplete
										disablePortal
										sx={StyledPatterInput}
										options={stateList}
										value={stateList.find((c) => c.value === values.stateId) || null}
										disabled={isDetails || isLoadingStates || isRefetchingStates}
										onChange={(_, newValue) => setFieldValue('stateId', newValue?.value)}
										renderInput={(params) => (
											<TextField
												{...params}
												variant="outlined"
												value={stateList}
												placeholder={t('marketing.addStore.stateDropdown')}
												label={t('marketing.addStore.stateDropdown')}
											/>
										)}
									/>
								</div>
								<div className="col-md-4">
									<Autocomplete
										disablePortal
										sx={StyledPatterInput}
										options={cityList}
										value={cityList.find((c) => c.value === values.cityId) || null}
										disabled={isDetails || isLoadingCities || isRefetchingCities}
										onChange={(_, newValue) => setFieldValue('cityId', newValue?.value)}
										renderInput={(params) => (
											<TextField
												{...params}
												variant="outlined"
												value={cities}
												placeholder={t('marketing.addStore.cityDropdown')}
												label={t('marketing.addStore.cityDropdown')}
											/>
										)}
									/>
								</div>
							</div>
						</div>
						<div className="mb-3">
							<div className="row">
								<div className="col-md-6">
									<Autocomplete
										disablePortal
										sx={StyledPatterInput}
										options={userList}
										value={userList.find((c) => c.value === values.masterUserId) || null}
										disabled={isDetails || isLoadingUsers || isRefetchingUsers}
										onChange={(_, newValue) =>
											setFieldValue('masterUserId', newValue?.value)
										}
										renderInput={(params) => (
											<TextField
												{...params}
												variant="outlined"
												value={userList}
												placeholder={t('marketing.addStore.masterUserDropdown')}
												label={t('marketing.addStore.masterUserDropdown')}
											/>
										)}
									/>
								</div>
							</div>
						</div>
						<div className="mb-3">
							<div className="row">
								<div className="col-md-12">
									<Autocomplete
										disablePortal
										disabled={isDetails || isLoadingUsers || isRefetchingUsers}
										multiple
										sx={StyledPatterInput}
										options={userList}
										value={userList.filter((u) => values.workers.includes(u.value))}
										getOptionLabel={(option) => option.label}
										isOptionEqualToValue={(option, value) => option.value === value.value}
										onChange={(_, selectedOptions) => {
											const selectedValues = selectedOptions.map((option) => option.value);
											setFieldValue(
												'workers',
												selectedValues.map((u) => u)
											);
											setWorkersList(selectedOptions);
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												variant="outlined"
												placeholder={t('marketing.addStore.selectStoreWorkers')}
												label={t('marketing.addStore.selectStoreWorkers')}
											/>
										)}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
