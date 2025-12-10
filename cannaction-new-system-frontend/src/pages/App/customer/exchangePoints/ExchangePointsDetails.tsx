import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MdContentCopy } from '../../../../themes/icons';
// import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
// import { StyledPatterInput } from '../../../../components/customSelect/styles';
import { useParams } from 'react-router-dom';
import { TextField } from '@mui/material';
import img from '/favicon.ico';
import { useUser } from '../../../../hooks/querys/user/useUser';
import { useAuth } from '../../../../contexts/Auth';
import CouponService from '../../../../services/CouponService';
import { useSnackbar } from '../../../../contexts/Snackbar';
import { CouponEntity } from '../../../../models/entities/CouponEntity';
import useDisableNumberInputScroll from '../../../../hooks/useDisabledScrollNumberInput';
import { useItem } from '../../../../hooks/querys/item/useItem';
import { useTranslation } from 'react-i18next';
// import { ItemType } from '../../../../models/enums/itemType.enum';

export const ExchangePointsDetails: React.FC = () => {
	const { id } = useParams();
	const { userLoggedId } = useAuth();
	const [isCopied, setIsCopied] = useState(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [amount, setAmount] = useState<number>(1);
	const [coupon, setCoupon] = useState<CouponEntity>();
	useDisableNumberInputScroll();
	const { t } = useTranslation();

	const { data, refetch } = useItem(id as unknown as number);
	const { data: user, refetch: refetchUser } = useUser(
		userLoggedId as unknown as number
	);

	const { openSnackbar } = useSnackbar();

	useEffect(() => {
		refetch();
		refetchUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleCopy = () => {
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 30000);
	};

	const handleGenerateCoupon = async () => {
		if (!data) return;
		setLoading(true);
		try {
			const createdCoupon = await CouponService.createForExchange(
				data?.id,
				amount
			);
			setCoupon(createdCoupon);
			openSnackbar(
				t('customer.exchangePointsDetailsPage.couponGenerated'),
				'success'
			);
			refetch();
			refetchUser();
		} catch (e: unknown) {
			openSnackbar(e, 'error');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container-xl px-4 mt-4">
			<div className="row">
				<div className="col-xl-12 col-md-12 col-12 mb-4">
					<div className="card">
						<div className="card-body p-5">
							<div className="row align-items-center justify-content-between">
								<div className="col d-lg-block">
									<img
										src={data?.image ?? img}
										className="d-block w-100"
										alt="..."
										style={{ aspectRatio: '16/13', borderRadius: '5px' }}
									/>
								</div>
								<div className="col">
									<div className="clearfix">
										<h2 className="text-primary float-start">{data?.name}</h2>
										<div className="badge bg-gray-400 text-dark float-end">
											{data?.points} {t('marketing.storesSetting.pointsTablePointsColumn')}
										</div>
									</div>

									<p className="text-gray-700">
										{t('customer.promotionsPage.enjoy')} {data?.name}!
									</p>
									<div className="row">
										{/* {data?.type === ItemType.CLOTHING && (
											<div className="col-xl-12 mb-3">
												<FormControl fullWidth>
													<InputLabel style={{ fontSize: '0.8rem' }}>Choose Size</InputLabel>
													<Select
														sx={StyledPatterInput}
														className="selectpicker w-100"
														size="small"
														disabled={false}
														label={'Choose Size'}
														placeholder={'Choose Size'}
													>
														<MenuItem style={{ fontSize: '0.8rem' }}>X</MenuItem>
													</Select>
												</FormControl>
											</div>
										)} */}
										<div className="col-xl-12 mb-3">
											<TextField
												fullWidth
												type="number"
												onChange={(e) => {
													setAmount(Number(e.target.value));
												}}
												value={amount}
												size="medium"
												placeholder={t('customer.exchangePointsDetailsPage.amount')}
												inputProps={{ min: 0 }}
												label={t('customer.exchangePointsDetailsPage.amount')}
												name="amount"
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
									</div>

									<h2>
										{t('customer.exchangePointsDetailsPage.totalPoints')}:{' '}
										{data?.points ? data.points * amount : 0}
									</h2>

									<button
										className="btn btn-primary p-3"
										onClick={() => handleGenerateCoupon()}
										disabled={
											(data && user ? data?.points * amount > user?.points : true) ||
											amount == 0 ||
											loading
										}
									>
										{t('customer.exchangePointsDetailsPage.generateCoupon')}
									</button>
									{data && user && data?.points * amount > user?.points && (
										<p className="text-danger">Not enough points!</p>
									)}
									{coupon != undefined && (
										<div className="input-group mt-4">
											<input
												type="text"
												id="keyCode"
												className="form-control"
												value={coupon.keyCode}
												placeholder="Coupon Code"
												aria-label="Promocode"
												aria-describedby="button-addon2"
											/>
											<CopyToClipboard text={coupon.keyCode} onCopy={handleCopy}>
												<button className="btn btn-primary" type="button" id="copyButton">
													<MdContentCopy />
												</button>
											</CopyToClipboard>
										</div>
									)}

									{isCopied && (
										<p className="text-success mt-2">
											{t('customer.promotionsPage.copied')}
										</p>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
