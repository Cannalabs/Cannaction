import React, { useEffect, useState } from 'react';
import DataTable from '../../../../../../components/tableDinamic';
import { columnsStock } from '../data';
import { formatDate } from '../../../../../../utils/string';
import { useStockForStoreSettings } from '../../../../../../hooks/querys/stock/useStockForStoreSettings';
import { useTranslation } from 'react-i18next';

interface Props {
	storeId: number;
}

export const Stock: React.FC<Props> = ({ storeId }) => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [limit, setLimit] = useState(10);
	const [search, setSearch] = useState(''); // eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [searchConfirmed, setSearchConfirmed] = useState('');
	const { data, refetch, isLoading, isRefetching } = useStockForStoreSettings(
		storeId,
		{ search: searchConfirmed, page: currentPage, take: limit }
	);
	const {t} = useTranslation();

	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="container-xl " style={{ padding: 0, maxWidth: '1464px' }}>
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
				titleTable={t('marketing.storesSetting.stockTableTitle')}
				columns={columnsStock}
				rows={data?.data?.map((stock) => ({
					product: stock?.item.name,
					lastUpdate: formatDate(stock.updatedAt),
					input: stock.input,
					output: stock.output,
					// minimumAmount: stock.minimumAmount,
					total: stock.total,
					// actions: stock.item.exchange && (
					// 	<Tooltip title="Adjustment">
					// 		<IconButton
					// 			onClick={() => {
					// 				setId(stock.id);
					// 				setMinimumAmount(stock.minimumAmount);
					// 				handleOpen();
					// 			}}
					// 		>
					// 			<HiOutlineAdjustmentsVertical size="14px" />
					// 		</IconButton>
					// 	</Tooltip>
					// ),
				}))}
				isLoading={isLoading || isRefetching}
				limit={limit}
			/>
		</div>
	);
};
