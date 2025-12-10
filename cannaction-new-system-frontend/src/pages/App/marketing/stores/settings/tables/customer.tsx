import React, { useState } from 'react';
import DataTable from '../../../../../../components/tableDinamic';
import { columnsCustomers } from '../data';
import { getStatusChip } from '../../../../../../models/enums/status.enum';
import { useUsers } from '../../../../../../hooks/querys/user/useUsers';
import { useTranslation } from 'react-i18next';

interface Props {
	storeId: number;
}

export const Customer: React.FC<Props> = ({ storeId }) => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [limit, setLimit] = useState(10);
	const [search, setSearch] = useState('');
	const [searchConfirmed, setSearchConfirmed] = useState('');
	const {t} = useTranslation();

	const { data, isLoading } = useUsers({
		search: searchConfirmed,
		page: currentPage,
		take: limit,
		storeId,
	});

	return (
		<div
			className="container-xl "
			style={{ padding: 0, marginTop: '1rem', maxWidth: '1464px' }}
		>
			<DataTable
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				meta={data?.meta}
				onLimitChange={setLimit}
				onPageChange={setCurrentPage}
				itemCount={data?.meta.itemCount ?? 0}
				hasPagination
				hasSearch
				search={search}
				setSearch={setSearch}
				setSearchConfirmed={setSearchConfirmed}
				titleTable={t('marketing.storesSetting.customersTableTitle')}
				columns={columnsCustomers}
				rows={data?.data.map((customer) => ({
					code: customer.code,
					name: `${customer.name} ${customer.lastName}`,
					email: customer.email,
					status: getStatusChip(customer.active),
				}))}
				isLoading={isLoading}
				limit={limit}
			/>
		</div>
	);
};
