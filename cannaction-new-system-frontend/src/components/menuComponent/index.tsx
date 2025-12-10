import {
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	MenuList,
} from '@mui/material';
import React from 'react';
import {
	BsBan,
	BsCart2,
	BsCheck2,
	BsPencilSquare,
} from '../../themes/icons';
import { useTranslation } from 'react-i18next';

interface Props {
	open: boolean;
	anchorEl: HTMLElement | null;
	entityId?: number;
	active?: boolean;
	sales?: boolean;
	handleClose: () => void;
	handleOpenEdit?: (entityId: number) => void;
	handleActive: (entityId: number) => void;
	handleInactive: (entityId: number) => void;
	handleOpenSales?: (entityId: number) => void;
	hasEdit?: boolean;
}

export const MenuComponent: React.FC<Props> = ({
	open,
	anchorEl,
	entityId,
	active,
	handleClose,
	handleOpenEdit,
	handleActive,
	handleInactive,
	handleOpenSales,
	sales,
	hasEdit = true,
}) => {
	const { t } = useTranslation();
	return (
		<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
			<MenuList>
				{active ? (
					<MenuItem onClick={() => entityId && handleInactive(entityId)}>
						<ListItemIcon>
							<BsBan size="16px" />
						</ListItemIcon>
						<ListItemText>
							{t('marketing.promotions.actionsMoreButtonDisable')}
						</ListItemText>
					</MenuItem>
				) : (
					<MenuItem onClick={() => entityId && handleActive(entityId)}>
						<ListItemIcon>
							<BsCheck2 size="16px" />
						</ListItemIcon>
						<ListItemText>
							{t('marketing.productsAvailable.actionsMoreButtonActivate')}
						</ListItemText>
					</MenuItem>
				)}
				{sales && (
					<MenuItem
						onClick={() => entityId && handleOpenSales && handleOpenSales(entityId)}
					>
						<ListItemIcon>
							<BsCart2 size="16px" />
						</ListItemIcon>
						<ListItemText>{t('marketing.dashboard.salesTitle')}</ListItemText>
					</MenuItem>
				)}

				{hasEdit && (
					<MenuItem
						onClick={() => entityId && handleOpenEdit && handleOpenEdit(entityId)}
					>
						<ListItemIcon>
							<BsPencilSquare size="16px" />
						</ListItemIcon>
						<ListItemText>
							{t('marketing.promotions.actionsMoreButtonEdit')}
						</ListItemText>
					</MenuItem>
				)}
			</MenuList>
		</Menu>
	);
};
