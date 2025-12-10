import { IconButton, Tooltip } from '@mui/material';
import React, { useEffect } from 'react';
import DataTable from '../../../../../../components/tableDinamic';
import { columnsSales } from './column';
import { BsTrash3 } from '../../../../../../themes/icons';
import { SoldItem } from '..';
import { useTranslation } from 'react-i18next';

interface Props {
	itemList: SoldItem[];
	handleRemoveItem: (id: number) => void;
	changed: boolean;
}

export const TableSales: React.FC<Props> = ({
	handleRemoveItem,
	itemList,
	changed,
}) => {
	useEffect(() => {}, [changed]);
	const { t } = useTranslation();

	return (
		<DataTable
			hasPagination={false}
			hasInteraction
			hasTitle={false}
			hasSearch={false}
			search={''}
			columns={columnsSales}
			rows={itemList.map((item, index) => ({
				product: item.itemName,
				quantity: item.amount,
				customerPoints: item.points * item.amount,
				storePoints: item.storePoints ? item.storePoints * item.amount : '',
				action: (
					<Tooltip title={t('marketing.clubCard.actionsColumnRemoveTooltip')}>
						<IconButton>
							<BsTrash3 size="14px" onClick={() => handleRemoveItem(index)} />
						</IconButton>
					</Tooltip>
				),
			}))}
			isLoading={false}
		/>
	);
};
