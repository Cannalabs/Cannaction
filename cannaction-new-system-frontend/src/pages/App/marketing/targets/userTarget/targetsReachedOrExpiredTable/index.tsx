import React, { useState } from 'react';
import DataTable from '../../../../../../components/tableDinamic';
import { columns } from './columns';
import { getTargetStatusChip } from '../../../../../../models/enums/targetStatusEnum';
import { ProgressBar } from '../../../../../../components/progressBar';
import { UserTargetEntity } from '../../../../../../models/entities/UserTargetEntity';
import { formatDate } from '../../../../../../utils/string';
import ResponsePagination from '../../../../../../dtos/responses/ResponsePaginationResponse';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Props {
	concluded: ResponsePagination<UserTargetEntity> | undefined;
	loading: boolean;
	setSearchConcluded: React.Dispatch<React.SetStateAction<string>>;
}

export const TargetsReachedOrExpiredTable: React.FC<Props> = ({
	concluded,
	loading,
	setSearchConcluded,
}) => {
	const [limit, setLimit] = useState(10);
	const [search, setSearch] = useState('');
	const [currentPage, setCurrentPage] = useState<number>(0);
	const navigate = useNavigate();
	const {t} = useTranslation();

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
			titleTable={t('marketing.targets.targetsReachedTableTitle')}
			search={search}
			setSearch={setSearch}
			setSearchConfirmed={setSearchConcluded}
			columns={columns}
			rows={concluded?.data.map((target) => ({
				country: target.store.country.name,
				store: (
					<span
						style={{ cursor: 'pointer' }}
						onClick={() => navigate(`/store-settings/${target.store.id}`)}
					>
						{target.store.name}
					</span>
				),
				user: `${target.user.name} ${target.user.lastName}`,
				target: target.target,
				progress: <ProgressBar progress={target.progress} max={target.target} />,
				prize: target.prizeItem.name,
				created: formatDate(target.createdAt),
				deadline: formatDate(target.targetFinalDate),
				status: getTargetStatusChip(target.success ? target.success : false),
			}))}
			isLoading={loading}
		/>
	);
};
