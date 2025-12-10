import { TextField } from '@mui/material';
import React from 'react';
import { StyledPatterInput } from '../../../../../components/customSelect/styles';
import FormikHook from '../../../../../models/interfaces/FormikHook';
import { FormValues } from '../form/formValues';
import useDisableNumberInputScroll from '../../../../../hooks/useDisabledScrollNumberInput';

interface Props {
	formik: FormikHook<FormValues>;
	itemName: string;
}

export const Information: React.FC<Props> = ({
	formik: { values },
	itemName,
}) => {
	useDisableNumberInputScroll();

	return (
		<div className="col-lg-8">
			<div className="card mb-4">
				<div className="card-header">Promotion Information</div>
				<div className="card-body">
					<div className="row">
						<div className="col-md-10 mb-3">
							<TextField
								fullWidth
								placeholder="Item"
								label="Item"
								value={itemName}
								sx={StyledPatterInput}
								name="name"
								disabled
							/>
						</div>
						<div className="col-md-10 mb-3">
							<TextField
								fullWidth
								label="E-mail"
								placeholder="E-mail text"
								value={values.emailText}
								rows={4}
								disabled
								multiline
								name="emailText"
							/>
						</div>
						<div className="mb-3">
							<TextField
								fullWidth
								placeholder="Promotion Name"
								label="Promotion Name"
								value={values.name}
								sx={StyledPatterInput}
								name="name"
								disabled
							/>
						</div>
						<div className="col-md-6 mb-3">
							<TextField
								fullWidth
								placeholder="Promotion Coupons"
								label="Promotion Coupons"
								type="number"
								name="coupons"
								value={values.coupons || ''}
								sx={{
									'& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
										border: 'none',
										transition: 'background 0.3s ease',
									},
									background: '#f2f6fc',
									borderRadius: '7px',
									'& input[type=number]::-webkit-inner-spin-button': {
										'-webkit-appearance': 'none',
									},
								}}
								disabled
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
