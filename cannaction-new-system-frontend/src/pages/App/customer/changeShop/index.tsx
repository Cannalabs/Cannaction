import React, { useEffect, useState } from 'react';
import { Filters } from './filters';
import DataTable from '../../../../components/tableDinamic';
import { columnsChange } from './columns';
import { getShopStatusChip } from '../../../../models/enums/shopStatus.enum';
import { useChangeShopsCustomer } from '../../../../hooks/querys/changeShop/useChangeShopsCustomer';
import { formatDate } from '../../../../utils/string';
import { useTranslation } from 'react-i18next';

export const ChangeShopCustomer: React.FC = () => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [limit, setLimit] = useState(10);
	const { t } = useTranslation();

	const { data, refetch, isRefetching, isLoading } = useChangeShopsCustomer({
		take: limit,
		page: currentPage,
	});

	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [limit, currentPage]);

	return (
		<div className="container-xl px-4 mt-n10">
			<Filters refetch={refetch} />
			<DataTable
				meta={data?.meta}
				hasSearch={false}
				itemCount={data?.meta?.itemCount ?? 0}
				onPageChange={setCurrentPage}
				onLimitChange={setLimit}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				hasPagination
				hasTitle
				titleTable={t('customer.changeShopPage.history.title')}
				isLoading={isLoading || isRefetching}
				limit={limit}
				columns={columnsChange}
				rows={data?.data.map((item) => ({
					oldShop: item.originStore.name,
					newShop: item.destinyStore.name,
					requestDate: formatDate(item.createdAt),
					reason: item.reason,
					status: getShopStatusChip(item.aproved),
				}))}
			/>
		</div>
	);
};
