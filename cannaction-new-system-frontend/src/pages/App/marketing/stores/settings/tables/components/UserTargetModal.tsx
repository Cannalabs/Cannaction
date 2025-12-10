import React, { useEffect, useState } from 'react';
import {
	Autocomplete,
	Button,
	Grid,
	Switch,
	TextField,
	Typography,
	Box,
} from '@mui/material';
import DatePickerComponent from '../../../../../../../components/datePickerComponent/DatePickerComponent';
import { useUserTargetByUser } from '../../../../../../../hooks/querys/userTarget/useUserTargetByUser';
import { StyledPatterInput } from '../../../../../../../components/customSelect/styles';
import { useItemLabeled } from '../../../../../../../hooks/querys/item/useItemLabeled';
import { useSnackbar } from '../../../../../../../contexts/Snackbar';
import UserTargetService from '../../../../../../../services/UserTargetService';
import { useTranslation } from 'react-i18next';

interface Props {
	storeId: number;
	userId?: number;
}

export const UserTargetModal: React.FC<Props> = ({ userId, storeId }) => {
	const [target, setTarget] = useState<number>();
	const [date, setDate] = useState<string>('');
	const [item, setItem] = useState<number>();
	const [active, setActive] = useState<boolean>(false);
	const { data, isLoading, isRefetching, refetch } = useUserTargetByUser(
		storeId,
		userId
	);
	const { items } = useItemLabeled({ exchange: true });
	const { openSnackbar } = useSnackbar();
	const { t } = useTranslation();

	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (data) {
			setTarget(data.target);
			setDate(data.targetFinalDate);
			setItem(data.prizeItem.id);
			setActive(data.active);
		} else {
			setTarget(0);
			setDate('');
			setItem(undefined);
			setActive(false);
		}
	}, [data]);

	const createUserTarget = async () => {
		if (!item) {
			openSnackbar(t('marketing.storesSetting.itemMandatory'), 'error');
			return;
		}
		if (!target) {
			openSnackbar(t('marketing.storesSetting.targetMandatory'), 'error');
			return;
		}
		if (!date) {
			openSnackbar(t('marketing.storesSetting.dateMandatory'), 'error');
			return;
		}
		try {
			data?.id
				? await UserTargetService.update(data?.id, {
						active,
						target,
						date,
						itemId: item,
				})
				: await UserTargetService.createByUser({
						userId,
						storeId,
						itemId: item,
						target,
						date,
						active,
				});
			openSnackbar(
				`${t('marketing.storesSetting.userTarget')} ${
					data
						? t('marketing.addStore.storeUpdated')
						: t('marketing.addStore.storeCreated')
				}`,
				'success'
			);
			refetch();
		} catch (e) {
			openSnackbar(e, 'error');
		}
	};

	return (
		<Box component="form" p={2} sx={{ width: '100%' }}>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						type="number"
						label={t('marketing.storesSetting.targetInput')}
						variant="outlined"
						sx={{
							'& input[type=number]::-webkit-inner-spin-button': {
								'-webkit-appearance': 'none',
							},
						}}
						value={target}
						onChange={(e) => setTarget(+e.target.value)}
						placeholder={t('marketing.storesSetting.targetInput')}
						disabled={isLoading || isRefetching}
						size="small"
					/>
				</Grid>

				<Grid item xs={12} sm={6}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<Typography variant="subtitle1" sx={{ mr: 2 }}>
							{t('marketing.storesSetting.activeTarget')}
						</Typography>
						<Switch
							checked={active}
							onChange={() => setActive(!active)}
							color="primary"
						/>
					</Box>
				</Grid>

				<Grid item xs={12}>
					<DatePickerComponent
						onChange={(e) => {
							if (!e) {
								setDate('');
								return;
							}
							const date = new Date(e);
							setDate(
								`${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
									2,
									'0'
								)}/${String(date.getDate()).padStart(2, '0')}`
							);
						}}
						value={date}
						term={t('marketing.storesSetting.dateFinalTarget')}
						disabled={isLoading || isRefetching}
					/>
				</Grid>

				<Grid item xs={12}>
					<Autocomplete
						disablePortal
						disabled={isLoading || isRefetching}
						sx={{
							...StyledPatterInput,
							'& .MuiOutlinedInput-root': {
								'&:hover fieldset': {
									borderColor: '#1976d2',
								},
							},
						}}
						options={items}
						fullWidth
						onChange={(_, value) => setItem(value?.value)}
						value={items.find((c) => c.value === item) || null}
						renderInput={(params) => (
							<TextField
								{...params}
								label={t('marketing.storesSetting.itemPrizeInput')}
								placeholder={t('marketing.storesSetting.itemPrizeInput')}
								variant="outlined"
								size="small"
							/>
						)}
					/>
				</Grid>

				<Grid item xs={12}>
					<Button
						variant="contained"
						fullWidth
						disabled={isLoading || isRefetching}
						onClick={createUserTarget}
					>
						{t('general.submit')}
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
};
