import React, { useEffect, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import DataTable from '../../../../components/tableDinamic';
import { BsPencilSquare, BsTrash3 } from '../../../../themes/icons';
import { getStatusChip } from '../../../../models/enums/status.enum';
import { CardFormModal } from './form';
import { useClubCardUsers } from '../../../../hooks/querys/user/useClubCardUsers';
import UserEntity from '../../../../models/entities/UserEntity';
import { formatDate } from '../../../../utils/string';
import UserService from '../../../../services/UserService';
import { useModal } from '../../../../contexts/ModalMessage';
import { useSnackbar } from '../../../../contexts/Snackbar';
import { useTranslation } from 'react-i18next';
import { useClubCardColumns } from './columns';

export const ClubCardStore: React.FC = () => {
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
	const { columnsClubCard } = useClubCardColumns();

	const handleModalClose = () => {
		setModalOpen(false);
		setCard(undefined);
	};

	const {
		data: userList,
		isLoading,
		isRefetching,
		refetch,
	} = useClubCardUsers({
		search: searchConfirmed,
		page: currentPage,
		take: limit,
	});

	const handleDeleteClubCardUser = async (id: number) => {
		if (!id) return;
		try {
			await UserService.deleteClubCardUser(id);
			setCard(undefined);
			openSnackbar('Club Card User deleted successfully!', 'success');
			refetch();
		} catch (e: unknown) {
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
				limit={limit}
				itemCount={userList?.meta?.itemCount ?? 0}
				onPageChange={setCurrentPage}
				onLimitChange={setLimit}
				meta={userList?.meta}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				cadaster
				hasPagination
				hasInteraction
				hasSearch
				titleTable={t('tables.userStore.clubCard.tableTitle')}
				search={search}
				setSearch={setSearch}
				setSearchConfirmed={setSearchConfirmed}
				handleOpen={() => setModalOpen(true)}
				columns={columnsClubCard}
				rows={userList?.data?.map((card) => ({
					cardId: card.code,
					created: formatDate(card.createdAt),
					linkedStore: card.store?.name || '',
					status: getStatusChip(card.active),
					actions: (
						<>
							<Tooltip title="Edit" placement="top">
								<IconButton
									onClick={() => {
										setCard(card);
										setModalOpen(true);
									}}
								>
									<BsPencilSquare size="14px" />
								</IconButton>
							</Tooltip>
							<Tooltip title="Remove">
								{/* <IconButton onClick={() => handleDeleteClubCardUser(card.id)}> */}
								<IconButton
									onClick={() =>
										showConfirm(
											'Are you sure you want to delete this card? This action cannot be undone.',
											{
												title: 'Delete Card',
												onConfirm: () => handleDeleteClubCardUser(card.id),
											}
										)
									}
								>
									<BsTrash3 size="14px" />
								</IconButton>
							</Tooltip>
						</>
					),
				}))}
				isLoading={isLoading || isRefetching}
			/>
			<CardFormModal
				refetch={refetch}
				card={card}
				title={card?.id ? 'Edit Card' : 'Add Card'}
				modalOpen={modalOpen}
				setCard={setCard}
				handleClose={handleModalClose}
			/>
		</div>
	);
};
