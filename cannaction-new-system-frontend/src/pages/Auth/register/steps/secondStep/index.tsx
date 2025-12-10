import React, { useEffect, useState } from 'react';
import FormValues from '../../formValues';
import FormikHook from '../../../../../models/interfaces/FormikHook';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { InputLogin } from '../../../components/inputLogin';
import { HeadStep } from '../headStep';
import { CityEntity } from '../../../../../models/entities/CityEntity';
import { StateEntity } from '../../../../../models/entities/StateEntity';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface SecondStepProps {
	formik: FormikHook<FormValues>;
	step: number;
	cityList: CityEntity[];
	stateList: StateEntity[];
}

export const SecondStep: React.FC<SecondStepProps> = ({
	step,
	cityList,
	stateList,
	formik: { handleChange, values, touched, errors, setFieldValue },
}) => {
	const [cleared, setCleared] = useState<boolean>(false);

	useEffect(() => {
		if (cleared) {
			const timeout = setTimeout(() => {
				setCleared(false);
			}, 1500);

			return () => clearTimeout(timeout);
		}
		return () => {};
	}, [cleared]);

	return (
		<>
			{step === 2 && (
				<Grid sx={{ marginBottom: '1rem' }}>
					<HeadStep step="2/2" info="Summary" />

					<Grid
						mt={2}
						display="flex"
						alignItems="center"
						justifyContent="center"
						gap={2}
					>
						<InputLogin
							id="address"
							placeholder="Address"
							label="Address"
							onChange={handleChange}
							name="address"
							error={touched.address && Boolean(errors.address)}
							helperText={touched.address && errors.address}
						/>
					</Grid>
					<Grid
						mt={2}
						display="flex"
						alignItems="center"
						justifyContent="center"
						gap={2}
					>
						<FormControl fullWidth sx={{ height: errors.stateId ? '50px' : 'auto' }}>
							<InputLabel id="stateId" style={{ fontSize: '0.8rem' }}>
								State
							</InputLabel>
							<Select
								size="small"
								labelId="stateId"
								id="stateId"
								label="State"
								value={values.stateId || ''}
								name="state"
								disabled={
									values.countryId == 0 || !values.countryId || stateList.length == 0
								}
								error={touched.stateId && Boolean(errors.stateId)}
								onChange={(e) => {
									const value = e.target.value as string;
									setFieldValue('stateId', value === '' ? null : (value as string));
								}}
							>
								{stateList.map((state) => (
									<MenuItem
										key={state.id}
										value={state.id}
										style={{ fontSize: '0.8rem' }}
									>
										{state.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<FormControl fullWidth sx={{ height: errors.cityId ? '50px' : 'auto' }}>
							<InputLabel id="cityId" style={{ fontSize: '0.8rem' }}>
								City
							</InputLabel>
							<Select
								size="small"
								labelId="cityId"
								id="cityId"
								label="City"
								value={values.cityId || ''}
								name="city"
								disabled={
									values.stateId == 0 || !values.stateId || cityList.length == 0
								}
								error={touched.cityId && Boolean(errors.cityId)}
								onChange={(e) => {
									const value = e.target.value as string;
									setFieldValue('cityId', value === '' ? null : (value as string));
								}}
							>
								{cityList.map((state) => (
									<MenuItem
										key={state.id}
										value={state.id}
										style={{ fontSize: '0.8rem' }}
									>
										{state.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid
						mt={2}
						display="flex"
						alignItems="center"
						justifyContent="center"
						gap={2}
					>
						<InputLogin
							placeholder="Telephone"
							label="Telephone"
							value={values.telephone}
							name="telephone"
							onChange={handleChange}
							id="telephone"
							error={touched.telephone && Boolean(errors.telephone)}
							helperText={touched.telephone && errors.telephone}
						/>

						<DatePicker
							label="Birthdate"
							onChange={handleChange}
							sx={{
								width: '100%',
								'.MuiInputBase-root': {
									height: '38px',
									fontSize: '0.8rem',
								},
								'.MuiOutlinedInput-root': {
									height: '38px',
								},
							}}
						/>
					</Grid>
					<Grid
						mt={2}
						display="flex"
						alignItems="center"
						justifyContent="center"
						gap={2}
					>
						<InputLogin
							placeholder="Store Name"
							label="Store Name"
							value={values.storeName}
							name="storeName"
							onChange={handleChange}
							id="storeName"
							error={touched.storeName && Boolean(errors.storeName)}
							helperText={touched.storeName && Boolean(errors.storeName)}
						/>
						<InputLogin
							placeholder="Store Address"
							label="Store Address"
							value={values.storeAddress}
							name="storeAddress"
							onChange={handleChange}
							id="storeAddress"
							error={touched.storeAddress && Boolean(errors.storeAddress)}
							helperText={touched.storeAddress && Boolean(errors.storeAddress)}
						/>
					</Grid>
					<Grid
						mt={2}
						display="flex"
						alignItems="center"
						justifyContent="center"
						gap={2}
					>
						<InputLogin
							placeholder="Store Telephone"
							label="Store Telephone"
							value={values.storeContactTelephone}
							name="storeContactTelephone"
							onChange={handleChange}
							id="storeContactTelephone"
							error={
								touched.storeContactTelephone && Boolean(errors.storeContactTelephone)
							}
							helperText={
								touched.storeContactTelephone && Boolean(errors.storeContactTelephone)
							}
						/>
						<InputLogin
							placeholder="Store Email"
							label="Store Email"
							value={values.storeContactEmail}
							name="storeContactEmail"
							onChange={handleChange}
							id="storeContactEmail"
							error={touched.storeContactEmail && Boolean(errors.storeContactEmail)}
							helperText={
								touched.storeContactEmail && Boolean(errors.storeContactEmail)
							}
						/>
					</Grid>
				</Grid>
			)}
		</>
	);
};
