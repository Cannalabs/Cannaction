import { Autocomplete, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import FormValues from '../../form/formValues';
import FormikHook from '../../../../../../models/interfaces/FormikHook';
import { useCountriesLabeled } from '../../../../../../hooks/querys/country/useCountryLabeled';
import { StyledPatterInput } from '../../../../../../components/customSelect/styles';
import useDisableNumberInputScroll from '../../../../../../hooks/useDisabledScrollNumberInput';

interface Props {
	formik: FormikHook<FormValues>;
}

export const StepOne: React.FC<Props> = ({
	formik: { handleChange, setFieldValue, values, errors, touched },
}) => {
	const { countries } = useCountriesLabeled();
	useDisableNumberInputScroll();

	return (
		<Grid
			width={'60%'}
			container
			alignItems={'center'}
			justifyItems={'center'}
			justifyContent="center"
			p={2}
			gap={2}
		>
			<Grid
				container
				justifyContent={'center'}
				alignContent={'flex-start'}
				direction={'column'}
			>
				<Typography variant="h4" color={'grey'} fontWeight="bold">
					Step 1
				</Typography>
				<Typography variant="h5">Enter Basic Quiz Information</Typography>
			</Grid>
			<Grid item xs={12}>
				<TextField
					name="description"
					value={values.description}
					onChange={handleChange}
					size="small"
					placeholder="Quiz name"
					fullWidth
					sx={{ width: '100%' }}
				/>
			</Grid>
			<Grid item xs={4}>
				<TextField
					type="number"
					name="points"
					value={values.points}
					onChange={handleChange}
					size="small"
					placeholder="Points"
					fullWidth
				/>
			</Grid>
			<Grid xs={7.5}>
				<Autocomplete
					size="small"
					disablePortal
					sx={StyledPatterInput}
					options={countries}
					fullWidth
					renderInput={(params) => (
						<TextField
							{...params}
							variant="outlined"
							value={countries}
							placeholder="Choose your Country"
						/>
					)}
				/>
			</Grid>
		</Grid>
	);
};
