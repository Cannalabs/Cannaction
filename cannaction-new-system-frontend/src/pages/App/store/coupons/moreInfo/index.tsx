import React, { useEffect, useState } from 'react';
import { CouponEntity } from '../../../../../models/entities/CouponEntity';
import { formatDate } from '../../../../../utils/string';
import { useTranslation } from 'react-i18next';

interface Label {
	label: string;
	value: string | undefined;
}

interface Props {
	coupon?: CouponEntity;
}

export const MoreInfo: React.FC<Props> = ({ coupon }) => {
	const [labelList, setLabelList] = useState<Label[]>([]);
	const { t } = useTranslation();

	useEffect(() => {
		if (!coupon) return;
		const newLabel = [
			{
				label: t('store.couponsDetailsModal.title'),
				value: coupon.promotion?.name ?? t('marketing.promoReport.exchange'),
			},
			{
				label: t('store.couponsDetailsModal.descriptionLabel'),
				value: coupon.description ?? '',
			},
			{
				label: t('store.couponsDetailsModal.customerLabel'),
				value: coupon.user ? `${coupon.user.name} ${coupon.user.lastName}` : '',
			},
			{
				label: t('store.couponsDetailsModal.createdLabel'),
				value: formatDate(coupon.createdAt),
			},
		];

		setLabelList(newLabel);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [coupon]);

	return (
		<>
			{labelList.map((data) => (
				<table className="table table-borderless mb-0">
					<tr className="border-bottom">
						<th className="text-muted" scope="col" style={{ paddingLeft: '1rem' }}>
							{data.label}
						</th>
						<td className="text-end pb-3">
							<div className="text-uppercase small fw-700">{data.value}</div>
						</td>
					</tr>
				</table>
			))}
		</>
	);
};
