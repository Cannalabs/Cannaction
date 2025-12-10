import React, { useEffect, useState } from 'react';
import { Autocomplete, Grid, TextField } from '@mui/material';
import DatePickerComponent from '../../../../components/datePickerComponent/DatePickerComponent';
import CustomGrid from '../../../../components/cards/customGrid/CustomGrid';
import CustomPieChart from '../../../../components/customPieChart/CustomPieChart';
import CustomBarChart from '../../../../components/customBarChart/CustomBarChart';
// import CustomButton from '../../../../components/customButton/CustomButton';
import { useItemLabeled } from '../../../../hooks/querys/item/useItemLabeled';
import DataTable from '../../../../components/tableDinamic';
import { StyledPatterInput } from '../../../../components/customSelect/styles';
import { columnsSalesProduct } from './dataSales';
import {
	PercentageColorEnum,
	getStatusChipPercentage,
} from '../../../../models/enums/percentageColor.enum';
import PaginationFilterSalesRequest from '../../../../dtos/requests/paginationFilterSalesRequest';
import { useSalesStoreUser } from '../../../../hooks/querys/sale/useSalesStoreUser';
import { getRandomColor } from '../../../../utils/string';

interface ChartsData {
	name: string;
	value: number;
	color: string;
}

const SalesReport: React.FC = () => {
	const { items } = useItemLabeled();
	const [limit, setLimit] = useState(10);
	const [endDate, setEndDate] = useState('');
	const [beginDate, setBeginDate] = useState('');
	const [search, setSearch] = useState('');
	const [searchConfirmed, setSearchConfirmed] = useState('');
	const [barGraph, setBarGraph] = useState<ChartsData[]>([]);
	const [pieGraph, setPieGraph] = useState<ChartsData[]>([]);
	const [itemFilter, setItemFilter] = useState<number | undefined>();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [currentPage, setCurrentPage] = useState<number>(1);

	const filter: PaginationFilterSalesRequest = {
		search: searchConfirmed,
		itemId: itemFilter,
		dateBegin: beginDate,
		dateEnd: endDate,
		page: currentPage,
		take: limit,
		byStore: false,
	};

	const { data, isLoading, refetch, isRefetching } = useSalesStoreUser(filter);

	useEffect(() => {
		refetch();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (!data || !data.sales) {
			setBarGraph([]);
		} else {
			setBarGraph(
				data?.sales.map((sale) => ({
					name: sale.name,
					value: sale.amount,
					color: getRandomColor(),
				}))
			);
		}
	}, [data]);

	useEffect(() => {
		if (!data || !data.sales) {
			setPieGraph([]);
		} else {
			setPieGraph(
				data?.sales.map((sale) => ({
					name: sale.name,
					value: sale.percentage,
					color: getRandomColor(),
				}))
			);
		}
	}, [data]);

	// const handleClear = () => {
	// 	setItemFilter(undefined);
	// 	setBeginDate('');
	// 	setEndDate('');
	// };

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
				<Grid container spacing={2}>
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
									placeholder="Choose Products"
									variant="outlined"
									value={items}
								/>
							)}
						/>
					</Grid>

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

				<Grid item xs={12} mt={'6px'} display="flex" alignItems="center">
					{/* <Grid width="100%" mr="1rem" height="100%"> 
						<CustomButton type="button">Filter</CustomButton>
					</Grid>

					<Grid width="100%" height="100%">
						<CustomButton onClick={handleClear} type="button">
							Clear
						</CustomButton>
					</Grid>*/}
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
				<DataTable
					download
					hasPagination
					hasInteraction
					hasSearch
					itemCount={data?.meta?.itemCount ?? 0}
					onPageChange={setCurrentPage}
					onLimitChange={setLimit}
					titleTable="Sales"
					meta={data?.meta}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					search={search}
					setSearch={setSearch}
					setSearchConfirmed={setSearchConfirmed}
					columns={columnsSalesProduct}
					rows={data?.sales.map((sales) => ({
						product: sales.name,
						// date: sales.country,
						sales: sales.amount,
						percent: getStatusChipPercentage(
							sales.percentage < 2
								? PercentageColorEnum.DECREASE
								: PercentageColorEnum.ADDITION,
							sales.percentage
						),
					}))}
					isLoading={isLoading || isRefetching}
					limit={limit}
				/>
			</Grid>

			<Grid
				container
				display="flex"
				justifyContent="space-between"
				xs={4.8}
				sm={12}
				columns={{ xs: 2, sm: 8, md: 12 }}
				mb={4}
			>
				<Grid item xs={12} sm={5.8} columns={{ xs: 2, sm: 8, md: 12 }}>
					<CustomGrid title="Sales Graphic">
						<CustomBarChart data={barGraph} title="" />
					</CustomGrid>
				</Grid>

				<Grid item xs={12} sm={5.8} columns={{ xs: 2, sm: 8, md: 12 }}>
					<CustomGrid title="Sales Graphic by Store">
						<CustomPieChart data={pieGraph} title="" />
					</CustomGrid>
				</Grid>
			</Grid>
		</div>
	);
};

export default SalesReport;
