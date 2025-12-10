import React from 'react';
import DataTable from '../../../../../../components/tableDinamic';
import { columns } from './columns';
import { getMoneyBackStatusChip } from '../../../../../../models/enums/moneyBackStatus.enum';
import { IconButton, Tooltip } from '@mui/material';
import { BsBan, BsCheck2, BsTrash3 } from '../../../../../../themes/icons';
import { ProgressBar } from '../../../../../../components/progressBar';
import { StoreTargetEntity } from '../../../../../../models/entities/StoreTargetEntity';
import { formatDate } from '../../../../../../utils/string';
import ResponsePagination, {
	MetaDto,
} from '../../../../../../dtos/responses/ResponsePaginationResponse';
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
	meta: MetaDto | undefined;
}

export const PromoTargetStoreTable: React.FC<Props> = ({
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
	meta,
}) => {
	const { showConfirm } = useModal();
	const navigate = useNavigate();
	const { t } = useTranslation();

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
			titleTable={t('marketing.targets.itembackTargets')}
			search={search}
			setSearch={setSearch}
			setSearchConfirmed={setSearchNotConcluded}
			columns={columns}
			rows={
				notConcluded &&
				notConcluded?.data.map((target) => ({
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
					deadline: formatDate(target.finalDateTarget),
					status: getMoneyBackStatusChip(target.active),
					actions: (
						<>
							{target.active ? (
								<Tooltip title={t('marketing.targets.actionsColumnDisableTooltip')}>
									<IconButton
										onClick={() => handleTargetStatus(target.id, target.active)}
									>
										<BsBan size="14px" />
									</IconButton>
								</Tooltip>
							) : (
								<Tooltip title={t('marketing.general.active')}> 
									<IconButton
										onClick={() => handleTargetStatus(target.id, target.active)}
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
											onConfirm: () => handleDeleteTarget(target.id),
										})
									}
								>
									<BsTrash3 size="14px" />
								</IconButton>
							</Tooltip>
						</>
					),
				}))
			}
			isLoading={loading}
		/>
	);
};
