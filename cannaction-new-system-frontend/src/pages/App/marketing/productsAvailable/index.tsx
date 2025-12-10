import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import DataTable from '../../../../components/tableDinamic';
import { useColumnsProductAvailable } from './columnProductsAvailable';
import { useNavigate } from 'react-router-dom';
import imgDefault from '../../../../assets/favicon.ico';
import { getStatusChip } from '../../../../models/enums/status.enum';
import { BsThreeDotsVertical, BsTrash3 } from '../../../../themes/icons';
import { MenuComponent } from '../../../../components/menuComponent';
import { useItems } from '../../../../hooks/querys/item/useItems';
import { ItemEntity } from '../../../../models/entities/ItemEntity';
import ItemService from '../../../../services/ItemService';
import { useSnackbar } from '../../../../contexts/Snackbar';

import { PaginationFilterItemRequest } from '../../../../dtos/requests/PaginationFilterItemRequest';
import { useModal } from '../../../../contexts/ModalMessage';
import { Thumb } from '../../../../components/tableDinamic/Thumb';
import { useTranslation } from 'react-i18next';
import { getProductTypeText } from '../../../../models/enums/itemType.enum';

const ProductsAvailable: React.FC = () => {
	const navigate = useNavigate();
	const [search, setSearch] = useState('');
	const [searchConfirmed, setSearchConfirmed] = useState('');
	const [limit, setLimit] = useState(10);
	const [item, setItem] = useState<ItemEntity | undefined>(undefined);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const { showConfirm } = useModal();
	const { openSnackbar } = useSnackbar();
	const { t } = useTranslation();
	const { columnsProductAvailable } = useColumnsProductAvailable();

	const filter: PaginationFilterItemRequest = {
		take: limit,
		page: currentPage,
		search: searchConfirmed,
	};

	const { data: itemList, refetch, isRefetching, isLoading } = useItems(filter);

	useEffect(() => {
		refetch();
	}, [refetch]);

	const handleAnchorClick = (
		event: React.MouseEvent<HTMLButtonElement>,
		selectedItem: ItemEntity
	) => {
		setAnchorEl(event.currentTarget);
		setItem(selectedItem);
	};

	const handleCloseMenu = () => {
		setAnchorEl(null);
		setItem(undefined);
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleDeleteItem = async (id: number) => {
		try {
			await ItemService.deleteItem(id);
			openSnackbar(t('marketing.productsAvailable.productRemoved'), 'success');
			refetch();
		} catch (e) {
			openSnackbar(e, 'error');
		} finally {
			handleCloseMenu();
		}
	};

	const handleItemStatus = async () => {
		if (!item) return;
		try {
			await ItemService.changeItemStatus(item.id, item.active);
			openSnackbar(t('marketing.productsAvailable.productStatus'), 'success');
			refetch();
		} catch (e) {
			openSnackbar(e, 'error');
		} finally {
			handleCloseMenu();
		}
	};

	const handleAddProduct = () => {
		navigate('/add-item');
	};

	const handleOpenEdit = (id: number) => {
		navigate(`/edit-item/${id}`);
	};

	const handleDeleteConfirmation = (id: number) => {
		showConfirm(t('marketing.productsAvailable.productDeleteConfirm'), {
			title: t('marketing.productsAvailable.productDelete'),
			onConfirm: () => handleDeleteItem(id),
		});
	};

	return (
		<div className="container-xl px-4 mt-n10">
			<DataTable
				limit={limit}
				meta={itemList?.meta}
				itemCount={itemList?.meta?.itemCount ?? 0}
				onPageChange={setCurrentPage}
				onLimitChange={setLimit}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				cadaster
				hasPagination
				hasInteraction
				hasSearch
				titleTable={t('tables.userMarketing.productsAvailable.tableTitle')}
				search={search}
				setSearch={setSearch}
				setSearchConfirmed={setSearchConfirmed}
				handleOpen={handleAddProduct}
				columns={columnsProductAvailable}
				rows={itemList?.data?.map((item) => ({
					thumb: (
						<Thumb name={item.name} imageUrl={item.image} defaultUrl={imgDefault} />
					),
					name: item.name,
					description: item.description ?? '---',
					points: item.points,
					status: getStatusChip(item.active),
					type: getProductTypeText(item.type),
					actions: (
						<>
							<IconButton onClick={(event) => handleAnchorClick(event, item)}>
								<BsThreeDotsVertical size="14px" />
							</IconButton>
							<IconButton onClick={() => handleDeleteConfirmation(item.id)}>
								<BsTrash3 size="14px" />
							</IconButton>
						</>
					),
				}))}
				isLoading={isLoading || isRefetching}
			/>
			{item && (
				<MenuComponent
					handleClose={handleCloseMenu}
					anchorEl={anchorEl}
					open={open}
					handleOpenEdit={() => handleOpenEdit(item.id)}
					handleActive={handleItemStatus}
					handleInactive={handleItemStatus}
					active={item.active}
					entityId={item.id}
				/>
			)}
		</div>
	);
};

export default ProductsAvailable;
