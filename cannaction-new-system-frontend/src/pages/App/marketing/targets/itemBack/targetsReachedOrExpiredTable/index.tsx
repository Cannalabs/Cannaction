import React from 'react';
import DataTable from '../../../../../../components/tableDinamic';
import { columns } from './columns';
import { getTargetStatusChip } from '../../../../../../models/enums/targetStatusEnum';
import { ProgressBar } from '../../../../../../components/progressBar';
import { StoreTargetEntity } from '../../../../../../models/entities/StoreTargetEntity';
import { formatDate } from '../../../../../../utils/string';
import ResponsePagination, {
	MetaDto,
} from '../../../../../../dtos/responses/ResponsePaginationResponse';
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
	meta: MetaDto | undefined;
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
	meta,
}) => {
	const navigate = useNavigate();
	const {t} = useTranslation();

	return (
		<DataTable
			meta={meta}
			currentPage={currentPage}
			setCurrentPage={setCurrentPage}
			limit={limit}
			itemCount={10}
			onPageChange={setCurrentPage}
			onLimitChange={setLimit}
			hasPagination
			hasInteraction
			hasSearch
			titleTable={t('marketing.targets.targetsReachedTableTitle')}
			search={search}
			setSearch={setSearch}
			setSearchConfirmed={setSearchConcluded}
			columns={columns}
			rows={
				concluded &&
				concluded?.data.map((target) => ({
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
					prize: target.prizeItem?.name,
					created: formatDate(target.createdAt),
					deadline: formatDate(target.finalDateTarget),
					status: getTargetStatusChip(target.success ? target.success : false),
				}))
			}
			isLoading={loading}
		/>
	);
};
