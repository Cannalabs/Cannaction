import React from 'react';
import { PrizeType } from '../../../../../models/enums/prizeType.enum';
import { TypeItem } from './TypeItem';
import { TypePoints } from './TypePoints';
import { StoreDashboardResponse } from '../../../../../dtos/responses/StoreDashboardResponse';
import { Grid } from '@mui/material';
import StoreTargetService from '../../../../../services/StoreTargetService';
import { useSnackbar } from '../../../../../contexts/Snackbar';
import { useTranslation } from 'react-i18next';

interface MoneybackCardProps {
	data?: StoreDashboardResponse;
	refetch: () => void;
}

export const StoreTarget: React.FC<MoneybackCardProps> = ({
	data,
	refetch,
}) => {
	const { openSnackbar } = useSnackbar();
	const {t} = useTranslation();
	const getPrizeContent = (type?: PrizeType) => {
		if (!data) return null;
		switch (type) {
			case PrizeType.ITEM:
				return <TypeItem data={data} requestPrize={handleRequestPrize} />;

			case PrizeType.POINTS:
				return <TypePoints data={data} requestPrize={handleRequestPrize} />;
		}
	};

	const handleRequestPrize = async () => {
		if (!data || !data.storeTarget) return;

		try {
			await StoreTargetService.requestPrize(data.storeTarget.id);
			refetch();
			openSnackbar(t('store.storeDashboard.targets.prizeRequested'), 'success');
		} catch (e) {
			openSnackbar(e, 'error');
		}
	};

	return (
		<Grid className="col-md-6 mb-5">
			<div className=" card card-progress card-waves">
				<div className="card-body p-5">
					{getPrizeContent(data?.storeTarget?.prizeType)}
				</div>
			</div>
		</Grid>
	);
};
