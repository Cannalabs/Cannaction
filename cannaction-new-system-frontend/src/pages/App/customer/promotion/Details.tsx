import React, { useEffect, useState } from 'react';
import { MdContentCopy } from '../../../../themes/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useParams } from 'react-router-dom';
import { useCouponByUser } from '../../../../hooks/querys/coupon/useCouponByUserAndPromotion';
import { CouponEntity } from '../../../../models/entities/CouponEntity';
import { useSnackbar } from '../../../../contexts/Snackbar';
import CouponService from '../../../../services/CouponService';
import { usePromotion } from '../../../../hooks/querys/promotion/usePromotion';
import img from '../../../../../public/favicon.ico';
import { useTranslation } from 'react-i18next';

export const PromotionDetailCustomer: React.FC = () => {
	const { id } = useParams();
	const [isCopied, setIsCopied] = useState(false);
	const [generatingCoupon, setGenerationCoupon] = useState<boolean>(false);
	const { data, refetch, isLoading, isRefetching } = useCouponByUser(
		id as unknown as number
	);
	const { data: promotion } = usePromotion(
		id ? +id : 0
	);
	const [coupon, setCoupon] = useState<CouponEntity>();
	const { openSnackbar } = useSnackbar();
	const {t} = useTranslation();

	const handleCopy = () => {
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 6000);
	};

	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const generateCoupon = async () => {
		setGenerationCoupon(true);
		try {
			const createdCoupon = await CouponService.createForPromotion(
				id as unknown as number
			);
			setCoupon(createdCoupon);
			openSnackbar(t('customer.promotionsPage.couponGenerated'), 'success');
		} catch (e: unknown) {
			openSnackbar(e, 'error');
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
										src={promotion?.item.image ?? img}
										className="d-block w-100"
										alt="..."
										style={{ aspectRatio: '16/13', borderRadius: '5px 5px 0 0' }}
									/>
								</div>
								<div className="col">
									<h2 className="text-primary">{promotion?.name}</h2>
									<p className="text-gray-700">{t('customer.promotionsPage.enjoy')} {promotion?.item.name}.</p>
									<button
										disabled={
											isLoading ||
											isRefetching ||
											generatingCoupon ||
											coupon != undefined ||
											data != undefined
										}
										className="btn btn-primary p-3"
										onClick={() => generateCoupon()}
									>
										{t('customer.customerDashboard.generateCouponButton')}
									</button>

									{coupon != undefined && (
										<div className="input-group mt-4">
											<input
												disabled
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
										<p className="text-success mt-2">{t('customer.promotionsPage.copied')}</p>
									)}
									{data != null && (
										<p className="text-danger mt-3">
											{`${t('customer.promotionsPage.couponGeneratedInit')} ${data?.keyCode} ${t('customer.promotionsPage.couponGeneratedEnd')}`}
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
