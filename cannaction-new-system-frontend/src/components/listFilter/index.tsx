import React, { ReactNode, useState } from 'react';
import { Grid } from '@mui/material';
import DatePickerComponent from '../datePickerComponent/DatePickerComponent';
import CustomButton from '../customButton/CustomButton';
import FormikHook from '../../models/interfaces/FormikHook';
import { ListFilter } from './listFiter';

interface Props {
	formik: FormikHook<ListFilter>;
	children: ReactNode;
}

export const FilterList: React.FC<Props> = ({
	formik: { handleChange, setFieldValue, values, errors, touched, isSubmitting },
	children,
}) => {
	return (
		<Grid
			p="2rem"
			boxShadow="0 0.15rem 1.75rem 0 rgba(33, 40, 50, 0.15)"
			borderRadius=".35rem"
			sx={{ backgroundColor: '#fff' }}
		>
			<Grid display="flex" mb="1rem">
				{children}
			</Grid>

			<Grid container spacing={2} height={80}>
				<Grid item xs={12} md={4}>
					<DatePickerComponent
						term="Initial"
						value={values.beginDate}
						onChange={handleChange}
					/>
				</Grid>

				<Grid item xs={12} md={4}>
					<DatePickerComponent
						term="Final"
						value={values.endDate}
						onChange={handleChange}
					/>
				</Grid>

				<Grid item xs={12} md={4} mt={'6px'} display="flex" alignItems="center">
					<Grid width="100%" mr="1rem" height="100%">
						<CustomButton
							type="button"
							// disabled={!selectedStartDate || !selectedEndDate}
							showLoading={isSubmitting}
						>
							Filter
						</CustomButton>
					</Grid>
					<Grid width="100%" mr="1rem" height="100%">
						<CustomButton
							type="button"
							// disabled={!selectedStartDate || !selectedEndDate}
							showLoading={isSubmitting}
						>
							Clear
						</CustomButton>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};
