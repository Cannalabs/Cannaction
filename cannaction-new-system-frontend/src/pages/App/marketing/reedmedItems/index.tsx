import React, { useState } from 'react';
import { Grid, IconButton } from '@mui/material';
import DataTable from '../../../../components/tableDinamic';
import { BsCheck2Circle } from '../../../../themes/icons';
import { formatDate } from '../../../../utils/string';
import CouponService from '../../../../services/CouponService';
import { useRedeemedItems } from '../../../../hooks/querys/coupon/useRedeemedItems';
import { useSnackbar } from '../../../../contexts/Snackbar';
import { useTranslation } from 'react-i18next';
import { useRedeemedItemsColumns } from './dataRedeemed';

const RedeemedItems: React.FC = () => {
	const [searchChecked, setSearchChecked] = useState('');
	const [searchCheckedConfirmed, setSearchCheckedConfirmed] = useState('');
	const [searchNotChecked, setSearchNotChecked] = useState('');
	const [searchNotCheckedConfirmed, setSearchNotCheckedConfirmed] = useState('');
	const [currentPageNotChecked, setCurrentPageNotChecked] = useState<number>(1);
	const [limitNotChecked, setLimitNotChecked] = useState(10);
	const [currentPageChecked, setCurrentPageChecked] = useState<number>(1);
	const [limitChecked, setLimitChecked] = useState(10);
	const { openSnackbar } = useSnackbar();
	const { t } = useTranslation();
	const { columnsItemsToCheck, columnsHistoryCheckedItems } =
		useRedeemedItemsColumns();

	const filterChecked = {
		page: currentPageChecked,
		take: limitChecked,
	};

	const filterNotChecked = {
		page: currentPageNotChecked,
		take: limitNotChecked,
	};

	const {
		data: coupons,
		isLoading,
		refetch,
		isRefetching,
	} = useRedeemedItems({
		search: searchCheckedConfirmed,
		searchNotChecked: searchNotCheckedConfirmed,
		optionsToCheck: filterNotChecked,
		optionsChecked: filterChecked,
	});

	const checkCoupon = async (id: number) => {
		try {
			await CouponService.checkCoupon(id);
			openSnackbar(t('marketing.redeemedItems.itemRedeemed'), 'success');
		} catch (e: unknown) {
			openSnackbar(e, 'error');
		} finally {
			refetch();
		}
	};

	return (
		<div className="container-xl px-4 mt-n10">
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
					limit={limitNotChecked}
					meta={coupons?.notChecked?.meta}
					itemCount={coupons?.notChecked?.meta.itemCount ?? 0}
					onPageChange={setCurrentPageNotChecked}
					onLimitChange={setLimitNotChecked}
					currentPage={currentPageNotChecked}
					setCurrentPage={setCurrentPageNotChecked}
					hasSearch
					titleTable={t('marketing.redeemedItems.itemsCheckTableTitle')}
					search={searchNotChecked}
					setSearch={setSearchNotChecked}
					setSearchConfirmed={setSearchNotCheckedConfirmed}
					columns={columnsItemsToCheck}
					rows={coupons?.notChecked.data.map((coupon) => ({
						code: coupon.keyCode,
						promotion: coupon.promotion
							? coupon.promotion.name
							: t('marketing.promoReport.exchange'),
						created: formatDate(coupon.createdAt),
						customer: coupon.user?.name
							? `${coupon.user.name} ${coupon.user.lastName}`
							: '---',
						store: coupon.store.name,
						location:
							coupon.store.city?.name && coupon.store.state?.name
								? `${coupon.store?.city?.name}, ${coupon.store?.state?.name}, ${coupon.store.country.name}`
								: `${coupon.store.country.name}`,
						actions: (
							<IconButton onClick={() => checkCoupon(coupon.id)}>
								<BsCheck2Circle />
							</IconButton>
						),
					}))}
					isLoading={isLoading || isRefetching}
				/>
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
					limit={limitChecked}
					meta={coupons?.checked.meta}
					itemCount={coupons?.checked.meta?.itemCount ?? 0}
					onPageChange={setCurrentPageChecked}
					onLimitChange={setLimitChecked}
					currentPage={currentPageChecked}
					setCurrentPage={setCurrentPageChecked}
					hasSearch
					titleTable={t('marketing.redeemedItems.historyCheckedTableTitle')}
					search={searchChecked}
					setSearch={setSearchChecked}
					setSearchConfirmed={setSearchCheckedConfirmed}
					columns={columnsHistoryCheckedItems}
					rows={coupons?.checked.data.map((coupon) => ({
						code: coupon.keyCode,
						promotion: coupon.promotion
							? coupon.promotion.name
							: t('marketing.promoReport.exchange'),
						created: formatDate(coupon.createdAt),
						checked: formatDate(coupon.checkedDate),
						customer: coupon.user?.name
							? `${coupon.user.name} ${coupon.user.lastName}`
							: '---',
						store: coupon.store.name,
						location: coupon.store.city?.name && coupon.store.state?.name
								? `${coupon.store?.city?.name}, ${coupon.store?.state?.name}, ${coupon.store.country.name}`
								: `${coupon.store.country.name}`,
					}))}
					hasInteraction
					isLoading={isLoading || isRefetching}
				/>
			</Grid>
		</div>
	);
};

export default RedeemedItems;
