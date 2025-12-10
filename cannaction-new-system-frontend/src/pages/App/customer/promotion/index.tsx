import React, { useEffect } from 'react';
import noData2 from '../../../../assets/img/illustrations/no-data-2.svg';
import { CardPromotion } from './Card';
import { useNavigate } from 'react-router-dom';
import { usePromotionsCustomerUser } from '../../../../hooks/querys/promotion/usePromotionsForCustomerUser';
import { useTranslation } from 'react-i18next';

export const PromotionCustomer: React.FC = () => {
	const navigate = useNavigate();
	const {t} = useTranslation();

	const handleNavigate = (id: number) => {
		navigate(`/detail-promotion/${id}`);
	};

	const { data, isRefetching, isLoading, refetch } = usePromotionsCustomerUser();

	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="container-xl px-4 mt-n10">
			<div className="row">
				{isLoading || isRefetching || data?.length == 0 ? (
					<div className="col-xl-12 col-md-12 col-12 mb-4">
						<div className="card">
							<div className="card-body p-5">
								<div className="row align-items-center justify-content-between">
									<div className="col">
										<h2 className="text-primary">{t('customer.promotionsPage.noPromotionsTitle')}</h2>
										<p className="text-gray-700">
											{t('customer.promotionsPage.noPromotionsDescription')}
										</p>
									</div>
									<div className="col d-none d-lg-block mt-4">
										<img className="img-fluid px-xl-4 mt-xxl-n5" src={noData2} />
									</div>
								</div>
							</div>
						</div>
					</div>
				) : (
					''
				)}
				{data?.map((promotion) => (
					<CardPromotion
						key={promotion.id}
						promotionName={promotion.name}
						promotionId={promotion.id}
						promotionThumb={promotion.thumb}
						handleNavigate={handleNavigate}
					/>
				))}
			</div>
		</div>
	);
};
