import React from 'react';
import DataTable from '../../../../../../components/tableDinamic';
import { useMoneyBackTable } from './columns';
import { getMoneyBackStatusChip } from '../../../../../../models/enums/moneyBackStatus.enum';
import { IconButton, Tooltip } from '@mui/material';
import { BsBan, BsCheck2, BsTrash3 } from '../../../../../../themes/icons';
import { ProgressBar } from '../../../../../../components/progressBar';
import { formatDate } from '../../../../../../utils/string';
import ResponsePagination from '../../../../../../dtos/responses/ResponsePaginationResponse';
import { StoreTargetEntity } from '../../../../../../models/entities/StoreTargetEntity';
import { useModal } from '../../../../../../contexts/ModalMessage';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Props {
	notConcluded: ResponsePagination<StoreTargetEntity> | undefined;
	loading: boolean;
	handleTargetStatus: (id: number, status: boolean) => void;
	handleDeleteTarget: (id: number) => void;
	setSearchNotConcluded: React.Dispatch<React.SetStateAction<string>>;
	limit: number;
	setLimit: (limit: number) => void;
	currentPage: number;
	setCurrentPage: (page: number) => void;
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const MoneyBackTable: React.FC<Props> = ({
	notConcluded,
	loading,
	handleTargetStatus,
	handleDeleteTarget,
	setSearchNotConcluded,
	limit,
	setLimit,
	currentPage,
	setCurrentPage,
	search,
	setSearch,
}) => {
	const { showConfirm } = useModal();
	const navigate = useNavigate();
	const { t } = useTranslation();
	//const { moneyBackTable } = useMoneyBackTable();
	const {moneyBackTable} = useMoneyBackTable();

	return (
		<div className="col-xxl-12 col-xl-12 mb-4">
			<div className="card h-100">
				<DataTable
					limit={limit}
					meta={notConcluded?.meta}
					itemCount={notConcluded?.meta?.itemCount ?? 0}
					onPageChange={setCurrentPage}
					onLimitChange={setLimit}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					hasPagination
					hasInteraction
					hasSearch
					titleTable={t('tables.userMarketing.targets.moneybackTargets.tableTitle')}
					search={search}
					setSearch={setSearch}
					setSearchConfirmed={setSearchNotConcluded}
					columns={moneyBackTable}
					rows={notConcluded?.data?.map((moneyBack) => ({
						country: moneyBack.store.country.name,
						store: (
							<span
								style={{ cursor: 'pointer' }}
								onClick={() => navigate(`/store-settings/${moneyBack.store.id}`)}
							>
								{moneyBack.store.name}
							</span>
						),
						target: moneyBack.target,
						progress: (
							<ProgressBar progress={moneyBack.progress} max={moneyBack.target} />
						),
						prize: moneyBack.prizeMoney,
						deadline: formatDate(moneyBack.finalDateTarget),
						status: getMoneyBackStatusChip(moneyBack.active),
						actions: (
							<>
								{moneyBack.active ? (
									<Tooltip title={t('marketing.targets.actionsColumnDisableTooltip')}>
										<IconButton
											onClick={() => handleTargetStatus(moneyBack.id, moneyBack.active)}
										>
											<BsBan size="14px" />
										</IconButton>
									</Tooltip>
								) : (
									<Tooltip title={t('marketing.general.active')}>
										<IconButton
											onClick={() => handleTargetStatus(moneyBack.id, moneyBack.active)}
										>
											<BsCheck2 size="16px" />
										</IconButton>
									</Tooltip>
								)}
								<Tooltip title={t('marketing.targets.actionsColumnRemoveTooltip')}>
									<IconButton
										onClick={() =>
											showConfirm(t('marketing.targets.targetDeleteConfirm'), {
												title: t('marketing.targets.targetDelete'),
												onConfirm: () => handleDeleteTarget(moneyBack.id),
											})
										}
									>
										<BsTrash3 size="14px" />
									</IconButton>
								</Tooltip>
							</>
						),
					}))}
					isLoading={loading}
				/>
			</div>
		</div>
	);
};
