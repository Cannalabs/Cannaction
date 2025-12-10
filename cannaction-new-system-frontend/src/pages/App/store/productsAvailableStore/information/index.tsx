import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import React from 'react';
import FormikHook from '../../../../../models/interfaces/FormikHook';
import { inputPreventSubmit } from '../../../../../utils/form';
import { ItemType } from '../../../../../models/enums/itemType.enum';
import { ClothingSize } from '../../../../../models/enums/clothingSize.enum';
import { StyledPatterInput } from '../../../../../components/customSelect/styles';
import { FormValues } from '../form/formValues';

interface Props {
	formik: FormikHook<FormValues>;
	isDetails: boolean;
	isLoading: boolean;
}

export const Information: React.FC<Props> = ({
	formik: { handleChange, setFieldValue, values },
	isDetails,
	isLoading,
}) => {
	return (
		<div className="col-lg-8">
			<div className="card mb-4">
				<div className="card-header">Product Information</div>
				<div className="card-body">
					<div className="row">
						<div className="col-md-6 mb-3" id="col-category">
							<FormControl fullWidth>
								<InputLabel id="category">Product Category</InputLabel>
								<Select
									sx={StyledPatterInput}
									id="category"
									label="Product Category"
									// disabled={disabledType || isLoading}
									disabled={true}
									name="type"
									value={values.type || ''}
									onChange={(e) => {
										const value = e.target.value as string;
										setFieldValue('type', value === '' ? null : (value as ItemType));
									}}
									onKeyDown={inputPreventSubmit}
								>
									<MenuItem value="" />
									<MenuItem value={ItemType.CLOTHING}>Clothing</MenuItem>
									<MenuItem value={ItemType.OTHERS}>Others</MenuItem>
								</Select>
							</FormControl>
						</div>
						{values.type === ItemType.CLOTHING && (
							<div className="col-md-6 mb-3" id="col-size">
								<FormControl fullWidth>
									<InputLabel id="size">Product Size</InputLabel>
									<Select
										sx={StyledPatterInput}
										label="Product Size"
										name="size"
										disabled={isDetails || isLoading}
										value={values.size || ''}
										onChange={(e) => {
											const value = e.target.value as string;
											setFieldValue('size', value === '' ? null : (value as ClothingSize));
										}}
										onKeyDown={inputPreventSubmit}
									>
										<MenuItem value="" />
										<MenuItem value={ClothingSize.S}>S</MenuItem>
										<MenuItem value={ClothingSize.M}>M</MenuItem>
										<MenuItem value={ClothingSize.L}>L</MenuItem>
										<MenuItem value={ClothingSize.XL}>XL</MenuItem>
										<MenuItem value={ClothingSize.XXL}>XXL</MenuItem>
									</Select>
								</FormControl>
							</div>
						)}
						<div className="mb-3">
							<TextField
								disabled={isDetails || isLoading}
								fullWidth
								placeholder="Product Name"
								label="Product Name"
								value={values.name}
								onChange={handleChange}
								name="name"
								sx={StyledPatterInput}
							/>
						</div>
						<div className="mb-3">
							<TextField
								sx={StyledPatterInput}
								fullWidth
								placeholder="Product Description"
								label="Product Description"
								multiline
								disabled={isDetails || isLoading}
								rows={4}
								value={values.description}
								onChange={handleChange}
								name="description"
							/>
						</div>
						<div className="mb-3">
							<TextField
								sx={StyledPatterInput}
								fullWidth
								placeholder="Points"
								label="Points"
								disabled={isDetails || isLoading}
								value={values.points}
								name="points"
							/>
						</div>
						{/* 
						<div className="mb-3">
							<TextField
		 				fullWidth
		 				placeholder="Bar Code"
		 				name="barCode"
		 				disabled={isDetails || isLoading}
		 				value={values.barCode}
		 				onChange={handleChange}
		 				sx={{
		 					'& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
		 						borderRadius: '7px',
		 						transition: 'background 0.3s ease',
		 					},
		 				}}
		 			/>
						</div>
						*/}
					</div>
				</div>
			</div>
		</div>
	);
};
