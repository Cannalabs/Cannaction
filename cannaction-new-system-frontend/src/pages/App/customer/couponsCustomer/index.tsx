import React, { useEffect, useState } from 'react';
import DataTable from '../../../../components/tableDinamic';
import { columnsCoupons } from './columns';
import { useCouponsByCustomer } from '../../../../hooks/querys/coupon/useCouponsByCustomer';
import { formatDate } from '../../../../utils/string';
import { useTranslation } from 'react-i18next';

export const CouponsCustomer: React.FC = () => {
	const [search, setSearch] = useState('');
	const [searchConfirmed, setSearchConfirmed] = useState('');
	const [limit, setLimit] = useState(10);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const { t } = useTranslation();

	const { data, isLoading, isRefetching, refetch } = useCouponsByCustomer({
		search: searchConfirmed,
	});

	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="container-xl px-4 mt-n10">
			<DataTable
				isLoading={isLoading || isRefetching}
				limit={limit}
				hasSearch
				titleTable={t('customer.customerDashboard.couponHistory.title')}
				search={search}
				setSearch={setSearch}
				setSearchConfirmed={setSearchConfirmed}
				columns={columnsCoupons}
				currentPage={currentPage}
				itemCount={data?.meta.itemCount ?? 0}
				meta={data?.meta}
				onLimitChange={setLimit}
				onPageChange={setCurrentPage}
				setCurrentPage={setCurrentPage}
				rows={data?.data.map((coupon) => ({
					keyCode: coupon.keyCode,
					item: coupon.item?.name ?? '',
					promotion: coupon.promotion
						? coupon.promotion.name
						: t('marketing.promoReport.exchange'),
					store: coupon.store.name,
					createdAt: formatDate(coupon.createdAt),
					checked: coupon.checked
						? t('customer.customerDashboard.couponHistory.table.yes')
						: t('customer.customerDashboard.couponHistory.table.no'),
					checkedDate: formatDate(coupon.checkedDate),
				}))}
			/>
		</div>
	);
};
