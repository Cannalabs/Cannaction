import React, { useEffect, useState } from 'react';
import { Autocomplete, IconButton, TextField, Tooltip } from '@mui/material';
import DatePickerComponent from '../../../../components/datePickerComponent/DatePickerComponent';
import { useCountriesLabeled } from '../../../../hooks/querys/country/useCountryLabeled';
import { StyledPatterInput } from '../../../../components/customSelect/styles';
import { useItemLabeled } from '../../../../hooks/querys/item/useItemLabeled';
import DataTable from '../../../../components/tableDinamic';
import { usePromotionsColumns } from './dataPromotions';
import { BsEye } from '../../../../themes/icons';
import { MoreInformationModal } from '../../../../components/modals/moreInformation';
import { useAuth } from '../../../../contexts/Auth';
import { UserTypeEnum } from '../../../../models/enums/userType.enum';
import { useCoupons } from '../../../../hooks/querys/coupon/useCoupons';
import { formatDate } from '../../../../utils/string';
import { CouponEntity } from '../../../../models/entities/CouponEntity';
import { MoreInfo } from './moreInfo';
import { useTranslation } from 'react-i18next';
// import CustomButton from '../../../../components/customButton/CustomButton';

const PromoReport: React.FC = () => {
	const { userTypeLogged, userCountry } = useAuth();
	const { countries } = useCountriesLabeled();
	const { items } = useItemLabeled();
	const [countryFilter, setCountryFilter] = useState<number | undefined>(
		userTypeLogged === UserTypeEnum.SUPER ? undefined : userCountry
	);
	const [itemFilter, setItemFilter] = useState<number | undefined>();
	const [beginDate, setBeginDate] = useState<string | undefined>('');
	const [endDate, setEndDate] = useState<string | undefined>('');
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [limit, setLimit] = useState(10);
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState('');
	const [searchConfirmed, setSearchConfirmed] = useState('');
	const [coupon, setCoupon] = useState<CouponEntity>();
	const { t } = useTranslation();

	const {
		data: listCoupons,
		isLoading,
		refetch,
		isRefetching,
	} = useCoupons({
		search: searchConfirmed,
		countryId: countryFilter,
		itemId: itemFilter,
		dateBegin: beginDate,
		dateEnd: endDate,
		take: limit,
		page: currentPage,
	});

	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchConfirmed]);

	const handleOpen = (selectedCoupon: CouponEntity) => {
		setCoupon(selectedCoupon);
		setOpen(true);
	};
	const handleClose = () => {
		setCoupon(undefined);
		setOpen(false);
	};

	const { columnsPromotions } = usePromotionsColumns();

	return (
		<div className="container-xl px-4 mt-n10">
			<div className="row">
				<div className="col-xxl-12 col-xl-12 mb-4">
					<div className="card h-100">
						<div className="card-body">
							<div className="row">
								<aside className="col-lg-12">
									<div className="row">
										<div className="col-md-12">
											<div className="row">
												<div className="col-md-3 col-12 mt-3">
													<Autocomplete
														disablePortal
														sx={StyledPatterInput}
														options={items}
														fullWidth
														value={items.find((c) => c.value === itemFilter) || null}
														onChange={(_, value) => setItemFilter(value?.value)}
														renderInput={(params) => (
															<TextField
																{...params}
																placeholder={t('marketing.promoReport.ItemDropDown')}
																variant="outlined"
																value={items}
															/>
														)}
													/>
												</div>
												<div className="col-md-3 col-12 mt-3">
													{userTypeLogged === UserTypeEnum.SUPER && (
														<Autocomplete
															disablePortal
															sx={StyledPatterInput}
															options={countries}
															fullWidth
															value={countries.find((c) => c.value === countryFilter) || null}
															onChange={(_, value) => setCountryFilter(value?.value)}
															renderInput={(params) => (
																<TextField
																	{...params}
																	placeholder={t('marketing.promoReport.CountryDropDown')}
																	variant="outlined"
																	value={countries}
																/>
															)}
														/>
													)}
												</div>
												<div className="col-md-3 col-12 mt-3">
													<DatePickerComponent
														term="Init"
														onChange={(e) => {
															if (!e) {
																setBeginDate('');
																return;
															}
															const date = e.c;
															setBeginDate(
																`${date.year}/${
																	date.month < 10 ? `0${date.month}` : date.month
																}/${date.day < 10 ? `0${date.day}` : date.day}`
															);
														}}
														value={beginDate}
													/>
												</div>
												<div className="col-md-3 col-12 mt-3">
													<DatePickerComponent
														term="End"
														onChange={(e) => {
															if (!e) {
																setBeginDate('');
																return;
															}
															const date = e.c;
															setEndDate(
																`${date.year}/${
																	date.month < 10 ? `0${date.month}` : date.month
																}/${date.day < 10 ? `0${date.day}` : date.day}`
															);
														}}
														value={endDate}
													/>
												</div>
											</div>
										</div>
									</div>
								</aside>
							</div>
						</div>
					</div>
				</div>
			</div>

			<DataTable
				limit={limit}
				meta={listCoupons?.meta}
				itemCount={listCoupons?.meta?.itemCount ?? 0}
				onPageChange={setCurrentPage}
				onLimitChange={setLimit}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				hasSearch
				titleTable={t('marketing.promoReport.couponsTableTitle')}
				search={search}
				setSearch={setSearch}
				setSearchConfirmed={setSearchConfirmed}
				columns={columnsPromotions}
				rows={listCoupons?.data?.map((coupon) => ({
					promoCode: coupon?.keyCode,
					promotion: coupon.promotion
						? coupon.promotion.name
						: t('marketing.promoReport.exchange'),
					item: coupon.item?.name,
					date: formatDate(coupon.checkedDate),
					customer: `${coupon.user?.name} ${coupon.user?.lastName}`,
					store: coupon.store?.name,
					country: coupon.store?.country.name,
					actions: (
						<Tooltip title={t('marketing.promoReport.actionsColumnDetailsTooltip')}>
							<IconButton
								onClick={() => {
									handleOpen(coupon);
								}}
							>
								<BsEye color="#0D675E" />
							</IconButton>
						</Tooltip>
					),
				}))}
				hasInteraction
				isLoading={isLoading || isRefetching}
			/>

			<MoreInformationModal
				title={t('marketing.promoReport.detailsModalTitle')}
				open={open}
				handleClose={handleClose}
			>
				<MoreInfo coupon={coupon} />
			</MoreInformationModal>
		</div>
	);
};

export default PromoReport;
