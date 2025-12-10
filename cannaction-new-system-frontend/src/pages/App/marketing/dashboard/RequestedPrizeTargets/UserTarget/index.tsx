import React from 'react';
import logo from '../../../../../../assets/favicon.ico';
import { UserTargetEntity } from '../../../../../../models/entities/UserTargetEntity';
import { formatDate } from '../../../../../../utils/string';
import { Button, Grid } from '@mui/material';
import UserTargetService from '../../../../../../services/UserTargetService';
import { useSnackbar } from '../../../../../../contexts/Snackbar';
import { useTranslation } from 'react-i18next';

interface Props {
	userTarget: UserTargetEntity;
	refetch: () => void;
}

export const UserTarget: React.FC<Props> = ({ userTarget, refetch }) => {
	const { openSnackbar } = useSnackbar();
	const handleConcludeTarget = async () => {
		try {
			await UserTargetService.concludeTarget(userTarget.id);
			refetch();
			openSnackbar('Target confirmed Successfully!', 'success');
		} catch (e) {
			openSnackbar(e, 'error');
		}
	};

	const { t } = useTranslation();

	return (
		<Grid className="col-md-6 mb-4">
			<div className="card card-progress card-waves ">
				<div className="card-body p-5">
					<div className="row align-items-center justify-content-between">
						<div className="col">
							<h2 className="text-primary">{t('marketing.dashboard.userTargets.targetReached')}</h2>
							<p className="text-gray-700">
								<strong>{t('marketing.dashboard.userTargets.user')}:</strong> {userTarget.user.name}{' '}
								{userTarget.user.lastName ?? ''}
							</p>
							<p className="text-gray-700" style={{ marginTop: '-20px' }}>
								<strong>{t('marketing.dashboard.storeTargets.store')}:</strong> {userTarget.store.name}
							</p>
							<p className="text-gray-700" style={{ marginTop: '-20px' }}>
								<strong>{t('marketing.dashboard.storeTargets.target')}:</strong> {userTarget.target}
							</p>
							<p className="text-gray-700" style={{ marginTop: '-20px' }}>
								<strong>{t('marketing.dashboard.storeTargets.prizeItem')}:</strong> {userTarget.prizeItem.name}
							</p>
							<p className="text-gray-700" style={{ marginTop: '-20px' }}>
								<strong>{t('marketing.dashboard.storeTargets.limitDate')}:</strong> {formatDate(userTarget.targetFinalDate)}
							</p>
							<div className="row">
								<Grid
									style={{
										marginTop: '5px',
									}}
								>
									<Button
										onClick={handleConcludeTarget}
										variant="contained"
										sx={{ textTransform: 'capitalize' }}
										fullWidth
									>
										{t('marketing.dashboard.storeTargets.confirmTarget')}
									</Button>
								</Grid>
							</div>
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
