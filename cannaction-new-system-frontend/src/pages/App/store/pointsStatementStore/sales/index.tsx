import { Button, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Form } from './form/Form';
import { TableSales } from './form/TableSales';
import { useNavigate } from 'react-router-dom';
import { SoldItem } from '../../customersStore/sales';
import { useSnackbar } from '../../../../../contexts/Snackbar';
import { ItemSale } from '../../../../../dtos/requests/CreateSaleRequest';
import SalesService from '../../../../../services/SalesService';
import { useTranslation } from 'react-i18next';

export const PointsStatementSales: React.FC = () => {
	const borderColor = '#dfe1e1';

	const navigate = useNavigate();
	const [soldItemList, setSoldItemList] = useState<SoldItem[]>([]);
	const [reverseList, setReverseList] = useState<SoldItem[]>([]);
	const [changed, setChanged] = useState(false);
	const [loading, setLoading] = useState(false);
	const { openSnackbar } = useSnackbar();
	const {t} = useTranslation();

	const handleAddItem = (item: SoldItem) => {
		try {
			setLoading(true);
			const itemList = soldItemList;
			itemList.push(item);
			setSoldItemList(itemList);
			setChanged(!changed);
			setReverseList(itemList.reverse().map((a) => a));
		} catch (e: unknown) {
			openSnackbar(e, 'error');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		setReverseList(soldItemList.reverse().map((a) => a));
	}, [soldItemList]);

	const handleRemoveItem = (index: number) => {
		setLoading(true);
		const itemList = soldItemList.filter((_, i) => i !== index);
		setSoldItemList(itemList);
		setLoading(false);
		setChanged(!changed);
	};

	const submitSale = async () => {
		if (soldItemList.length == 0) return;
		setLoading(true);
		const items: ItemSale[] = [];
		for (const item of soldItemList) {
			items.push({
				itemId: item.itemId,
				amount: item.amount,
				points: item.points,
				name: item.itemName,
			});
		}
		try {
			await SalesService.createSale({ items });
			openSnackbar(t('store.productScan.stockSuccess'), 'success');
			navigate(-1);
		} catch (e: unknown) {
			openSnackbar(e, 'error');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Paper
			sx={{
				width: '100%',
				overflow: 'hidden',
				borderRadius: '8px',
			}}
		>
			<Grid
				container
				sx={{
					background: '#F8F8F9',
					height: '60px',
					borderBottom: `1px solid  ${borderColor}`,
				}}
				p={2}
				justifyContent={'space-between'}
				alignItems={'center'}
			>
				<Typography
					variant="h4"
					fontSize={'1.075rem'}
					fontWeight={600}
					color={'primary'}
				>
					{t('store.productScan.subtitle')}
				</Typography>
			</Grid>
			<Grid container p={2} justifyContent="space-between" gap={2}>
				<Grid xs={4}>
					<Form handleAddItem={handleAddItem} loading={loading} />
				</Grid>
				<Grid xs={7.6}>
					<TableSales
						changed={changed}
						itemList={reverseList}
						handleRemoveItem={handleRemoveItem}
					/>
				</Grid>
			</Grid>
			<Grid
				container
				sx={{
					background: '#F8F8F9',
					height: '60px',
					borderBottom: `1px solid  ${borderColor}`,
				}}
				p={2}
				alignItems={'center'}
			>
				<Button
					variant="contained"
					disabled={loading || soldItemList.length == 0}
					onClick={submitSale}
					sx={{ textTransform: 'capitalize' }}
				>
					{t('store.productScan.submitButton')}
				</Button>
			</Grid>
		</Paper>
	);
};
