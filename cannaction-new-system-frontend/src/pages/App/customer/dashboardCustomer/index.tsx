import React, { useEffect, useState } from 'react';
import Hero from './hero';
import { Cards } from './cards';
import DataTable from '../../../../components/tableDinamic';
import { columnsPointsRegistration } from './columns';
import { EmblaOptionsType } from 'embla-carousel';
import { EmblaCarousel } from './newCarousel/ItemComponent';
import {
	ExtractOperatorEnum,
	getStatusChipExtractOperator,
} from '../../../../models/enums/ExtractOperator.enum';
import { useExtracts } from '../../../../hooks/querys/extract/useExtracts';
import { formatDate } from '../../../../utils/string';
import { useCouponsByCustomer } from '../../../../hooks/querys/coupon/useCouponsByCustomer';
import { columnsCoupons } from '../couponsCustomer/columns';
import { useUserNotifications } from '../../../../hooks/querys/notification/useUserNotifications';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../contexts/Auth';
import NotificationService from '../../../../services/NotificationService';
import { Notification } from '../notificationCustomer/Notification';
import { useTranslation } from 'react-i18next';

export const DashboardCustomer: React.FC = () => {
	const [search, setSearch] = useState('');
	const [searchConfirmed, setSearchConfirmed] = useState('');
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [limit, setLimit] = useState(10);
	const [searchCoupon, setSearchCoupon] = useState('');
	const [searchConfirmedCoupon, setSearchConfirmedCoupon] = useState('');
	const [limitCoupon, setLimitCoupon] = useState(10);
	const [currentPageCoupon, setCurrentPageCoupon] = useState<number>(1);
	const { data: notifications, refetch: refetchNotifications } =
		useUserNotifications({ dashboard: true });
	const navigate = useNavigate();
	const { userLoggedId } = useAuth();
	const {t} = useTranslation();

	const {
		data: coupons,
		isLoading: isLoadingCoupons,
		refetch: refetchCoupons,
		isRefetching: isRefetchingCoupons,
	} = useCouponsByCustomer({ search: searchConfirmedCoupon });

	const OPTIONS: EmblaOptionsType = { loop: true };

	const { data, isRefetching, refetch, isLoading } = useExtracts({
		search: searchConfirmed,
		take: limit,
		page: currentPage,
	});

	useEffect(() => {
		refetch();
		refetchCoupons();
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
		<div className="container-xl px-4 mt-4">
			<div className="row" style={{ marginTop: '3rem' }}>
				<Hero />
				<EmblaCarousel options={OPTIONS} />
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
			<Cards />
			<div className="row">
				<div className="col-xl-12 col-md-12 col-12">
					<DataTable
						meta={data?.meta}
						itemCount={data?.meta?.itemCount ?? 0}
						onPageChange={setCurrentPage}
						onLimitChange={setLimit}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						hasPagination
						hasInteraction
						hasSearch
						titleTable={t('customer.customerDashboard.pointsStatement.title')}
						search={search}
						setSearch={setSearch}
						setSearchConfirmed={setSearchConfirmed}
						columns={columnsPointsRegistration}
						rows={data?.data.map((points) => ({
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
						isLoading={isLoading || isRefetching}
						limit={limit}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col-xl-12 col-md-12 col-12">
					<DataTable
						isLoading={isLoadingCoupons || isRefetchingCoupons}
						limit={limitCoupon}
						hasSearch
						titleTable={t('customer.customerDashboard.couponHistory.title')}
						search={searchCoupon}
						setSearch={setSearchCoupon}
						setSearchConfirmed={setSearchConfirmedCoupon}
						columns={columnsCoupons}
						currentPage={currentPageCoupon}
						itemCount={coupons?.meta.itemCount ?? 0}
						meta={coupons?.meta}
						onLimitChange={setLimitCoupon}
						onPageChange={setCurrentPageCoupon}
						setCurrentPage={setCurrentPageCoupon}
						rows={coupons?.data.map((coupon) => ({
							keyCode: coupon.keyCode,
							item: coupon.item?.name ?? '',
							promotion: coupon.promotion ? coupon.promotion.name : t('marketing.promoReport.exchange'),
							store: coupon.store.name,
							createdAt: formatDate(coupon.createdAt),
							checked: coupon.checked ? t('customer.customerDashboard.couponHistory.table.yes') : t('customer.customerDashboard.couponHistory.table.no'),
							checkedDate: formatDate(coupon.checkedDate),
						}))}
					/>
				</div>
			</div>
		</div>
	);
};
