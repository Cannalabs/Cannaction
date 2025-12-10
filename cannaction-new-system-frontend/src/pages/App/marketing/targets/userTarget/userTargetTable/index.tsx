import React, { useState } from 'react';
import DataTable from '../../../../../../components/tableDinamic';
import { columns } from './columns';
import { getMoneyBackStatusChip } from '../../../../../../models/enums/moneyBackStatus.enum';
import { Button, IconButton, Tooltip } from '@mui/material';
import { BsBan, BsCheck2, BsTrash3 } from '../../../../../../themes/icons';
import { ProgressBar } from '../../../../../../components/progressBar';
import { UserTargetEntity } from '../../../../../../models/entities/UserTargetEntity';
import { formatDate } from '../../../../../../utils/string';
import ResponsePagination from '../../../../../../dtos/responses/ResponsePaginationResponse';
import { useNavigate } from 'react-router-dom';
import UserTargetService from '../../../../../../services/UserTargetService';
import { useSnackbar } from '../../../../../../contexts/Snackbar';
import { useTranslation } from 'react-i18next';
import { useModal } from '../../../../../../contexts/ModalMessage';

interface Props {
	notConcluded: ResponsePagination<UserTargetEntity> | undefined;
	loading: boolean;
	handleTargetStatus: (id: number, status: boolean) => void;
	handleDeleteTarget: (id: number) => void;
	setSearchNotConcluded: React.Dispatch<React.SetStateAction<string>>;
	refetch: () => void;
}

export const PromoTargetUserTable: React.FC<Props> = ({
	notConcluded,
	loading,
	handleTargetStatus,
	handleDeleteTarget,
	setSearchNotConcluded,
	refetch,
}) => {
	const [limit, setLimit] = useState(10);
	const [search, setSearch] = useState('');
	const [currentPage, setCurrentPage] = useState<number>(0);
	const navigate = useNavigate();
	const { openSnackbar } = useSnackbar();
		const { showConfirm } = useModal();
	const { t } = useTranslation();

	const activeAllTargets = async () => {
		try {
			await UserTargetService.activeAllTargets();
			refetch();
			openSnackbar(t('marketing.targets.activeAllTargets'), 'success');
		} catch (e) {
			openSnackbar(e, 'error');
		}
	};

	return (
		<>
			<Button variant="contained" sx={{ width: '50%' }} onClick={activeAllTargets}>
				{t('marketing.targets.activeTargets')}
			</Button>
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
				titleTable={t('marketing.targets.userbackTargets')}
				search={search}
				setSearch={setSearch}
				setSearchConfirmed={setSearchNotConcluded}
				columns={columns}
				rows={notConcluded?.data.map((target) => ({
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
					deadline: formatDate(target.targetFinalDate),
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
				}))}
				isLoading={loading}
			/>
		</>
	);
};
