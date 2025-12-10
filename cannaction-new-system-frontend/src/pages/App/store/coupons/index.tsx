import React, { useState } from 'react';
import DataTable from '../../../../components/tableDinamic';
import { Grid, IconButton, Tooltip } from '@mui/material';
import { useColumnsCoupons } from './columnsCoupons';
import { BsCheck2Circle, BsEye } from '../../../../themes/icons';
import { MoreInformationModal } from '../../../../components/modals/moreInformation';
import { CouponEntity } from '../../../../models/entities/CouponEntity';
import { MoreInfo } from './moreInfo';
import { useSnackbar } from '../../../../contexts/Snackbar';
import { formatDate } from '../../../../utils/string';
import CouponService from '../../../../services/CouponService';
import { useCheckedCouponsStore } from '../../../../hooks/querys/coupon/useCheckedCouponsStore';
import { useNotCheckedCouponsStore } from '../../../../hooks/querys/coupon/useNotCheckedCouponsStore';
import { useTranslation } from 'react-i18next';

export const CouponsStore: React.FC = () => {
	const [coupon, setCoupon] = useState<CouponEntity>();
	const [searchChecked, setSearchChecked] = useState('');
	const [searchCheckedConfirmed, setSearchCheckedConfirmed] = useState('');
	const [searchNotChecked, setSearchNotChecked] = useState('');
	const [searchNotCheckedConfirmed, setSearchNotCheckedConfirmed] = useState('');
	const [currentPageNotChecked, setCurrentPageNotChecked] = useState<number>(1);
	const [limitNotChecked, setLimitNotChecked] = useState(10);
	const [currentPageChecked, setCurrentPageChecked] = useState<number>(1);
	const [limitChecked, setLimitChecked] = useState(10);
	const [open, setOpen] = useState<boolean>(false);
	const { openSnackbar } = useSnackbar();
	const { t } = useTranslation();
	const { columnsCoupons, columnCheckedCoupons } = useColumnsCoupons();

	const filterChecked = {
		search: searchCheckedConfirmed,
		page: currentPageChecked,
		take: limitChecked,
	};

	const filterNotChecked = {
		search: searchNotCheckedConfirmed,
		page: currentPageNotChecked,
		take: limitNotChecked,
	};

	const {
		data: checked,
		isRefetching: isRefetchingChecked,
		refetch: refetchChecked,
		isLoading: isLoadingChecked,
	} = useCheckedCouponsStore(filterChecked);

	const { data, isRefetching, refetch, isLoading } =
		useNotCheckedCouponsStore(filterNotChecked);

	const checkCoupon = async (id: number) => {
		try {
			await CouponService.checkCoupon(id);
			openSnackbar(t('store.coupons.itemRedeemed'), 'success');
			refetch();
			refetchChecked();
		} catch (e: unknown) {
			openSnackbar(e, 'error');
		}
	};

	const handleOpen = (selectedCoupon: CouponEntity) => {
		setCoupon(selectedCoupon);
		setOpen(true);
	};
	const handleClose = () => {
		setCoupon(undefined);
		setOpen(false);
	};

	return (
		<div className="container-xl px-4 mt-n10">
			<DataTable
				limit={limitNotChecked}
				meta={data?.meta}
				itemCount={data?.meta.itemCount ?? 0}
				onPageChange={setCurrentPageNotChecked}
				onLimitChange={setLimitNotChecked}
				currentPage={currentPageNotChecked}
				setCurrentPage={setCurrentPageNotChecked}
				hasSearch
				titleTable={t('tables.userStore.coupon.coupons.tableTitle')}
				search={searchNotChecked}
				setSearch={setSearchNotChecked}
				setSearchConfirmed={setSearchNotCheckedConfirmed}
				columns={columnsCoupons}
				rows={data?.data.map((coupon) => ({
					code: coupon.keyCode,
					item: coupon.item?.name ?? '',
					amount: coupon.itemAmount,
					date: formatDate(coupon.createdAt),
					customer: coupon.user?.name
						? `${coupon.user.name} ${coupon.user.lastName}`
						: '---',
					actions: (
						<>
							<Tooltip title={t('store.coupons.tableToCheck.viewTooltip')}>
								<IconButton
									onClick={() => {
										handleOpen(coupon);
									}}
								>
									<BsEye size={16} />
								</IconButton>
							</Tooltip>
							<IconButton onClick={() => checkCoupon(coupon.id)}>
								<BsCheck2Circle />
							</IconButton>
						</>
					),
				}))}
				isLoading={isLoading || isRefetching}
			/>

			<MoreInformationModal
				title={t('store.couponsDetailsModal.title')}
				open={open}
				hideSave
				handleClose={handleClose}
			>
				<MoreInfo coupon={coupon} />
			</MoreInformationModal>

			<Grid mt={2}>
				<DataTable
					limit={limitChecked}
					meta={checked?.meta}
					itemCount={checked?.meta?.itemCount ?? 0}
					onPageChange={setCurrentPageChecked}
					onLimitChange={setLimitChecked}
					currentPage={currentPageChecked}
					setCurrentPage={setCurrentPageChecked}
					hasSearch
					titleTable={t('store.coupons.historyCheckedTitle')}
					search={searchChecked}
					setSearch={setSearchChecked}
					setSearchConfirmed={setSearchCheckedConfirmed}
					columns={columnCheckedCoupons}
					rows={checked?.data.map((coupon) => ({
						code: coupon.keyCode,
						promotion: coupon.promotion
							? coupon.promotion.name
							: t('marketing.promoReport.exchange'),
						created: formatDate(coupon.createdAt),
						checked: formatDate(coupon.checkedDate),
						item: coupon.item?.name,
						amount: coupon.itemAmount,
						customer: coupon.user?.name
							? `${coupon.user.name} ${coupon.user.lastName}`
							: '---',
					}))}
					hasInteraction
					isLoading={isLoadingChecked || isRefetchingChecked}
				/>
			</Grid>
		</div>
	);
};
