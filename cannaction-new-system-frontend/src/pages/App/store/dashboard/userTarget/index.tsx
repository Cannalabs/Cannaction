import React, { useEffect, useState } from 'react';
import logo from '../../../../../assets/favicon.ico';
import { UserTargetEntity } from '../../../../../models/entities/UserTargetEntity';
import { formatDate } from '../../../../../utils/string';
import { Button, Grid } from '@mui/material';
import UserTargetService from '../../../../../services/UserTargetService';
import { useSnackbar } from '../../../../../contexts/Snackbar';
import { useTranslation } from 'react-i18next';

interface Props {
	userTarget: UserTargetEntity;
	refetch: () => void;
}

export const UserTarget: React.FC<Props> = ({ userTarget, refetch }) => {
	const [percentage, setPercentage] = useState<number>(0);
	const { t } = useTranslation();

	useEffect(() => {
		if (
			userTarget?.progress == 0 ||
			!userTarget?.progress ||
			!userTarget.target
		) {
			setPercentage(0);
		} else {
			const percent = (userTarget?.progress / userTarget?.target) * 100;
			if (percent > 99 && percent < 100) {
				setPercentage(99);
			} else {
				setPercentage(Math.round(percent * 10) / 10);
			}
		}
	}, [userTarget]);

	const { openSnackbar } = useSnackbar();

	const handleRequestPrize = async () => {
		try {
			await UserTargetService.requestPrize(userTarget.id);
			refetch();
			openSnackbar(t('store.storeDashboard.targets.prizeRequested'), 'success');
		} catch (e) {
			openSnackbar(e, 'error');
		}
	};

	return (
		<Grid className="col-md-6 mb-4">
			<div className="card card-progress card-waves ">
				<div className="card-body p-5">
					<div className="row align-items-center justify-content-between">
						<div className="col">
							<h2 className="text-primary">
								{t('marketing.storesSetting.userTarget')}{' '}
								{userTarget &&
									userTarget.success &&
									t('store.storeDashboard.targets.reached')}
							</h2>
							<p className="text-gray-700">
								<strong>{t('marketing.dashboard.storeTargets.target')}:</strong>{' '}
								{userTarget.target}
							</p>
							<p className="text-gray-700" style={{ marginTop: '-20px' }}>
								<strong>{t('marketing.dashboard.storeTargets.prizeItem')}:</strong>{' '}
								{userTarget.prizeItem.name}
							</p>
							<p className="text-gray-700" style={{ marginTop: '-20px' }}>
								<strong>{t('marketing.dashboard.storeTargets.limitDate')}:</strong>{' '}
								{formatDate(userTarget.targetFinalDate)}
							</p>
							<small className="text-gray-700" style={{ marginTop: '-20px' }}>
								<strong>{t('store.storeDashboard.targets.pointsInTarget')}:</strong>{' '}
								{userTarget.progress}
							</small>
							{userTarget && !userTarget.success && userTarget.concluded == null && (
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
							{userTarget.success && userTarget.concluded == null && (
								<div className="row">
									<Grid
										style={{
											marginTop: '5px',
										}}
									>
										<Button
											onClick={handleRequestPrize}
											variant="contained"
											sx={{ textTransform: 'capitalize' }}
											fullWidth
										>
											{t('store.storeDashboard.targets.requestPrize')}
										</Button>
									</Grid>
								</div>
							)}
							{userTarget.success && userTarget.concluded == false && (
								<div className="row">
									<strong>
										{t('store.storeDashboard.targets.prizeRequestedWarning')}
									</strong>{' '}
								</div>
							)}
						</div>
						<div className="col d-none d-lg-block mt-xxl-n4">
							<img
								className="img-fluid px-xl-4 mt-xxl-n5"
								src={userTarget.prizeItem?.image ? userTarget.prizeItem?.image : logo}
								width="150px"
								alt="Item"
							/>
						</div>
					</div>
				</div>
			</div>
		</Grid>
	);
};
