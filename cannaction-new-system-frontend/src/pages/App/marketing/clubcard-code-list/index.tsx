import React, { useEffect, useState } from 'react';
import DataTable from '../../../../components/tableDinamic';
import PaginationFilterUserRequest from '../../../../dtos/requests/PaginationFilterUserRequest';
import { useClubCardList } from '../../../../hooks/querys/club-card/useClubCard';
import { useColumnsClubCard } from './columns';
import { useTranslation } from 'react-i18next';
import { getValidatedText } from '../../../../models/entities/ClubCardCodeListEntity';

export const ClubCardCodeList: React.FC = () => {
	const [search, setSearch] = useState('');
	const [searchConfirmed, setSearchConfirmed] = useState('');
	const [limit, setLimit] = useState(10);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const { t } = useTranslation();

	const { columnsClubCardList } = useColumnsClubCard();

	const filter: PaginationFilterUserRequest = {
		search: searchConfirmed,
		page: currentPage,
		take: limit,
	};

	const {
		data: clubCardList,
		isLoading,
		isRefetching,
		refetch
	} = useClubCardList(filter);

	useEffect(() => {
		refetch()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className="container-xl px-1 mt-n10">
			<DataTable
				columns={columnsClubCardList}
				currentPage={currentPage}
				hasPagination
				hasSearch
				isLoading={isLoading || isRefetching}
				itemCount={clubCardList?.meta?.itemCount ?? 0}
				limit={limit}
				meta={clubCardList?.meta}
				onLimitChange={setLimit}
				onPageChange={setCurrentPage}
				rows={clubCardList?.data?.map((card) => ({
					code: card.code,
					status: getValidatedText(card.validated),
				}))}
				search={search}
				setCurrentPage={setCurrentPage}
				setSearch={setSearch}
				setSearchConfirmed={setSearchConfirmed}
				titleTable={t('tables.userMarketing.clubCardCodeList.tableTitle')}
			/>
		</div>
	);
};
