import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../../../components/tableDinamic';
import { useColumnsUser } from '../columnsUser';
import { BsThreeDotsVertical, BsTrash3 } from '../../../../../themes/icons';
import { getStatusChip } from '../../../../../models/enums/status.enum';
import { MenuComponent } from '../../../../../components/menuComponent';
import UserEntity from '../../../../../models/entities/UserEntity';
import { formatDate } from '../../../../../utils/string';
import { getUserTypeText } from '../../../../../models/enums/userType.enum';
import UserService from '../../../../../services/UserService';
import { useSnackbar } from '../../../../../contexts/Snackbar';

import ResponsePagination from '../../../../../dtos/responses/ResponsePaginationResponse';
import { useModal } from '../../../../../contexts/ModalMessage';
import { useTranslation } from 'react-i18next';

interface Props {
	loading: boolean;
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
	setSearchConfirmed: React.Dispatch<React.SetStateAction<string>>;
	users?: ResponsePagination<UserEntity> | undefined;
	refetch: () => void;
	limit: number;
	setLimit: (limit: number) => void;
	currentPage: number;
	setCurrentPage: (page: number) => void;
}

export const TableUsers: React.FC<Props> = ({
	search,
	setSearch,
	setSearchConfirmed,
	users,
	loading,
	refetch,
	limit,
	setLimit,
	currentPage,
	setCurrentPage,
}) => {
	const navigate = useNavigate();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [user, setUser] = useState<UserEntity>();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const { openSnackbar } = useSnackbar();
	const { showConfirm } = useModal();
	const { t } = useTranslation();
	const { columnsUser } = useColumnsUser();

	const handleUserStatus = async (id: number, active: boolean) => {
		setAnchorEl(null);
		try {
			await UserService.changeUserStatus(id, active);
			refetch();
			openSnackbar(t('marketing.users.userStatusUpdated'), 'success');
		} catch (e: unknown) {
			openSnackbar(e, 'error');
		}
	};

	const handleDeleteUser = async (id: number) => {
		setAnchorEl(null);
		try {
			await UserService.deleteClubCardUser(id);
			refetch();
			openSnackbar(t('marketing.users.userDeleted'), 'success');
		} catch (e: unknown) {
			openSnackbar(e, 'error');
		}
	};

	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleAddUser = () => {
		navigate('/add-user');
	};

	const handleOpenEdit = (id: number) => {
		navigate(`/edit-user/${id}`);
	};

	return (
		<>
			<DataTable
				limit={limit}
				meta={users?.meta}
				itemCount={users?.meta.itemCount ?? 0}
				onPageChange={setCurrentPage}
				onLimitChange={setLimit}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				cadaster
				// download
				hasPagination
				hasInteraction
				hasSearch
				titleTable={t('tables.userMarketing.users.tableTitle')}
				search={search}
				setSearch={setSearch}
				setSearchConfirmed={setSearchConfirmed}
				handleOpen={() => handleAddUser()}
				columns={columnsUser}
				isLoading={loading}
				rows={users?.data?.map((user) => ({
					name: `${user.name} ${user.lastName}`,
					store: user.store ? user.store.name : '---',
					lastInteractionDate: formatDate(user.lastInteractionDate),
					country: user.country.name,
					role: getUserTypeText(user.userType),
					active: getStatusChip(user.active),
					actions: (
						<>
							<Tooltip title={t('marketing.users.actionsColumnMoreTooltip')}>
								<IconButton
									onClick={(event) => {
										handleClick(event);
										setUser(user);
									}}
								>
									<BsThreeDotsVertical size="14px" />
								</IconButton>
							</Tooltip>
							<Tooltip title={t('marketing.users.actionsColumnRemoveTooltip')}>
								<IconButton
									onClick={() =>
										showConfirm(t('marketing.users.userDeleteConfirm'), {
											title: t('marketing.users.userDelete'),
											onConfirm: () => handleDeleteUser(user?.id),
										})
									}
								>
									<BsTrash3 size="14px" />
								</IconButton>
							</Tooltip>
						</>
					),
				}))}
			/>
			{user && (
				<MenuComponent
					handleClose={() => handleClose()}
					anchorEl={anchorEl}
					open={open}
					handleOpenEdit={() => handleOpenEdit(user?.id)}
					handleActive={() => handleUserStatus(user?.id, false)}
					handleInactive={() => handleUserStatus(user?.id, true)}
					active={user.active}
					entityId={user.id}
				/>
			)}
		</>
	);
};
