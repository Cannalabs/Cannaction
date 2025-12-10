import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { CardLift } from '../../../../components/cardLift';
import CustomGrid from '../../../../components/cards/customGrid/CustomGrid';
import CustomBarChart from '../../../../components/customBarChart/CustomBarChart';
import CustomPieChart from '../../../../components/customPieChart/CustomPieChart';
import { ShopsPerCountry } from './shopsPerCountry';
import { UsersPerCountry } from './usersPerCountry';
import { useDashboardData } from '../../../../hooks/querys/country/useDashboardData';
import { ChartData } from '../../../../models/interfaces/ChartData';
import { RequestedPrizeTargets } from './RequestedPrizeTargets';
import { getCurrentYear } from '../../../../utils/string';
import { useAuth } from '../../../../contexts/Auth';
import { UserTypeEnum } from '../../../../models/enums/userType.enum';
import { useTranslation } from 'react-i18next';

const Dashboard: React.FC = () => {
	const { userTypeLogged } = useAuth();
	const [salesByCountry, setSalesByCountry] = useState<ChartData[]>([]);
	const [mostSoldItemList, setMostSoldItemList] = useState<ChartData[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { data: lists, isRefetching, isLoading, refetch } = useDashboardData();
	const year = getCurrentYear();
	const { t } = useTranslation();

	useEffect(() => {
		setSalesByCountry(lists?.salesByCountry ? lists.salesByCountry : []);
		setMostSoldItemList(
			lists?.itemSalesByCountry ? lists.itemSalesByCountry : []
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lists]);

	useEffect(() => {
		setLoading(isRefetching || isLoading);
	}, [isLoading, isRefetching]);

	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="container-xl px-4 mt-n10">
			<CardLift />
			<RequestedPrizeTargets />
			<div className="row">
				<ShopsPerCountry
					shops={lists ? lists.storesByCountry : []}
					loading={loading}
				/>
				<UsersPerCountry
					users={lists ? lists.usersByCountry : []}
					loading={loading}
				/>
			</div>
			{!loading && (
				<Grid
					container
					display="flex"
					justifyContent="space-between"
					xs={4.8}
					sm={12}
					columns={{ xs: 2, sm: 8, md: 12 }}
				>
					<Grid item xs={12} sm={5.8} columns={{ xs: 2, sm: 8, md: 12 }}>
						<CustomGrid
							title={`${t('marketing.dashboard.salesTitle')}${
								userTypeLogged == UserTypeEnum.SUPER
									? ' '
									: ` ${t('marketing.dashboard.byYear')}`
							} - ${year}`}
						>
							{salesByCountry.length > 0 ? (
								<CustomPieChart data={salesByCountry} title="" />
							) : (
								<div>{t('marketing.dashboard.noSalesYet')}</div>
							)}
						</CustomGrid>
					</Grid>

					<Grid item xs={12} sm={5.8} columns={{ xs: 2, sm: 8, md: 12 }}>
						<CustomGrid
							title={`${t('marketing.dashboard.bestSellingTitle')} ${year}`}
						>
							{mostSoldItemList.length > 0 ? (
								<CustomBarChart data={mostSoldItemList} title="" />
							) : (
								<div>{t('marketing.dashboard.noSalesYet')}</div>
							)}
						</CustomGrid>
					</Grid>
				</Grid>
			)}
		</div>
	);
};

export default Dashboard;
