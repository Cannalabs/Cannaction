import React, { useEffect, useState } from 'react';
import { Grid, IconButton, Tooltip } from '@mui/material';
import DataTable from '../../../../components/tableDinamic';
import { useCustomerColumns } from './dataCustomers';
import { BsCart2, BsEye, BsPencilSquare } from '../../../../themes/icons';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../../../../hooks/querys/user/useUsers';
import { formatDate } from '../../../../utils/string';
import { getStatusChip } from '../../../../models/enums/status.enum';
import { CardFormModal } from '../clubCardStore/form';
import UserEntity from '../../../../models/entities/UserEntity';
import { useClubCardUsers } from '../../../../hooks/querys/user/useClubCardUsers';
import { MoreInformationModal } from '../../../../components/modals/moreInformation';
import { CustomerInfoModal } from './CustomerInfo';
import { useTranslation } from 'react-i18next';
import { useClubCardColumns } from '../clubCardStore/columns';

const Customers: React.FC = () => {
	const { columnsCustomers } = useCustomerColumns();
	const [search, setSearch] = useState('');
	const [searchConfirmed, setSearchConfirmed] = useState('');
	const [limit, setLimit] = useState(10);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [searchCard, setSearchCard] = useState('');
	const [searchConfirmedCard, setSearchConfirmedCard] = useState('');
	const [limitCard, setLimitCard] = useState(10);
	const [modalOpen, setModalOpen] = useState(false);
	const [open, setOpen] = useState<boolean>(false);
	const [card, setCard] = useState<UserEntity>();
	const [currentPageCard, setCurrentPageCard] = useState<number>(1);
	const [id, setId] = useState<number>();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { columnsClubCard } = useClubCardColumns();

	const handleModalClose = () => {
		setModalOpen(false);
		setCard(undefined);
		refetchCard();
	};

	const handleOpen = (id: number) => {
		setId(id);
		setOpen(true);
	};

	const { data, refetch, isLoading, isRefetching } = useUsers({
		search: searchConfirmed,
		page: currentPage,
		take: limit,
	});

	const {
		data: userList,
		isLoading: loadingCard,
		isRefetching: refetchingCard,
		refetch: refetchCard,
	} = useClubCardUsers({
		search: searchConfirmed,
		page: currentPage,
		take: limit,
	});

	useEffect(() => {
		refetch();
		refetchCard();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchConfirmed]);

	useEffect(() => {
		refetchCard();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchConfirmedCard]);

	const handleOpenSales = (id: number) => {
		navigate(`/sales-customer/${id}`);
	};

	return (
		<div className="container-xl px-4 mt-n10">
			<Grid
				my="1rem"
				sx={{ background: '#fff' }}
				boxShadow="0 0.15rem 1.75rem 0 rgba(33, 40, 50, 0.15)"
				borderRadius=".35rem"
				xs={4.8}
				sm={12}
				columns={{ xs: 2, sm: 8, md: 12 }}
			>
				<DataTable
					// download
					// cadaster
					titleTable={t('tables.userStore.customer.customers.tableTitle')}
					limit={limit}
					meta={data?.meta}
					itemCount={data?.meta.itemCount ?? 0}
					onPageChange={setCurrentPage}
					onLimitChange={setLimit}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					hasPagination
					hasInteraction
					hasSearch
					search={search}
					setSearch={setSearch}
					setSearchConfirmed={setSearchConfirmed}
					columns={columnsCustomers}
					rows={data?.data.map((customer) => ({
						nome: `${customer.name} ${customer.lastName}`,
						email: customer.email,
						joined: formatDate(customer.createdAt),
						status: getStatusChip(customer.active),
						actions: (
							<>
								<>
									<Tooltip title={t('marketing.dashboard.salesTitle')}>
										<IconButton onClick={() => handleOpenSales(customer.id)}>
											<BsCart2 size="16px" />
										</IconButton>
									</Tooltip>
									<Tooltip
										title={t('marketing.promoReport.actionsColumnDetailsTooltip')}
									>
										<IconButton
											onClick={() => {
												handleOpen(customer.id);
											}}
										>
											<BsEye color="#0D675E" />
										</IconButton>
									</Tooltip>
								</>
							</>
						),
					}))}
					isLoading={isLoading || isRefetching}
				/>
			</Grid>
			<DataTable
				limit={limitCard}
				itemCount={userList?.meta?.itemCount ?? 0}
				onPageChange={setCurrentPageCard}
				onLimitChange={setLimitCard}
				meta={userList?.meta}
				currentPage={currentPageCard}
				setCurrentPage={setCurrentPageCard}
				cadaster
				hasPagination
				hasInteraction
				hasSearch
				titleTable={t('store.customers.cards.title')}
				search={searchCard}
				setSearch={setSearchCard}
				setSearchConfirmed={setSearchConfirmedCard}
				handleOpen={() => setModalOpen(true)}
				columns={columnsClubCard}
				rows={userList?.data?.map((card) => ({
					cardId: card.code,
					name: card.name ? `${card.name} ${card.lastName}` : '---',
					email: card.email || '---',
					birthdate: card.birthdate ? formatDate(card.birthdate) : '---',
					created: formatDate(card.createdAt),
					linkedStore: card.store?.name || '',
					status: getStatusChip(card.active),
					actions: (
						<>
							<Tooltip title={t('store.customers.cards.editTooltip')} placement="top">
								<IconButton
									onClick={() => {
										setCard(card);
										setModalOpen(true);
									}}
								>
									<BsPencilSquare size="14px" />
								</IconButton>
							</Tooltip>
							<Tooltip title={t('marketing.dashboard.salesTitle')}>
								<IconButton onClick={() => handleOpenSales(card.id)}>
									<BsCart2 size="16px" />
								</IconButton>
							</Tooltip>
							<Tooltip title={t('marketing.promoReport.actionsColumnDetailsTooltip')}>
								<IconButton
									onClick={() => {
										handleOpen(card.id);
									}}
								>
									<BsEye color="#0D675E" />
								</IconButton>
							</Tooltip>
						</>
					),
				}))}
				isLoading={loadingCard || refetchingCard}
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
			<MoreInformationModal
				title={t('store.customers.customerInfoModal.title')}
				open={open}
				hideSave
				handleClose={() => setOpen(false)}
			>
				<CustomerInfoModal id={id} />
			</MoreInformationModal>
		</div>
	);
};

export default Customers;
