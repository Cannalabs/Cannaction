import React from 'react';
import { FaCheckCircle, FaUserFriends } from '../../../../../themes/icons';
import { StoreDashboardResponse } from '../../../../../dtos/responses/StoreDashboardResponse';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Props {
	data: StoreDashboardResponse | undefined;
}

export const MiniCards: React.FC<Props> = ({ data }) => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	return (
		<div className="col-md-12">
			<div className="row">
				<div className="col-xl-4 col-md-4 mb-4">
					<div className="card border-start-lg border-start-primary h-100">
						<div className="card-body">
							<h5 className="text-primary" style={{ fontSize: '20px' }}>
								{t('store.storeDashboard.summary.storeTotalPoints')}
							</h5>
							<span>{data?.storePoints}</span>
						</div>
					</div>
				</div>
				<div
					className="col-xl-4 col-md-4 mb-4"
					style={{ cursor: 'pointer' }}
					onClick={() => navigate('/customers')}
				>
					<div className="card border-start-lg border-start-primary h-100">
						<div className="card-body">
							<div className="d-flex align-items-center">
								<div className="flex-grow-1">
									<div className="small fw-bold text-primary mb-1">
										{t('store.storeDashboard.summary.activeCustomers')}{' '}
									</div>
									<div className="h5">{data ? data.activeUsers : 0}</div>
								</div>
								<div className="ms-2">
									<FaUserFriends className=" text-gray-200" size={40} />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					className="col-xl-4 col-md-4 mb-4"
					style={{ cursor: 'pointer' }}
					onClick={() => navigate('/customers')}
				>
					<div className="card border-start-lg border-start-primary h-100">
						<div className="card-body">
							<div className="d-flex align-items-center">
								<div className="flex-grow-1">
									<div className="small fw-bold text-primary mb-1">
										{t('store.storeDashboard.summary.inactiveCustomers')}
									</div>
									<div className="h5">{data ? data.inactiveUsers : 0}</div>
								</div>
								<div className="ms-2">
									<FaUserFriends className=" text-gray-200" size={40} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div
					className="col-xl-4 col-md-4 mb-4"
					style={{ cursor: 'pointer' }}
					onClick={() => navigate('/points-statement')}
				>
					<div className="card border-start-lg border-start-primary h-100">
						<div className="card-body">
							<h5 className="text-primary" style={{ fontSize: '20px' }}>
								{t('store.storeDashboard.summary.shopkeeperTotalPoints')}
							</h5>
							<span>{data?.userPoints}</span>
						</div>
					</div>
				</div>
				<div
					className="col-xl-4 col-md-4 mb-4"
					style={{ cursor: 'pointer' }}
					onClick={() => navigate('/coupons')}
				>
					<div className="card border-start-lg border-start-primary h-100">
						<div className="card-body">
							<div className="d-flex align-items-center">
								<div className="flex-grow-1">
									<div className="small fw-bold text-primary mb-1">
										{t('store.storeDashboard.summary.couponsToValidate')}
									</div>
									<div className="h5">{data ? data.coupons : 0}</div>
								</div>
								<div className="ms-2">
									<FaCheckCircle className=" text-gray-200" size={40} />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					className="col-xl-4 col-md-4 mb-4"
					style={{ cursor: 'pointer' }}
					onClick={() => navigate('/coupons')}
				>
					<div className="card border-start-lg border-start-primary h-100">
						<div className="card-body">
							<div className="d-flex align-items-center">
								<div className="flex-grow-1">
									<div className="small fw-bold text-primary mb-1">
										{t('store.storeDashboard.summary.couponsValidated')}
									</div>
									<div className="h5">{data ? data.validatedCoupons : 0}</div>
								</div>
								<div className="ms-2">
									<FaCheckCircle className=" text-gray-200" size={40} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
