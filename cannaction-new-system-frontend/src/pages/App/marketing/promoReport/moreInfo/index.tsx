import React, { useEffect, useState } from 'react';
import { CouponEntity } from '../../../../../models/entities/CouponEntity';
import { Divider, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import { useTranslation } from 'react-i18next';

interface Props {
	// open: boolean;
	// handleClose: () => void;
	coupon?: CouponEntity;
}

interface Label {
	label: string;
	value: string | undefined;
}

export const MoreInfo: React.FC<Props> = ({ coupon }) => {
	const theme = useTheme();
	const darkGrey = theme.palette.grey[300];
	const [labelList, setLabelList] = useState<Label[]>([]);
	const {t} = useTranslation();

	useEffect(() => {
		if (!coupon) return;
		const newLabel = [
			{ label: t('marketing.promoReport.detailsModalPromo'), value: coupon.promotion? coupon.promotion.name : t('marketing.promoReport.exchange') },
			{
				label: t('marketing.promoReport.detailsModalDescription'),
				value: coupon.description,
			},
			{
				label: t('marketing.promoReport.detailsModalCustomer'),
				value: `${coupon.user?.name} ${coupon.user?.lastName}`,
			},
			{ label: t('marketing.promoReport.detailsModalStore'), value: coupon.store.name },
			{ label: t('marketing.promoReport.detailsModalCountry'), value: coupon.store.country.name },
		];

		setLabelList(newLabel);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [coupon]);

	return (
		<>
			{labelList.map((data) => (
				<Grid
					container
					direction={'column'}
					sx={{ flexWrap: 'nowrap' }}
					pl={2}
					pr={2}
				>
					<Grid
						container
						justifyContent="space-between"
						sx={{ height: '50px', alignItems: 'center' }}
					>
						<Typography variant="h4" fontWeight="bold" color={darkGrey}>
							{data.label}
						</Typography>
						<Typography variant="h6" fontWeight="700" color={'#69707a'}>
							{data.value}
						</Typography>
					</Grid>
					<Divider />
				</Grid>
			))}
		</>
	);
};
