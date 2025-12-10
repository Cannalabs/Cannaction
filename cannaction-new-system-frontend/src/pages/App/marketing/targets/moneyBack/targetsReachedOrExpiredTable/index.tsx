import React from 'react';
import DataTable from '../../../../../../components/tableDinamic';
import { useTargetsReachedOrExpiredTable } from './columns';
import { getTargetStatusChip } from '../../../../../../models/enums/targetStatusEnum';
import { ProgressBar } from '../../../../../../components/progressBar';
import { StoreTargetEntity } from '../../../../../../models/entities/StoreTargetEntity';
import { formatDate } from '../../../../../../utils/string';
import ResponsePagination from '../../../../../../dtos/responses/ResponsePaginationResponse';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Props {
	concluded: ResponsePagination<StoreTargetEntity> | undefined;
	loading: boolean;
	setSearchConcluded: React.Dispatch<React.SetStateAction<string>>;
	limit: number;
	setLimit: (limit: number) => void;
	currentPage: number;
	setCurrentPage: (page: number) => void;
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const TargetsReachedOrExpiredTable: React.FC<Props> = ({
	concluded,
	loading,
	setSearchConcluded,
	limit,
	setLimit,
	currentPage,
	setCurrentPage,
	search,
	setSearch,
}) => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { targetsReachedOrExpiredTable } = useTargetsReachedOrExpiredTable();

	return (
		<DataTable
			limit={limit}
			meta={concluded?.meta}
			itemCount={concluded?.meta?.itemCount ?? 0}
			onPageChange={setCurrentPage}
			onLimitChange={setLimit}
			currentPage={currentPage}
			setCurrentPage={setCurrentPage}
			hasPagination
			hasInteraction
			hasSearch
			titleTable={t(
				'tables.userMarketing.targets.targetsReachedOrExpired.tableTitle'
			)}
			search={search}
			setSearch={setSearch}
			setSearchConfirmed={setSearchConcluded}
			columns={targetsReachedOrExpiredTable}
			rows={concluded?.data?.map((target) => ({
				country: target.store.country.name,
				store: (
					<span
						style={{ cursor: 'pointer' }}
						onClick={() => navigate(`/store-settings/${target.store.id}`)}
					>
						{target.store.name}
					</span>
				),
				target: target.target,
				progress: <ProgressBar progress={target.progress} max={target.target} />,
				prize: target.prizeMoney,
				created: formatDate(target.createdAt),
				deadline: formatDate(target.finalDateTarget),
				status: getTargetStatusChip(target.success ? target.success : false),
			}))}
			isLoading={loading}
		/>
	);
};
