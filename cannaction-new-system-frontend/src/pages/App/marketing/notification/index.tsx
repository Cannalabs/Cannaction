import React, { useEffect, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import DataTable from '../../../../components/tableDinamic';
import { useNavigate } from 'react-router-dom';
import { useColumnsNotifications } from './columnNotification';
import NotificationEntity from '../../../../models/entities/NotificationEntity';
import { BsThreeDotsVertical, BsTrash3 } from '../../../../themes/icons';
import { MenuComponent } from '../../../../components/menuComponent';
import { getStatusChip } from '../../../../models/enums/status.enum';
import { useModal } from '../../../../contexts/ModalMessage';
import { useNotifications } from '../../../../hooks/querys/notification/useNotifications';
import { formatDate } from '../../../../utils/string';
import NotificationService from '../../../../services/NotificationService';
import { useSnackbar } from '../../../../contexts/Snackbar';
import { useTranslation } from 'react-i18next';

export const Notification: React.FC = () => {
	const navigate = useNavigate();
	const [search, setSearch] = useState('');
	const [searchConfirmed, setSearchConfirmed] = useState('');
	const [limit, setLimit] = useState(10);
	const [notification, setNotification] = useState<NotificationEntity>();
	const [currentPage, setCurrentPage] = useState<number>(0);
	const { showConfirm } = useModal();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const { openSnackbar } = useSnackbar();
	const { t } = useTranslation();
	const { columnsNotifications } = useColumnsNotifications();

	const { data, refetch, isRefetching, isLoading } = useNotifications({
		search: searchConfirmed,
	});

	const handleNotificationStatus = async () => {
		if (!notification) return;
		try {
			await NotificationService.changeNotificationStatus(
				notification.id,
				notification.active
			);
			refetch();
			openSnackbar(t('marketing.notification.notificationStatus'), 'success');
		} catch (e: unknown) {
			openSnackbar(e, 'error');
		} finally {
			handleClose();
		}
	};

	const handleDeleteNotification = async (id: number) => {
		try {
			await NotificationService.deleteNotification(id);
			openSnackbar(t('marketing.notification.notificationDeleted'), 'success');
			refetch();
		} catch (e: unknown) {
			openSnackbar(e, 'error');
		} finally {
			handleClose();
			setNotification(undefined);
		}
	};

	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleAddPromotion = () => {
		navigate('/add-notification');
	};

	const handleOpenEdit = (id: number) => {
		navigate(`/edit-notification/${id}`);
	};

	return (
		<div className="container-xl px-4 mt-n10">
			<DataTable
				limit={limit}
				meta={data?.meta}
				itemCount={data?.meta?.itemCount ?? 0}
				onPageChange={setCurrentPage}
				onLimitChange={setLimit}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				cadaster
				hasPagination
				hasInteraction
				hasSearch
				titleTable={t('tables.userMarketing.notification.tableTitle')}
				search={search}
				setSearch={setSearch}
				setSearchConfirmed={setSearchConfirmed}
				handleOpen={() => handleAddPromotion()}
				columns={columnsNotifications}
				rows={data?.data.map((notification) => ({
					title: notification.title,
					typeUser: `${notification.userType
						.substring(0, 1)
						.toUpperCase()}${notification.userType.substring(1)}`,
					country: notification.country.name,
					created: formatDate(notification.createdAt),
					active: getStatusChip(notification.active),
					actions: (
						<>
							<Tooltip title={t('marketing.notification.actionsColumnMoreTooltip')}>
								<IconButton
									onClick={(event) => {
										handleClick(event);
										setNotification(notification);
									}}
								>
									<BsThreeDotsVertical size="14px" />
								</IconButton>
							</Tooltip>
							<Tooltip title={t('marketing.notification.actionsColumnRemoveTooltip')}>
								<IconButton
									onClick={() =>
										showConfirm(t('marketing.notification.notificationDeleteConfirm'), {
											title: t('marketing.notification.notificationDelete'),
											onConfirm: () => handleDeleteNotification(notification.id),
										})
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
			{notification && (
				<MenuComponent
					handleClose={() => handleClose()}
					anchorEl={anchorEl}
					open={open}
					handleOpenEdit={() => handleOpenEdit(notification?.id)}
					handleActive={() => handleNotificationStatus()}
					handleInactive={() => handleNotificationStatus()}
					active={notification.active}
					entityId={notification.id}
				/>
			)}
		</div>
	);
};
