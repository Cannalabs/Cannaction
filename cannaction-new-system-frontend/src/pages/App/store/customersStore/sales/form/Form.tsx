/* eslint-disable react-hooks/exhaustive-deps */
import { Html5Qrcode } from 'html5-qrcode';
import {
	Autocomplete,
	Button,
	Grid,
	IconButton,
	InputAdornment,
	TextField,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { StyledPatterInput } from '../../../../../../components/customSelect/styles';
import { ThumbContainer } from './thumb';
import { SoldItem } from '..';
import { useStockItems } from '../../../../../../hooks/querys/stock/useStockItems';
import { StockEntity } from '../../../../../../models/entities/StockEntity';
import useDisableNumberInputScroll from '../../../../../../hooks/useDisabledScrollNumberInput';
import { BsUpc, MdOutlineSearch } from '../../../../../../themes/icons';
import ItemService from '../../../../../../services/ItemService';
import { useSnackbar } from '../../../../../../contexts/Snackbar';
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

export const Form: React.FC<Props> = ({ handleAddItem }) => {
	const quantityInputRef = useRef<HTMLInputElement>(null);
	const barcodeInputRef = useRef<HTMLInputElement>(null);
	const { data, refetch, isLoading } = useStockItems();
	const [item, setItem] = useState<StockEntity | undefined>();
	const [items, setItems] = useState<Items[]>([]);
	const [quantity, setQuantity] = useState<number>(1);
	const [pointsStore, setPointsStore] = useState<number>();
	const [barcode, setBarcode] = useState<string>('');
	const { openSnackbar } = useSnackbar();
	const [quantityError, setQuantityError] = useState<string>('');
	const { t } = useTranslation();
	const barcodeScannerRef = useRef<Html5Qrcode | null>(null);
	// const { userCountry } = useAuth();

	useDisableNumberInputScroll();

	const getStorePoints = (value: number) => {
		const percentage = value * 0.4;
		const firstDecimal = Math.floor((percentage * 10) % 10);

		if (firstDecimal <= 5) {
			setPointsStore(Math.floor(percentage));
		} else {
			setPointsStore(Math.ceil(percentage));
		}
	};

	useEffect(() => {
		refetch();
	}, []);

	useEffect(() => {
		const itemList: Items[] = [];
		if (data) {
			for (const stockItem of data) {
				itemList.push({ value: stockItem.item.id, label: stockItem.item.name });
			}
		}
		setItems(itemList);
	}, [data]);

	useEffect(() => {
		if (item) {
			setQuantity(1);
			getStorePoints(item.item.points);
		} else {
			setQuantity(1);
			setPointsStore(undefined);
		}
	}, [item]);

	const handleItemChoose = (id: number | undefined) => {
		if (!id) return;
		const chosenItem = data?.find((i) => i.id == id);
		setItem(chosenItem);
		setTimeout(() => {
			quantityInputRef.current?.focus();
		}, 100);
	};

	const handleItemChooseSelect = (id: number | undefined) => {
		if (!id) return;
		const chosenItem = data?.find((i) => i.item.id == id);
		setItem(chosenItem);
		setTimeout(() => {
			quantityInputRef.current?.focus();
		}, 100);
	};

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
			// if (item.barcodes[0].country.id !== userCountry) {
			// 	openSnackbar('Product Barcode is from another country!', 'error');
			// 	return;
			// }
			const choosenItem = data?.find((i) => i.item.id == item.id);
			if (!choosenItem) {
				openSnackbar(t('store.productScan.productNotOnStock'), 'error');
				return;
			}
			handleItemChoose(choosenItem.id);
			setBarcode('');
			setTimeout(() => {
				quantityInputRef.current?.focus();
			}, 100);
		} catch (e: unknown) {
			openSnackbar(e, 'error');
		}
	};

	const startBarcodeScanner = async () => {
		try {
			const config = { fps: 10, qrbox: 250 };
			const qrRegionId = 'barcode-scanner';

			barcodeScannerRef.current = new Html5Qrcode(qrRegionId);
			await barcodeScannerRef.current.start(
				{ facingMode: 'environment' },
				config,
				(decodedText) => {
					setBarcode(decodedText);
					findByBarcode(decodedText);
					barcodeScannerRef.current?.stop();
				},
				(e: string) => {
					console.log(e);
				}
			);
		} catch (err) {
			console.error('Erro ao iniciar scanner', err);
		}
	};

	return (
		<div className="col-xl-4">
			<div className="mb-3">
				<Grid container>
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
									<InputAdornment onClick={() => startBarcodeScanner()} position="start">
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
							value={items.find((c) => c.value === item?.id) || null}
							onChange={(_, value) => handleItemChooseSelect(value?.value)}
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
				</Grid>
			</div>
			<div className="mb-3">
				<ThumbContainer image={item?.item.image ?? ''} loading={isLoading} />
			</div>
			<div className="mb-3">
				<TextField
					disabled
					fullWidth
					value={item?.item.name ?? ''}
					size="medium"
					placeholder={t('store.productScan.productNameLabel')}
					label={t('store.productScan.productNameLabel')}
					name="productName"
					sx={StyledPatterInput}
				/>
			</div>
			<div className="mb-3">
				<div className="row">
					<div className="col-xl-6 ">
						<TextField
							fullWidth
							type="number"
							error={!!quantityError}
							helperText={quantityError}
							onChange={(e) => {
								const value = Number(e.target.value);
								if (value > (item?.total || 0)) {
									setQuantity(item?.total || 0);
									setQuantityError(t('store.productScan.productQuantityAdjusted'));
								} else {
									setQuantity(value);
									setQuantityError('');
								}
							}}
							value={quantity}
							size="medium"
							inputRef={quantityInputRef}
							placeholder={t('store.productScan.quantityLabel')}
							inputProps={{
								min: 1,
								max: item?.total || 0,
							}}
							label={t('store.productScan.quantityLabel')}
							name="quantity"
							onKeyDown={(event) => {
								if (event.key === 'Enter' && item && pointsStore && quantity) {
									handleAddItem({
										itemId: item.item.id,
										itemName: item.item.name,
										points: item.item.points,
										storePoints: pointsStore,
										amount: quantity,
									});
									setItem(undefined);
									setQuantity(0);
									setQuantityError('');
									setTimeout(() => {
										barcodeInputRef.current?.focus();
									}, 100);
								}
							}}
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
					</div>
					<div className="col-xl-6 ">
						{item && (
							<TextField
								fullWidth
								value={item.total}
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
						)}
					</div>
				</div>
			</div>
			<div className="mb-3">
				<Button
					onClick={() => {
						if (!item || !pointsStore || !quantity) return;
						//TODO: fixar bug no loading
						handleAddItem({
							itemId: item.item.id,
							itemName: item.item.name,
							points: item.item.points,
							storePoints: pointsStore,
							amount: quantity,
						});
						setItem(undefined);
						setQuantity(0);
						setQuantityError('');
						setTimeout(() => {
							barcodeInputRef.current?.focus();
						}, 100);
					}}
					disabled={!item || !pointsStore || !quantity}
					variant="contained"
					sx={{ textTransform: 'capitalize' }}
					fullWidth
				>
					{t('store.productScan.addItemButton')}
				</Button>
			</div>
			<hr />
			<div className="row justify-content-start">
				<div className="col-xl-6">
					<div className="mb-3">
						<label>{t('store.productScan.totalPointsCustomer')}</label>
						<input
							value={item ? item.item.points * quantity : 0}
							disabled
							className="form-control"
							type="text"
						/>
					</div>
				</div>
				<div className="col-xl-6">
					<div className="mb-3">
						<label>{t('store.productScan.pointsLabel')}</label>
						<input
							disabled
							className="form-control"
							type="text"
							value={pointsStore ? pointsStore * quantity : 0}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
