import React from 'react';
import ListByCountryForDashboardResponse from '../../../../../dtos/responses/ListByCountryForDashboardResponse';
import DataTable from '../../../../../components/tableDinamic';
import { columnsUserPerCountry } from './columns';
import { useAuth } from '../../../../../contexts/Auth';
import { UserTypeEnum } from '../../../../../models/enums/userType.enum';
import { useTranslation } from 'react-i18next';

interface Props {
	users: ListByCountryForDashboardResponse[];
	loading: boolean;
}

export const UsersPerCountry: React.FC<Props> = ({ users, loading }) => {
	const { userTypeLogged } = useAuth();
	const { t } = useTranslation();

	return (
		<div className="col-xxl-6 col-xl-6 mb-4">
			<div className="card card-header-actions h-100">
				<DataTable
					titleTable={
						userTypeLogged == UserTypeEnum.SUPER
							? t('marketing.dashboard.usersTableTitle')
							: t('marketing.dashboard.usersCount')
					}
					hasSearch={false}
					hasInteraction={false}
					isLoading={loading}
					columns={columnsUserPerCountry}
					rows={users.map((user) => ({
						country: user.country,
						active: user.active,
						inactive: user.inactive,
						total: user.total,
					}))}
					hasPagination={false}
				/>
			</div>
		</div>
	);
};
