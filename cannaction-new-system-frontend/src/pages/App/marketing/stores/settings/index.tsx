import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Stock } from './tables/stock';
import { Head } from './head';
import { Cards } from './cards';
import { PointStatement } from './tables/pointStatement';
import { Promotion } from './tables/promotion';
import { Customer } from './tables/customer';
import { useParams } from 'react-router-dom';
import DatePickerComponent from '../../../../../components/datePickerComponent/DatePickerComponent';
import { Target } from './target';
import { StyledPatterInput } from '../../../../../components/customSelect/styles';
import StoreTargetService from '../../../../../services/StoreTargetService';
import { useSnackbar } from '../../../../../contexts/Snackbar';
import { useItemLabeled } from '../../../../../hooks/querys/item/useItemLabeled';
import UserTargetService from '../../../../../services/UserTargetService';
import { PrizeType } from '../../../../../models/enums/prizeType.enum';
import { Loading } from '../../../../../components/loading';
import { useStoreSettings } from '../../../../../hooks/querys/store/useStoreSettings';
import useDisableNumberInputScroll from '../../../../../hooks/useDisabledScrollNumberInput';
import { Workers } from './tables/workers';
import { useTranslation } from 'react-i18next';

const formatDate = (dateString: string) => {
	if (!dateString) return '';
	const date = new Date(dateString);
	return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
		2,
		'0'
	)}/${String(date.getDate()).padStart(2, '0')}`;
};

interface CardData {
	title: string;
	value: number;
}

export const Settings: React.FC = () => {
	const { id } = useParams();
	const { data, isRefetching, isLoading, refetch } = useStoreSettings(
		id as unknown as number,
		{}
	);
	const [dataCards, setDataCards] = useState<CardData[]>([]);
	const [storeTargetItem, setStoreTargetItem] = useState<number>();
	const [storeTargetMoney, setStoreTargetMoney] = useState<number>();
	const [userTarget, setUserTarget] = useState<number>(0);
	const [storeTargetItemId, setStoreTargetItemId] = useState<number>();
	const [storeTargetMoneyPrize, setStoreTargetMoneyPrize] = useState<number>();
	const [userTargetItem, setUserTargetItem] = useState<number>();
	const [storeTargetItemDate, setStoreTargetItemDate] = useState<string>('');
	const [storeTargetMoneyDate, setStoreTargetMoneyDate] = useState<string>('');
	const [userTargetDate, setUserTargetDate] = useState<string>('');
	const { items } = useItemLabeled({ exchange: true });
	const { openSnackbar } = useSnackbar();
	useDisableNumberInputScroll();
	const {t} =useTranslation();

	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const createStoreTarget = async (type: PrizeType) => {
		if (!id || (!storeTargetItem && !storeTargetMoney)) return;
		const target = type === PrizeType.ITEM ? storeTargetItem : storeTargetMoney;
		try {
			if (!data?.data.activeStoreTarget) {
				await StoreTargetService.create({
					storeId: +id,
					prizeType: type,
					finalDateTarget:
						type === PrizeType.ITEM ? storeTargetItemDate : storeTargetMoneyDate,
					target,
					prizeItemId: storeTargetItemId,
					prizeMoney: storeTargetMoneyPrize,
				});
				openSnackbar(t('marketing.storesSetting.storeTargetCreated'), 'success');
			} else if (
				data?.data.activeStoreTarget &&
				!data?.data.activeStoreTarget.active
			) {
				await StoreTargetService.update(data?.data.activeStoreTarget.id, {
					prizeType: type,
					finalDateTarget:
						type === PrizeType.ITEM ? storeTargetItemDate : storeTargetMoneyDate,
					target,
					prizeItemId: storeTargetItemId,
					prizeMoney: storeTargetMoneyPrize,
				});
				openSnackbar(t('marketing.storesSetting.storeTargetUpdated'), 'success');
				setStoreTargetItem(undefined);
				setStoreTargetItemId(undefined);
				setStoreTargetItemDate('');
				setStoreTargetMoney(undefined);
				setStoreTargetMoneyPrize(undefined);
				setStoreTargetMoneyDate('');
			} else {
				return;
			}
			refetch();
		} catch (e) {
			openSnackbar(e, 'error');
		}
	};

	const createUserTarget = async () => {
		if (!id || !userTargetItem) return;
		try {
			if (!data?.data.activeUserTarget) {
				await UserTargetService.create({
					storeId: +id,
					itemId: userTargetItem,
					target: userTarget,
					date: userTargetDate,
				});
				openSnackbar(t('marketing.storesSetting.userTargetCreated'), 'success');
			} else if (
				data?.data.activeUserTarget &&
				!data?.data.activeUserTarget.active
			) {
				await UserTargetService.update(data?.data.activeUserTarget.id, {
					date: userTargetDate,
					target: userTarget,
					itemId: userTargetItem,
				});
				openSnackbar(t('marketing.storesSetting.userTargetUpdated'), 'success');
			} else {
				return;
			}
			refetch();
		} catch (e) {
			openSnackbar(e, 'error');
		}
	};

	useEffect(() => {
		if (!data) return;
		setDataCards([
			{ title: t('marketing.storesSetting.pointsBox'), value: data?.data.acumulatedPoints },
			{ title: t('marketing.storesSetting.couponsBox'), value: data?.data.validatedCoupons },
			{ title: t('marketing.storesSetting.ProducstsBox'), value: data?.data.availableProducts },
			{ title: t('marketing.storesSetting.totalSalesBox'), value: data?.data.totalStoreSales },
			{ title: t('marketing.storesSetting.customersBox'), value: data?.data.activeCustomers },
			{ title: t('marketing.storesSetting.promotionsBox'), value: data?.data.activePromotions },
		]);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	useEffect(() => {
		if (!data) return;
		if (data.data.activeUserTarget) {
			setUserTarget(data.data.activeUserTarget.target);
			setUserTargetItem(data.data.activeUserTarget.prizeItem.id);
			setUserTargetDate(formatDate(data.data.activeUserTarget.targetFinalDate));
		}
		if (data.data.activeStoreTarget) {
			if (data.data.activeStoreTarget.prizeType === PrizeType.ITEM) {
				setStoreTargetItem(data.data.activeStoreTarget.target);
				setStoreTargetItemId(data.data.activeStoreTarget.prizeItem?.id);
				setStoreTargetItemDate(
					formatDate(data.data.activeStoreTarget.finalDateTarget)
				);
			} else {
				setStoreTargetMoney(data.data.activeStoreTarget.target);
				setStoreTargetMoneyPrize(data.data.activeStoreTarget.prizeMoney);
				setStoreTargetMoneyDate(
					formatDate(data.data.activeStoreTarget.finalDateTarget)
				);
			}
		}
	}, [data]);

	return (
		<Grid container sx={{ padding: 2 }}>
			{isRefetching || isLoading || !data ? (
				<Loading width={100} height="80vh" />
			) : (
				<>
					<Grid container justifyContent={'space-between'}>
						<Target title={t('marketing.storesSetting.moneybackTarget')} height="350px">
							<Grid item xs={12}>
								<TextField
									type="number"
									sx={{
										'& input[type=number]::-webkit-inner-spin-button': {
											'-webkit-appearance': 'none',
										},
									}}
									value={storeTargetMoney}
									onChange={(e) => setStoreTargetMoney(+e.target.value)}
									placeholder={t('marketing.storesSetting.targetInput')}
									fullWidth
									size="small"
									disabled={
										data?.data.activeStoreTarget !== null &&
										data?.data.activeStoreTarget.active
									}
								/>
							</Grid>
							<Grid item xs={12}>
								<DatePickerComponent
									onChange={(e) => {
										if (!e) {
											setStoreTargetMoneyDate('');
											return;
										}
										const date = new Date(e);
										setStoreTargetMoneyDate(
											`${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
												2,
												'0'
											)}/${String(date.getDate()).padStart(2, '0')}`
										);
									}}
									value={storeTargetMoneyDate}
									term={t('marketing.storesSetting.dateFinalTarget')}
									disabled={
										data?.data.activeStoreTarget !== null &&
										data?.data.activeStoreTarget.active
									}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									type="number"
									sx={{
										'& input[type=number]::-webkit-inner-spin-button': {
											'-webkit-appearance': 'none',
										},
									}}
									value={storeTargetMoneyPrize}
									onChange={(e) => setStoreTargetMoneyPrize(+e.target.value)}
									placeholder={t('marketing.storesSetting.moneyPrizeInput')}
									fullWidth
									size="small"
									disabled={
										data?.data.activeStoreTarget !== null &&
										data?.data.activeStoreTarget.active
									}
								/>
							</Grid>
							<Grid item xs={12}>
								<Button
									variant="contained"
									onClick={() => createStoreTarget(PrizeType.POINTS)}
									fullWidth
									disabled={
										data?.data.activeStoreTarget !== null &&
										data?.data.activeStoreTarget.active
									}
								>
									{t('marketing.storesSetting.saveButtonLinkTooltip')}
								</Button>
							</Grid>
						</Target>

						<Target title={t('marketing.storesSetting.itembackTarget')} height="350px">
							<Grid item xs={12}>
								<TextField
									type="number"
									sx={{
										'& input[type=number]::-webkit-inner-spin-button': {
											'-webkit-appearance': 'none',
										},
									}}
									value={storeTargetItem}
									onChange={(e) => setStoreTargetItem(+e.target.value)}
									placeholder={t('marketing.storesSetting.targetInput')}
									fullWidth
									size="small"
									disabled={
										data?.data.activeStoreTarget !== null &&
										data?.data.activeStoreTarget.active
									}
								/>
							</Grid>
							<Grid item xs={12}>
								<DatePickerComponent
									onChange={(e) => {
										if (!e) {
											setStoreTargetItemDate('');
											return;
										}
										const date = new Date(e);
										setStoreTargetItemDate(
											`${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
												2,
												'0'
											)}/${String(date.getDate()).padStart(2, '0')}`
										);
									}}
									value={storeTargetItemDate}
									term={t('marketing.storesSetting.dateFinalTarget')}
									disabled={
										data?.data.activeStoreTarget !== null &&
										data?.data.activeStoreTarget.active
									}
								/>
							</Grid>

							<Grid item xs={12}>
								<Autocomplete
									disablePortal
									disabled={
										data?.data.activeStoreTarget !== null &&
										data?.data.activeStoreTarget.active
									}
									sx={StyledPatterInput}
									options={items}
									fullWidth
									onChange={(_, value) => setStoreTargetItemId(value?.value)}
									value={items.find((c) => c.value === storeTargetItemId) || null}
									renderInput={(params) => (
										<TextField
											{...params}
											placeholder={t('marketing.storesSetting.itemPrizeInput')}
											variant="outlined"
											size="small"
											value={items}
										/>
									)}
								/>
							</Grid>
							<Grid item xs={12}>
								<Button
									variant="contained"
									onClick={() => createStoreTarget(PrizeType.ITEM)}
									fullWidth
									disabled={
										data?.data.activeStoreTarget !== null &&
										data?.data.activeStoreTarget.active
									}
								>
									{t('marketing.storesSetting.saveButtonLinkTooltip')}
								</Button>
							</Grid>
						</Target>

						<Target title={t('marketing.storesSetting.userTargets')} height="350px">
							<Grid item xs={12}>
								<TextField
									type="number"
									sx={{
										'& input[type=number]::-webkit-inner-spin-button': {
											'-webkit-appearance': 'none',
										},
									}}
									value={userTarget}
									onChange={(e) => setUserTarget(+e.target.value)}
									placeholder={t('marketing.storesSetting.targetInput')}
									fullWidth
									disabled={data?.data.activeUserTarget !== null}
									size="small"
								/>
							</Grid>
							<Grid item xs={12}>
								<DatePickerComponent
									onChange={(e) => {
										if (!e) {
											setUserTargetDate('');
											return;
										}
										const date = new Date(e);
										setUserTargetDate(
											`${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
												2,
												'0'
											)}/${String(date.getDate()).padStart(2, '0')}`
										);
									}}
									value={userTargetDate}
									term={t('marketing.storesSetting.dateFinalTarget')}
									disabled={data?.data.activeUserTarget !== null}
								/>
							</Grid>

							<Grid item xs={12}>
								<Autocomplete
									disablePortal
									disabled={data?.data.activeUserTarget !== null}
									sx={StyledPatterInput}
									options={items}
									fullWidth
									onChange={(_, value) => setUserTargetItem(value?.value)}
									value={items.find((c) => c.value === userTargetItem) || null}
									renderInput={(params) => (
										<TextField
											{...params}
											placeholder={t('marketing.storesSetting.itemPrizeInput')}
											variant="outlined"
											size="small"
											value={items}
										/>
									)}
								/>
							</Grid>
							<Grid item xs={12}>
								<Button
									variant="contained"
									onClick={createUserTarget}
									fullWidth
									disabled={data?.data.activeUserTarget !== null}
								>
									{t('marketing.storesSetting.saveButtonLinkTooltip')}
								</Button>
							</Grid>
						</Target>
					</Grid>
					<Grid container mt={2} justifyContent={'space-between'}>
						<Workers storeId={id ? +id : 0} />
					</Grid>
					<Grid container mt={2} justifyContent={'space-between'}>
						{dataCards.map((card) => (
							<Cards title={card.title} value={card.value} />
						))}
					</Grid>
					<Head id={id ? +id : 0} slug={data?.data.slug || ''} />
					<Stock storeId={id ? +id : 0} />
					<PointStatement storeId={id ? +id : 0} />
					<Promotion storeId={id ? +id : 0} />
					<Customer storeId={id ? +id : 0} />
				</>
			)}
		</Grid>
	);
};
