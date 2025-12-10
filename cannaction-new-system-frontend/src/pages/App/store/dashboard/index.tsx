import React, { useEffect, useState } from 'react';
import { StoreTarget } from './moneyback';
import { UserTarget } from './userTarget';
import { MiniCards } from './miniCards';
// import { ChartsSection } from './charts';
import { Footer } from '../../../../components/footer';
import { useStoreDashboard } from '../../../../hooks/querys/store/useStoreDashboard';
import { Button, Grid } from '@mui/material';
import { Loading } from '../../../../components/loading';
import { useNavigate } from 'react-router-dom';
import { useExtracts } from '../../../../hooks/querys/extract/useExtracts';
import DataTable from '../../../../components/tableDinamic';
import {
	ExtractOperatorEnum,
	getStatusChipExtractOperator,
} from '../../../../models/enums/ExtractOperator.enum';
import { formatDate } from '../../../../utils/string';
import { useStockForStoreDashboard } from '../../../../hooks/querys/stock/useStockForStoreDashboard';
import { FaUserFriends } from 'react-icons/fa';
import BrosweStats from '../../../../assets/img/illustrations/browser-stats.svg';
import Processing from '../../../../assets/img/illustrations/processing.svg';
import Windows from '../../../../assets/img/illustrations/windows.svg';
import { useAuth } from '../../../../contexts/Auth';
import { useUser } from '../../../../hooks/querys/user/useUser';
import { FiTarget } from 'react-icons/fi';
import { useUserNotifications } from '../../../../hooks/querys/notification/useUserNotifications';
import { Notification } from '../notificationStore/Notification';
import NotificationService from '../../../../services/NotificationService';
import { MoreInformationModal } from '../../../../components/modals/moreInformation';
import { ScanClubCardModal } from './ScanClubCardModal';
import { usePointsStatementColumns } from '../pointsStatementStore/dataPointsStatement';
import { useTranslation } from 'react-i18next';

