import { Chip } from '@mui/material';
import i18n from '../../utils/i18n';

export enum CouponTypeEnum {
	PROMO = 'promo',
	POINTS = 'with-points',
}

export const getCouponTypeText = (status: CouponTypeEnum) => {
	switch (status) {
		case CouponTypeEnum.PROMO:
			return i18n.t('enums.couponTypes.promo');
		case CouponTypeEnum.POINTS:
			return i18n.t('enums.couponTypes.withPoints');
		default:
			return '';
	}
};

export const getCouponTypeChip = (status: CouponTypeEnum) => {
	let background = '';
	switch (status) {
		case CouponTypeEnum.PROMO:
			background = '#F4A100';
			break;
		case CouponTypeEnum.POINTS:
			background = '#388BA7';
			break;

		default:
			background = '';
			break;
	}

	const label = getCouponTypeText(status);

	return (
		<Chip
			label={label}
			sx={{ height: '25px', background: background, color: '#fff' }}
		/>
	);
};
