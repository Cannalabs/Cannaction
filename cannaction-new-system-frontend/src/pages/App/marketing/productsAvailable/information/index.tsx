import {
	Autocomplete,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FormValues } from '../form/formValues';
import FormikHook from '../../../../../models/interfaces/FormikHook';
import { inputPreventSubmit } from '../../../../../utils/form';
import { ItemType } from '../../../../../models/enums/itemType.enum';
import { ClothingSize } from '../../../../../models/enums/clothingSize.enum';
import { StoreType } from '../../../../../hooks/querys/store/useStoreLabeledByCountry';
import BarcodeDisplay from './BarCode';
import { useStoreLabeled } from '../../../../../hooks/querys/store/useLabeledStores';
import useDisableNumberInputScroll from '../../../../../hooks/useDisabledScrollNumberInput';
import { useTranslation } from 'react-i18next';

interface Props {
	formik: FormikHook<FormValues>;
	isDetails: boolean;
	isLoading: boolean;
}

export const Information: React.FC<Props> = ({
	formik,
	isDetails,
	isLoading,
}) => {
	const { handleChange, setFieldValue, values } = formik;
	const disabledType = values.id ? true : isDetails;
	const { stores, isLoading: loading } = useStoreLabeled();
	const [initialStores, setInitialStores] = useState<StoreType[]>([]);
	useDisableNumberInputScroll();
	const {t} = useTranslation();

	useEffect(() => {
		const selectedStores = stores.filter((store: StoreType) =>
			values.storeIds.includes(store.value)
		);
		setInitialStores(selectedStores);
	}, [stores, values.storeIds]);

	return (
		<div className="col-lg-8">
			<div className="card mb-4">
				<div className="card-header">{t('marketing.addProduct.productInformation')}</div>
				<div className="card-body">
					<div className="row">
						<div className="col-md-6 mb-3" id="col-category">
							<FormControl fullWidth>
								<InputLabel id="category">{t('marketing.addProduct.productCategoryDropdown')}</InputLabel>
								<Select
									id="category"
									label={t('marketing.addProduct.productCategoryDropdown')}
									disabled={disabledType || isLoading}
									name="type"
									className="selectpicker w-100"
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
						<div className="col-md-6 mb-3" id="col-size">
							{values.type === ItemType.CLOTHING && (
								<FormControl fullWidth>
									<InputLabel id="size">{t('marketing.addProduct.productSize')}</InputLabel>
									<Select
										label={t('marketing.addProduct.productSize')}
										name="size"
										className="selectpicker w-100"
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
							)}
						</div>
						<div className="mb-3">
							<FormControl fullWidth>
								<InputLabel id="exchange">{t('marketing.addProduct.productType')}</InputLabel>
								<Select
									label="Product Type"
									name="exchange"
									size="small"
									disabled={isDetails || isLoading}
									value={values.exchange == false ? 'sale' : 'exchange'}
									onChange={(e) => {
										const value = e.target.value as string;
										setFieldValue('exchange', value === 'exchange');
									}}
									onKeyDown={inputPreventSubmit}
								>
									<MenuItem value="sale">{t('marketing.salesReport.salesTableTitle')}</MenuItem>
									<MenuItem value="exchange">{t('marketing.promoReport.exchange')}</MenuItem>
								</Select>
							</FormControl>
						</div>
						<div className="mb-3">
							<TextField
								disabled={isDetails || isLoading}
								fullWidth
								placeholder={t('marketing.addProduct.nameInput')}
								label={t('marketing.addProduct.nameInput')}
								value={values.name}
								onChange={handleChange}
								name="name"
							/>
						</div>
						<div className="mb-3">
							<TextField
								fullWidth
								placeholder={t('marketing.addProduct.descriptionInput')}
								label={t('marketing.addProduct.descriptionInput')}
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
								type="number"
								fullWidth
								placeholder={t('marketing.addProduct.pointsInput')}
								label={t('marketing.addProduct.pointsInput')}
								name="points"
								disabled={isDetails || isLoading}
								value={values.points ?? ''}
								onChange={handleChange}
								sx={{
									'& input[type=number]::-webkit-inner-spin-button': {
										'-webkit-appearance': 'none',
									},
								}}
							/>
						</div>
						<div className="mb-3">
							<div className="row mb-3">
								<Autocomplete
									disablePortal
									disabled={isLoading || loading}
									multiple
									options={stores}
									value={initialStores}
									getOptionLabel={(option) => option.label}
									isOptionEqualToValue={(option, value) => option.value === value.value}
									onChange={(_, selectedOptions) => {
										const selectedValues = selectedOptions.map((option) => option.value);
										setFieldValue('storeIds', selectedValues);
										setInitialStores(selectedOptions);
									}}
									renderInput={(params) => (
										<TextField
											{...params}
											variant="outlined"
											placeholder={t('marketing.dashboard.storesTitleBox')}
											label={t('marketing.dashboard.storesTitleBox')}
										/>
									)}
								/>
							</div>
							<div className="row ">
								<BarcodeDisplay formik={formik} barcodes={values.barcodes} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
