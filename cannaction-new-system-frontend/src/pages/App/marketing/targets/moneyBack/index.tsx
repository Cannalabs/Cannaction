import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { MoneyBackTable } from './moneyBackTable';
import { TargetsReachedOrExpiredTable } from './targetsReachedOrExpiredTable';
import CustomGrid from '../../../../../components/cards/customGrid/CustomGrid';
import CustomBarChart from '../../../../../components/customBarChart/CustomBarChart';
import CustomPieChart from '../../../../../components/customPieChart/CustomPieChart';
import { StoreTargetMarketingResponse } from '../../../../../dtos/responses/MarketingStoreTargetResponse';
import { ChartData } from '../../../../../models/interfaces/ChartData';
import { getRandomColor } from '../../../../../utils/string';

interface Props {
	storeTargets: StoreTargetMarketingResponse | undefined;
	loading: boolean;
	handleTargetStatus: (id: number, status: boolean) => void;
	handleDeleteTarget: (id: number) => void;
	setSearchConcluded: React.Dispatch<React.SetStateAction<string>>;
	setSearchNotConcluded: React.Dispatch<React.SetStateAction<string>>;
	limit: number;
	setLimit: (limit: number) => void;
	currentPage: number;
	setCurrentPage: (page: number) => void;
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
}
export const MoneyBack: React.FC<Props> = ({
	storeTargets,
	loading,
	handleTargetStatus,
	handleDeleteTarget,
	setSearchConcluded,
	setSearchNotConcluded,
	limit,
	setLimit,
	currentPage,
	setCurrentPage,
	search,
	setSearch,
}) => {
	const [pieChartData, setPieChartData] = useState<ChartData[]>([]);
	const [barchartData, setBarChartData] = useState<ChartData[]>([]);

	useEffect(() => {
		if (storeTargets == undefined) return;
		const prizeStoreList: ChartData[] = [];
		const prizeCountryList: ChartData[] = [];

		for (const prizeStore of storeTargets.prizeGraphicByStore) {
			prizeStoreList.push({
				name: prizeStore.name,
				value: prizeStore.value,
				color: getRandomColor(),
			});
		}

		for (const prizeCountry of storeTargets.prizeGraphicByCountry) {
			prizeCountryList.push({
				name: prizeCountry.name,
				value: prizeCountry.value,
				color: getRandomColor(),
			});
		}

		setPieChartData(prizeCountryList);
		setBarChartData(prizeStoreList);
	}, [storeTargets]);

	return (
		<>
			<MoneyBackTable
				notConcluded={storeTargets?.notConcluded ?? undefined}
				loading={loading}
				handleTargetStatus={handleTargetStatus}
				handleDeleteTarget={handleDeleteTarget}
				setSearchNotConcluded={setSearchNotConcluded}
				limit={limit}
				setLimit={setLimit}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				search={search}
				setSearch={setSearch}
			/>
			<TargetsReachedOrExpiredTable
				concluded={storeTargets?.concluded ?? undefined}
				loading={loading}
				setSearchConcluded={setSearchConcluded}
				limit={limit}
				setLimit={setLimit}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				search={search}
				setSearch={setSearch}
			/>
			<Grid
				container
				display="flex"
				justifyContent="space-between"
				xs={4.8}
				sm={12}
				mt={2}
				columns={{ xs: 2, sm: 8, md: 12 }}
			>
				<Grid item xs={12} sm={5.8} columns={{ xs: 2, sm: 8, md: 12 }}>
					<CustomGrid title="Prize Graphic by Store">
						<CustomBarChart data={barchartData} title="" />
					</CustomGrid>
				</Grid>
				<Grid item xs={12} sm={5.8} columns={{ xs: 2, sm: 8, md: 12 }}>
					<CustomGrid title="Prize Graphic by Country">
						<CustomPieChart data={pieChartData} title="" />
					</CustomGrid>
				</Grid>
			</Grid>
		</>
	);
};
