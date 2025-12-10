import React, { useState } from 'react';
import DataTable from '../../../../components/tableDinamic';
import { useColumnsShopToCheck } from './columns';
import { getSituationChip } from '../../../../models/enums/situation.enum';
import { ChangeShopEntity } from '../../../../models/entities/ChangeShopEntity';
import { formatDate } from '../../../../utils/string';
import ResponsePagination from '../../../../dtos/responses/ResponsePaginationResponse';
import { useTranslation } from 'react-i18next';

interface Props {
	data: ResponsePagination<ChangeShopEntity> | undefined;

	loading: boolean;
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
	setSearchConfirmed: React.Dispatch<React.SetStateAction<string>>;
}

export const HistoryCheckShops: React.FC<Props> = ({
	data,
	loading,
	search,
	setSearch,
	setSearchConfirmed,
}) => {
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [limit, setLimit] = useState(10);
	const { t } = useTranslation();
	const { columnsHistoryCheckedShops } = useColumnsShopToCheck();

	return (
		<DataTable
			limit={limit}
			meta={data?.meta}
			itemCount={data?.meta?.itemCount ?? 0}
			onPageChange={setCurrentPage}
			onLimitChange={setLimit}
			currentPage={currentPage}
			setCurrentPage={setCurrentPage}
			hasPagination
			hasSearch
			titleTable={t(
				'tables.userMarketing.checkChangeShop.columnsHistoryCheckedShops.tableTitle'
			)}
			search={search}
			setSearch={setSearch}
			setSearchConfirmed={setSearchConfirmed}
			columns={columnsHistoryCheckedShops}
			rows={data?.data?.map((checkChangeShop) => ({
				customer: `${checkChangeShop.user.name} ${checkChangeShop.user.lastName}`,
				oldShop: checkChangeShop.originStore.name,
				newShop: checkChangeShop.destinyStore.name,
				created: formatDate(checkChangeShop.createdAt.toString()),
				checked: checkChangeShop.aproved !== undefined
						? getSituationChip(checkChangeShop.aproved)
						: '---',
				reasonToChange: checkChangeShop.reason,
			}))}
			isLoading={loading}
		/>
	);
};