export const DashboardStore: React.FC = () => {
	const { data, isRefetching, isLoading, refetch } = useStoreDashboard();
	const [search, setSearch] = useState('');
	const [searchConfirmed, setSearchConfirmed] = useState('');
	const [limit, setLimit] = useState(10);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [open, setOpen] = useState<boolean>(false);

	const { pointRegistrationColumn, stockColumn } = usePointsStatementColumns();
	const {
		data: extracts,
		isRefetching: refetchingExtracts,
		refetch: refetchExtracts,
		isLoading: isLoadingExtracts,
	} = useExtracts({
		search: searchConfirmed,
		take: limit,
		page: currentPage,
		byStore: true,
	});
	const { data: notifications, refetch: refetchNotifications } =
		useUserNotifications({ dashboard: true });
	const [currentPageStock, setCurrentPageStock] = useState<number>(1);
	const [limitStock, setLimitStock] = useState(10);
	const [searchStock, setSearchStock] = useState('');
	const [searchConfirmedStock, setSearchConfirmedStock] = useState('');

	const {
		data: dataStock,
		refetch: refetchStock,
		isLoading: isLoadingStock,
		isRefetching: isRefetchingStock,
	} = useStockForStoreDashboard({
		search: searchConfirmedStock,
		page: currentPageStock,
		take: limitStock,
	});
	const { userLoggedId } = useAuth();
	const {
		data: user,
		isLoading: loadingUser,
		refetch: refetchUser,
		isRefetching: refetchingUser,
	} = useUser(Number(userLoggedId));
	const loading = isLoading || isRefetching || loadingUser || refetchingUser;
	const navigate = useNavigate();
	const { t } = useTranslation();

	useEffect(() => {
		refetch();
		refetchExtracts();
		refetchStock();
		refetchUser();
		refetchNotifications();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleDetailNotification = async (id: number) => {
		await NotificationService.setNotificationSeen(
			userLoggedId as unknown as number,
			id
		);

		navigate(`/view-detail-notification/${id}`);
	};

	return (
		<section>
			{loading ? (
				<Grid
					container
					justifyContent={'center'}
					alignItems={'center'}
					sx={{ height: '80vh' }}
				>
					<div className="row">
						<div className="col-12">
							<Loading />
						</div>
					</div>
				</Grid>
			) : (
				<>
					<div className="container-xl px-4 mt-4">
						<div className="col-xl-6 mb-6" style={{ marginTop: '6rem' }}>
							<div className="card mb-3">
								<div className="card-body p-4">
									<div className="row align-items-center justify-content-between">
										<h2 className="text-primary">
											{t('store.storeDashboard.welcomeBack')} {user?.name}!
										</h2>
									</div>
									<div className="row align-items-center justify-content-between">
										<h2 className="text-primary">
											{t('store.storeDashboard.storeNameLabel')} {user?.store?.name}
										</h2>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="container-xl px-4">
						<div className="row">
							{notifications &&
								notifications?.map((notification) => (
									<Notification
										name={notification.title}
										description={formatDate(notification.createdAt)}
										active={notification.userNotifications[0].seen}
										onClick={() => handleDetailNotification(notification.id)}
									/>
								))}
						</div>
					</div>
					<div className="container-xl px-4 mt-4">
						<div className="row justify-content-between">
							{data?.storeTarget && <StoreTarget data={data} refetch={refetch} />}
							{data?.userTarget && (
								<UserTarget userTarget={data?.userTarget} refetch={refetch} />
							)}
						</div>
						<div className="row">
							<Grid
								className="col-md-6"
								style={{
									marginTop: '5px',
									marginBottom: '10px',
								}}
							>
								<Button
									onClick={() => {
										navigate(`/sales-points-statement`);
									}}
									variant="contained"
									sx={{ textTransform: 'capitalize' }}
									fullWidth
								>
									{t('store.productScan.subtitle')}
								</Button>
							</Grid>
							<Grid
								className="col-md-6"
								style={{
									marginTop: '5px',
									marginBottom: '10px',
								}}
							>
								<Button
									onClick={() => {
										setOpen(true);
									}}
									variant="contained"
									sx={{ textTransform: 'capitalize' }}
									fullWidth
								>
									{t('store.storeDashboard.scanCard')}
								</Button>
							</Grid>
						</div>
						<div className="row">
							<MiniCards data={data} />
						</div>
						{/* <ChartsSection
							products={data ? data.mostSoldItemList : []}
							sales={data ? data.salesPercentage : 0}
						/> */}
					</div>
				</>
			)}
			<div className="container-xl px-4 mt-4">
				<div className="row">
					<div className="col-xl-4 mb-4">
						<a
							className="card lift h-100"
							style={{ cursor: 'pointer' }}
							onClick={() => navigate('/customers')}
						>
							<div className="card-body d-flex justify-content-center flex-column">
								<div className="d-flex align-items-center justify-content-between">
									<div className="me-3">
										<FaUserFriends className="feather-xl text-green mb-3" />
										<h5>{t('store.routes.customers.title')}</h5>
										<div className="text-muted small">
											{t('store.storeDashboard.quickAccess.customers')}
										</div>
									</div>
									<img
										src={BrosweStats}
										alt="..."
										style={{ width: '8rem' }}
										// style="width: 8rem"
									/>
								</div>
							</div>
						</a>
					</div>
					<div className="col-xl-4 mb-4">
						<a
							className="card lift h-100"
							style={{ cursor: 'pointer' }}
							onClick={() => navigate('/coupons')}
						>
							<div className="card-body d-flex justify-content-center flex-column">
								<div className="d-flex align-items-center justify-content-between">
									<div className="me-3">
										<FiTarget className="feather-xl text-green mb-3" />
										<h5>{t('marketing.addPromotion.couponsInput')}</h5>
										<div className="text-muted small">
											{t('store.storeDashboard.quickAccess.coupons')}
										</div>
									</div>
									<img src={Processing} alt="..." style={{ width: '8rem' }} />
								</div>
							</div>
						</a>
					</div>
					<div className="col-xl-4 mb-4">
						<a
							className="card lift h-100"
							style={{ cursor: 'pointer' }}
							onClick={() => navigate('/promotions')}
						>
							<div className="card-body d-flex justify-content-center flex-column">
								<div className="d-flex align-items-center justify-content-between">
									<div className="me-3">
										<FaUserFriends className="feather-xl text-green mb-3" />
										<h5>{t('marketing.promotions.title')}</h5>
										<div className="text-muted small">
											{t('store.storeDashboard.quickAccess.promotions')}
										</div>
									</div>
									<img src={Windows} alt="..." style={{ width: '8rem' }} />
								</div>
							</div>
						</a>
					</div>
				</div>
			</div>
			<div className="container-xl px-4 mt-4">
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
						titleTable={t('tables.userStore.dashboard.pointRegistration.tableTitle')}
						meta={extracts?.meta}
						itemCount={extracts?.meta?.itemCount ?? 0}
						onPageChange={setCurrentPage}
						onLimitChange={setLimit}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						hasPagination
						hasInteraction
						hasSearch
						search={search}
						setSearch={setSearch}
						setSearchConfirmed={setSearchConfirmed}
						columns={pointRegistrationColumn}
						rows={extracts?.data?.map((points) => ({
							pointRegistration: points.description,
							type: getStatusChipExtractOperator(
								points.operator as ExtractOperatorEnum
							),
							points: points.points,
							quantity: points.amount,
							total: points.total,
							balance: points.balance,
							created: formatDate(points.createdAt),
						}))}
						isLoading={isLoadingExtracts || refetchingExtracts}
						limit={limit}
					/>
				</Grid>
			</div>
			<div className="container-xl px-4 mt-4">
				<DataTable
					titleTable={t('tables.userStore.dashboard.stock.tableTitle')}
					currentPage={currentPageStock}
					setCurrentPage={setCurrentPageStock}
					meta={dataStock?.meta}
					onLimitChange={setLimitStock}
					onPageChange={setCurrentPageStock}
					itemCount={dataStock?.meta.itemCount ?? 0}
					hasPagination
					hasSearch
					search={searchStock}
					setSearch={setSearchStock}
					setSearchConfirmed={setSearchConfirmedStock}
					columns={stockColumn}
					rows={dataStock?.data?.map((stock) => ({
						product: stock?.item.name,
						lastUpdate: formatDate(stock.updatedAt),
						input: stock.input,
						output: stock.output,
						total: stock.total,
					}))}
					isLoading={isLoadingStock || isRefetchingStock}
					limit={limitStock}
				/>
				<MoreInformationModal
					title={t('store.storeDashboard.scanCard')}
					open={open}
					hideSave
					handleClose={() => setOpen(false)}
				>
					<ScanClubCardModal />
				</MoreInformationModal>
			</div>
			<Footer />
		</section>
	);
};
