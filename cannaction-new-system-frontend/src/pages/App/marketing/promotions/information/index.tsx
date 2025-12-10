import {
	Autocomplete,
	Button,
	FormControl,
	LinearProgress,
	TextField,
	Tooltip,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useItemLabeled } from '../../../../../hooks/querys/item/useItemLabeled';
import {
	StoreType,
	useStoreLabeledByCountry,
} from '../../../../../hooks/querys/store/useStoreLabeledByCountry';
import { StyledPatterInput } from '../../../../../components/customSelect/styles';
import { FormValues } from '../form/formValues';
import FormikHook from '../../../../../models/interfaces/FormikHook';
import { useAuth } from '../../../../../contexts/Auth';
import { UserTypeEnum } from '../../../../../models/enums/userType.enum';
import { useCountriesLabeled } from '../../../../../hooks/querys/country/useCountryLabeled';
import { DateTime } from 'luxon';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import useDisableNumberInputScroll from '../../../../../hooks/useDisabledScrollNumberInput';
import { useTranslation } from 'react-i18next';

interface Props {
	formik: FormikHook<FormValues>;
	isLoading: boolean;
	isRefetching: boolean;
}

export const Information: React.FC<Props> = ({
	formik: { handleChange, values, setFieldValue, isSubmitting },
	isLoading,
	isRefetching,
}) => {
	const { userTypeLogged, userCountry } = useAuth();
	const { countries } = useCountriesLabeled();
	const { items } = useItemLabeled();
	const { stores, refetch: refetchStores } = useStoreLabeledByCountry(
		userTypeLogged === UserTypeEnum.MARKETING && userCountry
			? userCountry
			: values.countryId
	);
	const [initialStores, setInitialStores] = useState<StoreType[]>([]);
	const { t } = useTranslation();

	useDisableNumberInputScroll();

	useEffect(() => {
		const selectedStores = stores.filter((store) =>
			values.storeIds.includes(store.value)
		);
		setInitialStores(selectedStores);
	}, [stores, values.storeIds]);

	useEffect(() => {
		refetchStores();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values.countryId]);

	return (
		<div className="col-lg-8">
			<div className="card mb-4">
				<div className="card-header">
					{t('marketing.addPromotion.PromotionInformation')}
				</div>
				<div className="card-body">
					<div className="row">
						<div className="col-md-8 mb-3" id="col-category">
							<FormControl fullWidth>
								<Autocomplete
									disablePortal
									sx={StyledPatterInput}
									options={items}
									onChange={(_, value) => setFieldValue('itemId', value?.value)}
									fullWidth
									value={items.find((f) => f.value === values.itemId) || null}
									renderInput={(params) => (
										<TextField
											{...params}
											variant="outlined"
											label={t('marketing.addPromotion.itemListDropdown')}
											className="selectpicker w-100"
										/>
									)}
								/>
							</FormControl>
						</div>

						<div className="mb-3">
							<TextField
								fullWidth
								placeholder={`${t(
									'marketing.promotions.promotionsTablePromotionColumn'
								)} ${t('marketing.addPromotion.nameInput')}`}
								value={values.name}
								onChange={handleChange}
								name="name"
								label="Name"
							/>
						</div>
						<div className="mb-3">
							<TextField
								fullWidth
								label={t('marketing.promoReport.detailsModalDescription')}
								placeholder={t('marketing.promoReport.detailsModalDescription')}
								value={values.emailText}
								onChange={handleChange}
								rows={4}
								multiline
								name="emailText"
							/>
						</div>
						<div className="mb-3">
							<div className="row">
								<div className="col-md-6 mb-3">
									{userTypeLogged === UserTypeEnum.SUPER && (
										<Autocomplete
											disablePortal
											sx={StyledPatterInput}
											options={countries}
											fullWidth
											value={
												userTypeLogged === UserTypeEnum.SUPER
													? countries.find((c) => c.value === values.countryId) || null
													: countries.find((c) => c.value === userCountry)
											}
											onChange={(_, value) => {
												userTypeLogged === UserTypeEnum.SUPER
													? setFieldValue('countryId', value?.value)
													: setFieldValue('countryId', userCountry);
											}}
											renderInput={(params) => (
												<TextField
													{...params}
													placeholder={t('marketing.promoReport.CountryDropDown')}
													variant="outlined"
													label="Country"
													className="selectpicker w-100"
													value={countries}
												/>
											)}
										/>
									)}
								</div>
								<div className="col-md-6 ">
									<TextField
										fullWidth
										disabled={isSubmitting || isLoading}
										type="number"
										label={t('marketing.addPromotion.couponsInput')}
										placeholder={t('marketing.addPromotion.promotionMaxCoupons')}
										value={values.maxCoupons ? values.maxCoupons : ''}
										onChange={handleChange}
										name="maxCoupons"
										sx={{
											'& input[type=number]::-webkit-inner-spin-button': {
												'-webkit-appearance': 'none',
											},
										}}
									/>
								</div>
							</div>
						</div>
						<div
							className="row"
							style={{
								justifyContent: 'space-between',
							}}
						>
							<div className="col-md-6 mb-3">
								<DatePicker
									sx={{
										width: '100%',
										'.MuiInputBase-root': {
											// height: '38px',
											fontSize: '0.8rem',
										},
										'.MuiOutlinedInput-root': {
											// height: '38px',
										},
									}}
									label={t('marketing.addPromotion.beginDateInput')}
									format="yyyy/MM/dd"
									value={values.beginDate ? DateTime.fromISO(values.beginDate) : null}
									onChange={(date: string | null) => {
										return setFieldValue('beginDate', date);
									}}
								/>
							</div>
							<div className="col-md-6 mb-3">
								<DatePicker
									sx={{
										width: '100%',
										'.MuiInputBase-root': {
											fontSize: '0.8rem',
										},
									}}
									label={t('marketing.addPromotion.endDateInput')}
									format="yyyy/MM/dd"
									value={values.finalDate ? DateTime.fromISO(values.finalDate) : null}
									onChange={(date: string | null) => {
										return setFieldValue('finalDate', date);
									}}
								/>
							</div>
						</div>

						<div className="row">
							<div className="col-md-6">
								{isLoading || isRefetching ? (
									<LinearProgress />
								) : (
									<Autocomplete
										disablePortal
										multiple
										sx={StyledPatterInput}
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
												placeholder={t('marketing.addPromotion.storesDropdown')}
												label={t('marketing.addPromotion.storesDropdown')}
												className="selectpicker w-100"
											/>
										)}
									/>
								)}
							</div>
							<div className="col-md-2 mb-3">
								<Tooltip title="Select All" placement="top">
									<Button
										variant="contained"
										onClick={() => {
											const selectedStores = stores.map((o) => o.value);
											setFieldValue('storeIds', selectedStores);
											setInitialStores(stores);
										}}
										className="btn btn-primary w-100"
									>
										{t('marketing.addPromotion.selectAll')}
									</Button>
								</Tooltip>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
