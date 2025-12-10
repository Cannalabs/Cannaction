import React, { useState } from 'react';
import DataTable from '../../../../components/tableDinamic';
import { useColumnsShopToCheck } from './columns';
import { IconButton, Tooltip } from '@mui/material';
import { BsCheck2Circle, BsXLg } from '../../../../themes/icons';
import { ChangeShopEntity } from '../../../../models/entities/ChangeShopEntity';
import { formatDate } from '../../../../utils/string';
import ResponsePagination from '../../../../dtos/responses/ResponsePaginationResponse';
import { useTranslation } from 'react-i18next';

interface Props {
	data?: ResponsePagination<ChangeShopEntity> | undefined;
	loading: boolean;
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
	handleAcceptChangeShop: (id: number, accept: boolean) => void;
	setSearchConfirmed: React.Dispatch<React.SetStateAction<string>>;
}

export const ShopToCheck: React.FC<Props> = ({
	data,
	loading,
	search,
	setSearch,
	handleAcceptChangeShop,
	setSearchConfirmed,
}) => {
	const [limit, setLimit] = useState(10);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const { t } = useTranslation();
	const { columnsShopToCheck } = useColumnsShopToCheck();

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
				'tables.userMarketing.checkChangeShop.columnsShopToCheck.tableTitle'
			)}
			search={search}
			setSearch={setSearch}
			setSearchConfirmed={setSearchConfirmed}
			columns={columnsShopToCheck}
			rows={data?.data?.map((change) => ({
				customer: `${change.user.name} ${change.user.lastName}`,
				oldShop: change.originStore.name,
				newShop: change.destinyStore.name,
				created: formatDate(change.createdAt.toString()),
				reasonToChange: change.reason,
				actions: (
					<>
						<Tooltip title={t('marketing.checkChangShop.accept')}>
							<IconButton
								onClick={() => {
									handleAcceptChangeShop(change.id, true);
								}}
							>
								<BsCheck2Circle size="14px" color="#0D675E" />
							</IconButton>
						</Tooltip>
						<Tooltip title={t('marketing.checkChangShop.reject')}>
							<IconButton
								onClick={() => {
									handleAcceptChangeShop(change.id, false);
								}}
							>
								<BsXLg size="12px" color="#0D675E" />
							</IconButton>
						</Tooltip>
					</>
				),
			}))}
			isLoading={loading}
		/>
	);
};
