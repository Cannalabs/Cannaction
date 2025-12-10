import React, { useEffect, useState } from 'react';
import logo from '../../../../../assets/favicon.ico';
import { StoreDashboardResponse } from '../../../../../dtos/responses/StoreDashboardResponse';
import { formatDate } from '../../../../../utils/string';
import { Button, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Props {
	data?: StoreDashboardResponse;
	requestPrize: () => void;
}

export const TypeItem: React.FC<Props> = ({ data, requestPrize }) => {
	const [percentage, setPercentage] = useState<number>(0);
	const { t } = useTranslation();

	useEffect(() => {
		if (!data) return;
		if (
			data.storeTarget?.progress == 0 ||
			!data.storeTarget?.progress ||
			!data.storeTarget.target
		) {
			setPercentage(0);
		} else {
			const percent =
				(data?.storeTarget?.progress / data?.storeTarget?.target) * 100;
			if (percent > 99 && percent < 100) {
				setPercentage(99);
			} else {
				setPercentage(Math.round(percent * 10) / 10);
			}
		}
	}, [data]);

	return (
		<div className="row align-items-center justify-content-between">
			<div className="col" style={{ marginRight: '60px' }}>
				<h2 className="text-primary">
					{t('marketing.dashboard.storeTargets.store')}{' '}
					{t('marketing.dashboard.storeTargets.target')}{' '}
					{data?.storeTarget &&
						data.storeTarget.success &&
						t('store.storeDashboard.targets.reached')}
				</h2>
				<p className="text-gray-700">
					<strong>{t('marketing.dashboard.storeTargets.target')}:</strong>{' '}
					{data?.storeTarget?.target}
				</p>
				<p className="text-gray-700" style={{ marginTop: '-20px' }}>
					<strong>{t('marketing.dashboard.storeTargets.prizeItem')}:</strong>{' '}
					{data?.storeTarget?.prizeItem?.name}
				</p>
				<p className="text-gray-700" style={{ marginTop: '-20px' }}>
					<strong>{t('marketing.dashboard.storeTargets.limitDate')}:</strong>{' '}
					{formatDate(data?.storeTarget?.finalDateTarget)}
				</p>
				<small className="text-gray-700" style={{ marginTop: '-20px' }}>
					<strong>{t('store.storeDashboard.targets.pointsInTarget')}:</strong>{' '}
					{data?.storeTarget?.progress}
				</small>
				{data?.storeTarget &&
					!data.storeTarget.success &&
					data?.storeTarget.concluded == null && (
						<div className="progress" style={{ height: '50%' }}>
							<div
								className={`progress-bar progress-bar-striped progress-bar-animated bg-warning w-${
									percentage > 100 ? 100 : percentage
								}`}
								role="progressbar"
								style={{ width: `${percentage > 100 ? 100 : percentage}%` }}
								aria-valuenow={percentage > 100 ? 100 : percentage}
								aria-valuemin={0}
								aria-valuemax={100}
							>
								{percentage > 100 ? 100 : percentage}
							</div>
						</div>
					)}
				{data?.storeTarget &&
					data?.storeTarget.success &&
					data?.storeTarget.concluded == null && (
						<div className="row">
							<Grid
								style={{
									marginTop: '5px',
								}}
							>
								<Button
									onClick={requestPrize}
									variant="contained"
									sx={{ textTransform: 'capitalize' }}
									fullWidth
								>
									{t('store.storeDashboard.targets.requestPrize')}
								</Button>
							</Grid>
						</div>
					)}
				{data?.storeTarget &&
					data?.storeTarget.success &&
					data?.storeTarget.concluded == false && (
						<div className="row">
							<strong>
								{t('store.storeDashboard.targets.prizeRequestedWarning')}
							</strong>
						</div>
					)}
			</div>
			<div
				className="col d-none d-lg-block mt-xxl-n4"
				style={{ marginBottom: '-40px' }}
			>
				<img
					className="img-fluid px-xl-4 mt-xxl-n5"
					src={data?.storeTarget?.prizeItem?.image ?? logo}
					width="200px"
					alt="Item"
				/>
			</div>
		</div>
	);
};
