import React from 'react';
import ListByCountryForDashboardResponse from '../../../../../dtos/responses/ListByCountryForDashboardResponse';
import DataTable from '../../../../../components/tableDinamic';
import { columnsShopsPerCountry } from './columns';
import { useAuth } from '../../../../../contexts/Auth';
import { UserTypeEnum } from '../../../../../models/enums/userType.enum';
import { useTranslation } from 'react-i18next';

interface Props {
	shops: ListByCountryForDashboardResponse[];
	loading: boolean;
}

export const ShopsPerCountry: React.FC<Props> = ({ shops, loading }) => {
	const { userTypeLogged } = useAuth();
	const { t } = useTranslation();

	return (
		<div className="col-xxl-6 col-xl-6 mb-4">
			<div className="card card-header-actions h-100">
				<DataTable
					titleTable={
						userTypeLogged == UserTypeEnum.SUPER
							? t('marketing.dashboard.shopsTableTitle')
							: t('marketing.dashboard.shopsCount')
					}
					isLoading={loading}
					hasSearch={false}
					columns={columnsShopsPerCountry}
					rows={shops.map((shop) => ({
						country: shop.country,
						active: shop.active,
						inactive: shop.inactive,
						total: shop.total,
					}))}
					hasPagination={false}
				/>
			</div>
		</div>
	);
};
