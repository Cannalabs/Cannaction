import React, { useEffect, useState } from 'react';
import DataTable from '../../../../../../components/tableDinamic';
import { columnsPointsStatement } from '../data';
import { getExtractOperatorText } from '../../../../../../models/enums/ExtractOperator.enum';
import { formatDate } from '../../../../../../utils/string';
import { useExtracts } from '../../../../../../hooks/querys/extract/useExtracts';
import { useTranslation } from 'react-i18next';

interface Props {
	storeId: number;
}

export const PointStatement: React.FC<Props> = ({ storeId }) => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [limit, setLimit] = useState(10);
	const [search, setSearch] = useState('');
	const [searchConfirmed, setSearchConfirmed] = useState('');
	const { t } = useTranslation();

	const { data, isRefetching, refetch, isLoading } = useExtracts({
		search: searchConfirmed,
		storeId,
		take: limit,
		page: currentPage,
	});

	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
				titleTable={t('marketing.storesSetting.pointsTableTitle')}
				columns={columnsPointsStatement}
				rows={data?.data.map((extract) => ({
					description: extract.description ?? '---',
					type: getExtractOperatorText(extract.operator),
					points: extract.points,
					amount: extract.amount,
					total: extract.total,
					balance: extract.balance,
					created: formatDate(extract.createdAt),
				}))}
				isLoading={isLoading || isRefetching}
				limit={limit}
			/>
		</div>
	);
};
