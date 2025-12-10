import {
	Autocomplete,
	Button,
	Divider,
	Grid,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
} from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import { StyledPatterInput } from '../../../../../../components/customSelect/styles';
import { ThumbContainer } from './thumb';
import { SoldItem } from '../../../customersStore/sales';
import { useItemsForPointsStatement } from '../../../../../../hooks/querys/item/useItemsForPointsStatement';
import { ItemEntity } from '../../../../../../models/entities/ItemEntity';
import ItemService from '../../../../../../services/ItemService';
import { useSnackbar } from '../../../../../../contexts/Snackbar';
import { BsUpc } from 'react-icons/bs';
import { MdOutlineSearch } from 'react-icons/md';
import { useStockCountByItem } from '../../../../../../hooks/querys/stock/useStockCountByItem';
import { useTranslation } from 'react-i18next';
// import { useAuth } from '../../../../../../contexts/Auth';

interface Props {
	handleAddItem: (item: SoldItem) => void;
	loading: boolean;
}
interface Items {
	value: number;
	label: string;
}

export const Form: React.FC<Props> = ({ handleAddItem, loading }) => {
	const quantityInputRef = useRef<HTMLInputElement>(null);
	const barcodeInputRef = useRef<HTMLInputElement>(null);
	const { data, refetch, isLoading } = useItemsForPointsStatement();
	const [barcode, setBarcode] = useState<string>('');
	const [item, setItem] = useState<ItemEntity>();
	const { data: total, refetch: refetchTotal } = useStockCountByItem(
		item ? item.id : undefined
	);
	const [items, setItems] = useState<Items[]>([]);
	const [quantity, setQuantity] = useState<number>(0);
	const [pointsStore, setPointsStore] = useState<number>();
	const { openSnackbar } = useSnackbar();
	const {t} = useTranslation();

	const getStorePoints = (value: number) => {
		const percentage = value * 0.4;
		const firstDecimal = Math.floor((percentage * 10) % 10);

		if (firstDecimal <= 5) {
			return Math.floor(percentage);
		} else {
			return Math.ceil(percentage);
		}
	};

	useEffect(() => {
		const itemList: Items[] = [];
		if (data) {
			for (const i of data) {
				itemList.push({ value: i.id, label: i.name });
			}
		}
		setItems(itemList);
	}, [data]);

	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (item) {
			setPointsStore(item.exchange ? 0 : getStorePoints(item.points));
		} else {
			setPointsStore(undefined);
		}
		refetchTotal();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [item]);

	const findByBarcode = async (bc: string) => {
		if (!data) return;
		const b = bc.trim();
		let barcode: string = '';
		if (b.length > 13) {
			if (b.charAt(0) === '0') {
				barcode = b.slice(1);
			}
			if (b.charAt(b.length - 1) === '0') {
				barcode = b.slice(0, b.length - 1);
			}
		} else if (b.length < 13) {
			barcode = '0' + b;
		} else {
			barcode = b;
		}
		try {
			const item = await ItemService.getByBarcode(barcode);
			if (item == null) {
				openSnackbar(t('store.productScan.productNotFound'), 'error');
				return;
			}
			const choosenItem = data?.find((i) => i.id == item.id);
			if (item == null || !choosenItem) {
				openSnackbar(t('store.productScan.productNotFoundList'), 'error');
				return;
			}
			// if (item.barcodes[0].country.id !== userCountry) {
			// 	openSnackbar('Product Barcode is from another country!', 'error');
			// 	return;
			// }
			handleItemChoose(choosenItem.id);
			setBarcode('');
			setTimeout(() => {
				quantityInputRef.current?.focus();
			}, 100);
		} catch (e: unknown) {
			openSnackbar(e, 'error');
		}
	};

	const handleItemChoose = (id: number | undefined) => {
		if (id == undefined) {
			setItem(undefined);
		} else {
			const chosenItem = data?.find((i) => i.id == id);
			setItem(chosenItem);
			setTimeout(() => {
				quantityInputRef.current?.focus();
			}, 100);
		}
	};

	return (
		<Grid gap={2} container>
			<Grid container p={2} justifyContent="space-between" gap={2}>
				<TextField
					fullWidth
					autoFocus
					variant="outlined"
					inputRef={barcodeInputRef}
					onKeyDown={(event) => {
						if (event.key === 'Enter') {
							event.preventDefault();
							findByBarcode(barcode);
						}
					}}
					value={barcode}
					onChange={(e) => {
						setBarcode(e.target.value);
					}}
					placeholder={t('store.productScan.barcodePlaceholder')}
					InputProps={{
						startAdornment: (
							//barcode icon
							<InputAdornment position="start">
								<BsUpc className="h-5 w-5" style={{ color: '#1b7f75' }} />  
								
							</InputAdornment>
						),
						endAdornment: (
							<InputAdornment position="end">
								<IconButton onClick={() => findByBarcode(barcode)} edge="end">
									<MdOutlineSearch />
								</IconButton>
							</InputAdornment>
						),
					}}
					sx={{ mb: 3, marginTop: '10px' }}
				/>
			</Grid>
			<Grid item xs={3.9} sm={4} md={11.7}>
				<Autocomplete
					disablePortal
					sx={StyledPatterInput}
					options={items}
					fullWidth
					value={items?.find((c) => c.value === item?.id) || null}
					onChange={(_, value) => handleItemChoose(value ? value?.value : undefined)}
					renderInput={(params) => (
						<TextField
							{...params}
							placeholder={t('store.productScan.dropdownPlaceholder')}
							label={t('store.productScan.dropdownPlaceholder')}
							variant="outlined"
							value={data}
						/>
					)}
				/>
			</Grid>
			<ThumbContainer image={item?.image ?? ''} loading={isLoading} />
			<Grid container gap={1}>
				<Grid item xs={2} sm={5} md={12}>
					<TextField
						disabled
						fullWidth
						value={item?.name ?? ''}
						size="medium"
						placeholder={t('store.productScan.productNameLabel')}
						label={t('store.productScan.productNameLabel')}
						name="productName"
						sx={StyledPatterInput}
					/>
				</Grid>
				<Grid item xs={3.9} sm={4} md={5.7}>
					<TextField
						fullWidth
						type="number"
						onChange={(e) => {
							const value = Number(e.target.value);
							setQuantity(value);
						}}
						onKeyDown={(event) => {
							if (
								event.key === 'Enter' &&
								item &&
								pointsStore &&
								quantity &&
								!loading
							) {
								handleAddItem({
									itemId: item.id,
									itemName: item.name,
									points: item.points,
									storePoints: getStorePoints(item.points),
									amount: quantity,
								});
								setItem(undefined);
								setQuantity(0);
								setTimeout(() => {
									barcodeInputRef.current?.focus();
								}, 100);
							}
						}}
						value={quantity}
						size="medium"
						placeholder={t('store.productScan.quantityLabel')}
						inputProps={{
							min: 1,
							max: total || 0,
						}}
						label={t('store.productScan.quantityLabel')}
						name="quantity"
						inputRef={quantityInputRef}
						sx={{
							'& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
								border: 'none',
								transition: 'background 0.3s ease',
							},
							background: '#f2f6fc',
							borderRadius: '7px',
							'& input[type=number]::-webkit-inner-spin-button': {
								'-webkit-appearance': 'none',
							},
						}}
					/>
				</Grid>
				<Grid item xs={3.9} sm={4} md={6}>
					<TextField
						fullWidth
						disabled
						value={total}
						size="medium"
						placeholder={t('store.productScan.stockLabel')}
						label={t('store.productScan.stockLabel')}
						name="totalInStock"
						sx={{
							'& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
								border: 'none',
								transition: 'background 0.3s ease',
							},
							background: '#f2f6fc',
							borderRadius: '7px',
							'& input[type=number]::-webkit-inner-spin-button': {
								'-webkit-appearance': 'none',
							},
						}}
					/>
				</Grid>

				<Grid item xs={3.9} sm={4} md={12}>
					<Button
						onClick={() => {
							if (!item || !pointsStore || !quantity || loading) return;
							handleAddItem({
								itemId: item.id,
								itemName: item.name,
								points: item.points,
								storePoints: getStorePoints(item.points),
								amount: quantity,
							});
							setItem(undefined);
							setQuantity(0);
							setTimeout(() => {
								barcodeInputRef.current?.focus();
							}, 100);
						}}
						disabled={!item || !pointsStore || !quantity || loading}
						variant="contained"
						sx={{ textTransform: 'capitalize' }}
						fullWidth
					>
						{t('store.productScan.addItemButton')}
					</Button>
				</Grid>
				<Divider sx={{ width: '100%' }} />
			</Grid>
			<Grid container justifyContent="space-between">
				<Grid item xs={3.9} sm={4} md={5.5}>
					<Typography variant="h5">{t('store.productScan.pointsLabel')}</Typography>
					<TextField
						value={item && quantity ? getStorePoints(item.points) * quantity : ''}
						sx={StyledPatterInput}
					/>
				</Grid>
			</Grid>
		</Grid>
	);
};
