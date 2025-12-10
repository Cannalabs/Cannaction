import React, { useEffect, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import DataTable from '../../../../components/tableDinamic';
import { BsPencilSquare, BsTrash3 } from '../../../../themes/icons';
import { getStatusChip } from '../../../../models/enums/status.enum';
import { useColumnsClubCard } from './columns';
import { CardFormModal } from './form';
import { useClubCardUsers } from '../../../../hooks/querys/user/useClubCardUsers';
import UserEntity from '../../../../models/entities/UserEntity';
import { formatDate } from '../../../../utils/string';
import UserService from '../../../../services/UserService';
import { useModal } from '../../../../contexts/ModalMessage';
import { useSnackbar } from '../../../../contexts/Snackbar';
import PaginationFilterUserRequest from '../../../../dtos/requests/PaginationFilterUserRequest';
import { useTranslation } from 'react-i18next';

export const ClubCard: React.FC = () => {
	const [search, setSearch] = useState('');
	const [searchConfirmed, setSearchConfirmed] = useState('');
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [limit, setLimit] = useState(10);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [modalOpen, setModalOpen] = useState(false);
	const [card, setCard] = useState<UserEntity>();
	const { showConfirm } = useModal();
	const { openSnackbar } = useSnackbar();
	const { t } = useTranslation();
	const { columnsClubCard } = useColumnsClubCard();

	const handleModalClose = () => {
		setModalOpen(false);
		setCard(undefined);
	};

	const filter: PaginationFilterUserRequest = {
		search: searchConfirmed,
		page: currentPage,
		take: limit,
	};

	const {
		data: userList,
		isLoading,
		isRefetching,
		refetch,
	} = useClubCardUsers(filter);

	const handleDeleteClubCardUser = async (id: number) => {
		if (!id) return;
		try {
			await UserService.deleteClubCardUser(id);
			setCard(undefined);
			openSnackbar(t('marketing.clubCard.clubCardRemoved'), 'success');
			refetch();
		} catch (e) {
			openSnackbar(e, 'error');
		}
	};

	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchConfirmed]);

	return (
		<div className="container-xl px-4 mt-n10">
			<DataTable
				cadaster
				columns={columnsClubCard}
				currentPage={currentPage}
				handleOpen={() => setModalOpen(true)}
				hasInteraction
				hasPagination
				hasSearch
				isLoading={isLoading || isRefetching}
				itemCount={userList?.meta?.itemCount ?? 0}
				limit={limit}
				meta={userList?.meta}
				onLimitChange={setLimit}
				onPageChange={setCurrentPage}
				rows={userList?.data?.map((card) => ({
					actions: (
						<>
							<Tooltip
								title={t('marketing.clubCard.actionsColumnEditTooltip')}
								placement="top"
							>
								<IconButton
									onClick={() => {
										setCard(card);
										setModalOpen(true);
									}}
								>
									<BsPencilSquare size="14px" />
								</IconButton>
							</Tooltip>
							<Tooltip title={t('marketing.clubCard.actionsColumnRemoveTooltip')}>
								<IconButton
									onClick={() =>
										showConfirm(t('marketing.clubCard.clubCardRemoveConfirm'), {
											title: t('marketing.clubCard.clubCardRemove'),
											onConfirm: () => handleDeleteClubCardUser(card.id),
										})
									}
								>
									<BsTrash3 size="14px" />
								</IconButton>
							</Tooltip>
						</>
					),
					birthdate: card.birthdate ? formatDate(card.birthdate) : '---',
					cardId: card.code,
					created: formatDate(card.createdAt),
					email: card.email || '---',
					linkedStore: card.store?.name || '',
					name: card.name ? `${card.name} ${card.lastName}` : '---',
					status: getStatusChip(card.active),
				}))}
				search={search}
				setCurrentPage={setCurrentPage}
				setSearch={setSearch}
				setSearchConfirmed={setSearchConfirmed}
				titleTable={t('tables.userMarketing.clubCard.tableTitle')}
			/>
			<CardFormModal
				refetch={refetch}
				card={card}
				title={
					card?.id
						? t('marketing.clubCard.actionsColumnEditTooltip')
						: t('marketing.clubCard.cardsTableAddButtonTooltip')
				}
				modalOpen={modalOpen}
				setCard={setCard}
				handleClose={handleModalClose}
			/>
		</div>
	);
};
