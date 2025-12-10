import React, { useEffect, useState } from 'react';
import { Autocomplete, Chip, Grid, TextField, Typography } from '@mui/material';
import DatePickerComponent from '../../../../components/datePickerComponent/DatePickerComponent';
import { useCountriesLabeled } from '../../../../hooks/querys/country/useCountryLabeled';
import { useStoreLabeledByCountry } from '../../../../hooks/querys/store/useStoreLabeledByCountry';
import { useItemLabeled } from '../../../../hooks/querys/item/useItemLabeled';
import { useSales } from '../../../../hooks/querys/sale/useSales';
import DataTable from '../../../../components/tableDinamic';
import { StyledPatterInput } from '../../../../components/customSelect/styles';
import PaginationFilterSalesRequest from '../../../../dtos/requests/paginationFilterSalesRequest';
import { useAuth } from '../../../../contexts/Auth';
import { UserTypeEnum } from '../../../../models/enums/userType.enum';
import { useTranslation } from 'react-i18next';
import { useSalesReportColumns } from './dataSales';

const styles = {
	typography: {
		cursor: 'pointer',
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'underline',
		},
	},
};

const SalesReport: React.FC = () => {
	const { userTypeLogged, userCountry } = useAuth();
	const [countryFilter, setCountryFilter] = useState<number | undefined>(
		userTypeLogged === UserTypeEnum.SUPER ? undefined : userCountry
	);
	const { countries } = useCountriesLabeled();
	const { stores, refetch: refetchStores } =
		useStoreLabeledByCountry(countryFilter);
	const { items } = useItemLabeled();
	const [storeFilter, setStoreFilter] = useState<number | undefined>();
	const [itemFilter, setItemFilter] = useState<number | undefined>();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [currentPage, setCurrentPage] = useState<number>(1);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [limit, setLimit] = useState(10);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [search, setSearch] = useState('');
	const [searchConfirmed, setSearchConfirmed] = useState('');
	const [beginDate, setBeginDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [byStore, setByStore] = useState(true);
	const { t } = useTranslation();
	const { columnsSalesProduct, columnsSalesStore } = useSalesReportColumns();

	const filter: PaginationFilterSalesRequest = {
		search: searchConfirmed,
		countryId:
			userTypeLogged === UserTypeEnum.SUPER ? countryFilter : userCountry,
		storeId: storeFilter,
		itemId: itemFilter,
		dateBegin: beginDate,
		dateEnd: endDate,
		page: currentPage,
		take: limit,
		byStore,
	};
	const { data: salesList, isLoading, isRefetching } = useSales(filter);

	useEffect(() => {
		refetchStores();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [countryFilter]);

	const getPercentageColor = (percentage: number) => {
		if (percentage < 24) {
			return '#DC3912';
		} else if (percentage > 24 && percentage < 75) {
			return '#3366CC';
		} else {
			return '#FF9900';
		}
	};

	return (
		<div className="container-xl px-4 mt-n10">
			<Grid
				p="1rem"
				boxShadow="0 0.15rem 1.75rem 0 rgba(33, 40, 50, 0.15)"
				borderRadius=".35rem"
				sx={{ backgroundColor: '#fff' }}
				xs={8.5}
				sm={12}
				columns={{ xs: 2, sm: 8, md: 12 }}
			>
				<Grid container mb={2} gap={2}>
					<Typography
						sx={{
							...styles.typography,
							...(byStore && { textDecoration: 'underline' }),
						}}
						variant="h5"
						color={'#0D675E'}
						onClick={() => setByStore(true)}
					>
						{t('marketing.salesReport.byStore')}
					</Typography>
					{' - '}
					<Typography
						sx={{
							...styles.typography,
							...(!byStore && { textDecoration: 'underline' }),
						}}
						variant="h5"
						color={'#0D675E'}
						onClick={() => setByStore(false)}
					>
						{t('marketing.salesReport.byProduct')}
					</Typography>
				</Grid>
				<Grid
					container
					mb={'1rem'}
					spacing={{ xs: 2, md: 3 }}
					columns={{ xs: 4, sm: 8, md: 12 }}
				>
					<Grid item xs={3.9} sm={4} md={4}>
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
									placeholder={t('marketing.salesReport.ItemDropDown')}
									variant="outlined"
									value={items}
								/>
							)}
						/>
					</Grid>

					{userTypeLogged === UserTypeEnum.SUPER && (
						<Grid item xs={3.9} sm={4} md={4}>
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
										placeholder={t('marketing.salesReport.CountryDropDown')}
										variant="outlined"
										value={countries}
									/>
								)}
							/>
						</Grid>
					)}

					<Grid item xs={3.9} sm={4} md={4}>
						<Autocomplete
							disablePortal
							sx={StyledPatterInput}
							options={stores}
							fullWidth
							value={stores.find((c) => c.value === storeFilter) || null}
							onChange={(_, value) => setStoreFilter(value?.value)}
							renderInput={(params) => (
								<TextField
									{...params}
									placeholder={t('marketing.salesReport.StoreDropDown')}
									variant="outlined"
									value={stores}
								/>
							)}
						/>
					</Grid>
				</Grid>
				<Grid container spacing={2}>
					<Grid item xs={12} md={4}>
						<DatePickerComponent
							term="Initial"
							onChange={(e) => {
								if (!e) {
									setBeginDate('');
									return;
								}
								const date = e.c;
								setBeginDate(
									`${date.year}/${date.month < 10 ? `0${date.month}` : date.month}/${
										date.day < 10 ? `0${date.day}` : date.day
									}`
								);
							}}
							value={beginDate}
						/>
					</Grid>

					<Grid item xs={12} md={4}>
						<DatePickerComponent
							term="Final"
							onChange={(e) => {
								if (!e) {
									setBeginDate('');
									return;
								}
								const date = e.c;
								setEndDate(
									`${date.year}/${date.month < 10 ? `0${date.month}` : date.month}/${
										date.day < 10 ? `0${date.day}` : date.day
									}`
								);
							}}
							value={endDate}
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid
				my="1rem"
				sx={{ background: '#fff' }}
				boxShadow="0 0.15rem 1.75rem 0 rgba(33, 40, 50, 0.15)"
				borderRadius=".35rem"
				xs={4.8}
				sm={12}
				columns={{ xs: 2, sm: 8, md: 12 }}
			>
				{salesList && byStore ? (
					<DataTable
						limit={limit}
						meta={salesList?.meta}
						itemCount={salesList.meta?.itemCount}
						onPageChange={setCurrentPage}
						onLimitChange={setLimit}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						hasPagination
						hasInteraction
						hasSearch
						titleTable={t('marketing.salesReport.salesTableTitle')}
						search={search}
						setSearch={setSearch}
						setSearchConfirmed={setSearchConfirmed}
						columns={columnsSalesStore}
						rows={salesList?.sales?.map((sale) => ({
							store: sale.name,
							country: sale.country,
							sales: sale.amount,
							percent: (
								<Chip
									label={sale.percentage}
									sx={{ background: getPercentageColor(sale.percentage), color: '#fff' }}
								/>
							),
						}))}
						isLoading={isLoading || isRefetching}
					/>
				) : (
					<>
						{salesList && (
							<DataTable
								limit={limit}
								meta={salesList?.meta}
								itemCount={salesList.meta?.itemCount}
								onPageChange={setCurrentPage}
								onLimitChange={setLimit}
								currentPage={currentPage}
								setCurrentPage={setCurrentPage}
								hasPagination
								hasInteraction
								hasSearch
								titleTable={t('marketing.salesReport.salesTableTitle')}
								search={search}
								setSearch={setSearch}
								setSearchConfirmed={setSearchConfirmed}
								columns={columnsSalesProduct}
								rows={salesList?.sales?.map((salesProduct) => ({
									product: salesProduct.name,
									country: salesProduct.country,
									sales: salesProduct.amount,
									percent: (
										<Chip
											label={salesProduct.percentage}
											sx={{
												background: getPercentageColor(salesProduct.percentage),
												color: '#fff',
											}}
										/>
									),
								}))}
								isLoading={isLoading || isRefetching}
							/>
						)}
					</>
				)}
			</Grid>
		</div>
	);
};

export default SalesReport;
