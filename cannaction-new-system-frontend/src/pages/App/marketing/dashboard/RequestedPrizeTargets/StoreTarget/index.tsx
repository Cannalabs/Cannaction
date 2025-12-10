import React from 'react';
import logo from '../../../../../../assets/favicon.ico';
import { StoreTargetEntity } from '../../../../../../models/entities/StoreTargetEntity';
import { formatDate } from '../../../../../../utils/string';
import { Button, Grid } from '@mui/material';
import StoreTargetService from '../../../../../../services/StoreTargetService';
import { PrizeType } from '../../../../../../models/enums/prizeType.enum';
import { useSnackbar } from '../../../../../../contexts/Snackbar';
import { useTranslation } from 'react-i18next';

interface Props {
	storeTarget: StoreTargetEntity;
	refetch: () => void;
}

export const StoreTarget: React.FC<Props> = ({ storeTarget, refetch }) => {
	const { openSnackbar } = useSnackbar();
	const handleConcludeTarget = async () => {
		try {
			await StoreTargetService.concludeTarget(storeTarget.id);
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
							<h2 className="text-primary">
								{t('marketing.dashboard.storeTargets.storeTargetReached')}
							</h2>
							<p className="text-gray-700">
								<strong>{t('marketing.dashboard.storeTargets.store')}:</strong>{' '}
								{storeTarget.store.name}
							</p>
							<p className="text-gray-700" style={{ marginTop: '-20px' }}>
								<strong>{t('marketing.dashboard.storeTargets.target')}:</strong>{' '}
								{storeTarget.target}
							</p>
							{storeTarget.prizeType === PrizeType.POINTS &&
								storeTarget.prizeMoney && (
									<p className="text-gray-700" style={{ marginTop: '-20px' }}>
										<strong>{t('marketing.dashboard.storeTargets.prizeMoney')}:</strong>{' '}
										{storeTarget.prizeMoney}
									</p>
								)}
							{storeTarget.prizeType === PrizeType.ITEM && storeTarget.prizeItem && (
								<p className="text-gray-700" style={{ marginTop: '-20px' }}>
									<strong>{t('marketing.dashboard.storeTargets.prizeItem')}:</strong>{' '}
									{storeTarget.prizeItem.name}
								</p>
							)}
							<p
								className="text-gray-700"
								style={{ marginTop: '-20px', marginBottom: '3.5vh' }}
							>
								<strong>{t('marketing.dashboard.storeTargets.limitDate')}:</strong>{' '}
								{formatDate(storeTarget.finalDateTarget)}
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
								src={storeTarget.prizeItem?.image ?? logo}
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
