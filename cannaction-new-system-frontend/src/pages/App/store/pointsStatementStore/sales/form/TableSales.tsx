import { Grid, IconButton, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DataTable from '../../../../../../components/tableDinamic';
import { columnsSales } from './column';
import { BsTrash3 } from '../../../../../../themes/icons';
import { SoldItem } from '../../../customersStore/sales';
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
	const {t} = useTranslation();

	const getStorePoints = (value: number) => {
		const percentage = value * 0.4;
		const firstDecimal = Math.floor((percentage * 10) % 10);

		if (firstDecimal <= 5) {
			return Math.floor(percentage);
		} else {
			return Math.ceil(percentage);
		}
	};
	return (
		<Grid container direction="column" gap={2}>
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
					points: getStorePoints(item.points) * item.amount,
					storePoints: item.storePoints ? item.storePoints * item.amount : '',
					action: (
						<Tooltip title={t('marketing.promotions.actionsColumnRemoveTooltip')}>
							<IconButton>
								<BsTrash3 size="14px" onClick={() => handleRemoveItem(index)} />
							</IconButton>
						</Tooltip>
					),
				}))}
				isLoading={false}
			/>
		</Grid>
	);
};
