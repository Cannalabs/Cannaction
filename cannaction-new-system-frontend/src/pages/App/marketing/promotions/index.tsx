import React, { useEffect, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import DataTable from '../../../../components/tableDinamic';
import { useColumnsPromotions } from './columnPromotions';
import { BsThreeDotsVertical, BsTrash3 } from '../../../../themes/icons';
import { getStatusChip } from '../../../../models/enums/status.enum';
import { MenuComponent } from '../../../../components/menuComponent';
import { useNavigate } from 'react-router-dom';
import { usePromotions } from '../../../../hooks/querys/promotion/usePromotions';
import { PromotionEntity } from '../../../../models/entities/PromotionEntity';
import { formatDate } from '../../../../utils/string';
import PromotionService from '../../../../services/PromotionService';
import { useSnackbar } from '../../../../contexts/Snackbar';
import { useModal } from '../../../../contexts/ModalMessage';
import imgDefault from '/favicon.ico';
import { Thumb } from '../../../../components/tableDinamic/Thumb';
import { useTranslation } from 'react-i18next';

const Promotions: React.FC = () => {
	const navigate = useNavigate();
	const [search, setSearch] = useState('');
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [searchConfirmed, setSearchConfirmed] = useState('');
	const [limit, setLimit] = useState(10);
	const [promotion, setPromotion] = useState<PromotionEntity>();
	const { t } = useTranslation();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const { columnsPromotions } = useColumnsPromotions();

	const {
		data: promotions,
		isLoading,
		isRefetching,
		refetch,
	} = usePromotions({ search: searchConfirmed, take: limit, page: currentPage });
	const open = Boolean(anchorEl);
	const { openSnackbar } = useSnackbar();
	const { showConfirm } = useModal();

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePromotionStatus = async (id: number, active: boolean) => {
		setAnchorEl(null);
		try {
			await PromotionService.changePromotionStatus(id, active);
			refetch();
			openSnackbar(t('marketing.promotions.promotionUpdated'), 'success');
		} catch (e: unknown) {
			openSnackbar(e, 'error');
		}
	};

	const handleDeletePromotion = async (id: number) => {
		setAnchorEl(null);
		try {
			await PromotionService.deletePromotion(id);
			refetch();
			openSnackbar(t('marketing.promotions.promotionDeleted'), 'success');
		} catch (e: unknown) {
			openSnackbar(e, 'error');
		}
	};

	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchConfirmed]);

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleAddPromotion = () => {
		navigate('/add-promotion');
	};

	const handleOpenEdit = (id: number) => {
		navigate(`/edit-promotion/${id}`);
	};

	return (
		<div className="container-xl px-4 mt-n10">
			<DataTable
				limit={limit}
				isLoading={isLoading || isRefetching}
				onLimitChange={setLimit}
				meta={promotions?.meta}
				currentPage={currentPage}
				onPageChange={setCurrentPage}
				itemCount={promotions?.meta?.itemCount ?? 0}
				setCurrentPage={setCurrentPage}
				cadaster
				hasPagination
				hasInteraction
				hasSearch
				titleTable={t('marketing.promotions.promotionsTablePromotionColumn')}
				search={search}
				setSearch={setSearch}
				setSearchConfirmed={setSearchConfirmed}
				handleOpen={() => handleAddPromotion()}
				columns={columnsPromotions}
				rows={promotions?.data?.map((promo) => ({
					thumb: (
						<Thumb name={promo.name} imageUrl={promo.thumb} defaultUrl={imgDefault} />
					),
					promotion: promo.name,
					maxCoupons: promo.maxCoupons,
					created: formatDate(promo.createdAt),
					active: getStatusChip(promo.active),
					actions: (
						<>
							<Tooltip title={t('marketing.promotions.actionsColumnMoreTooltip')}>
								<IconButton
									onClick={(event) => {
										handleClick(event);
										setPromotion(promo);
									}}
								>
									<BsThreeDotsVertical size="14px" />
								</IconButton>
							</Tooltip>
							<Tooltip title={t('marketing.promotions.actionsColumnRemoveTooltip')}>
								<IconButton
									onClick={() =>
										showConfirm(t('marketing.promotions.promotionDeleteConfirm'), {
											title: t('marketing.promotions.promotionDelete'),
											onConfirm: () => handleDeletePromotion(promo.id),
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
			{promotion && (
				<MenuComponent
					handleClose={() => handleClose()}
					anchorEl={anchorEl}
					open={open}
					handleOpenEdit={() => handleOpenEdit(promotion?.id)}
					handleActive={() => handlePromotionStatus(promotion.id, promotion.active)}
					handleInactive={() =>
						handlePromotionStatus(promotion.id, promotion.active)
					}
					active={promotion.active}
					entityId={promotion.id}
				/>
			)}
		</div>
	);
};

export default Promotions;
