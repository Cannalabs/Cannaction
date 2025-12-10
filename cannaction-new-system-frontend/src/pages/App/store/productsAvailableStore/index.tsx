import React, { useEffect, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import DataTable from '../../../../components/tableDinamic';
import { columnsProductAvailable } from './columnProductsAvailable';
import { useNavigate } from 'react-router-dom';
import img from '../../../../assets/favicon.ico';
import { BsEye } from '../../../../themes/icons';
import { useItems } from '../../../../hooks/querys/item/useItems';
import { PaginationFilterItemRequest } from '../../../../dtos/requests/PaginationFilterItemRequest';
import { Thumb } from '../../../../components/tableDinamic/Thumb';

export const ProductsAvailableStore: React.FC = () => {
	const navigate = useNavigate();
	const [search, setSearch] = useState('');
	const [searchConfirmed, setSearchConfirmed] = useState('');
	const [limit, setLimit] = useState(10);
	const [currentPage, setCurrentPage] = useState<number>(1);

	const filter: PaginationFilterItemRequest = {
		take: limit,
		page: currentPage,
		search: searchConfirmed,
	};

	const { data: itemList, refetch, isRefetching, isLoading } = useItems(filter);

	useEffect(() => {
		refetch();
	}, [refetch]);

	const handleOpenView = (id: number) => {
		navigate(`/detail-item/${id}`);
	};

	return (
		<div className="container-xl px-4 mt-n10">
			<DataTable
				hasPagination
				hasSearch
				currentPage={currentPage}
				meta={itemList?.meta}
				itemCount={itemList?.meta?.itemCount ?? 0}
				onPageChange={setCurrentPage}
				onLimitChange={setLimit}
				setCurrentPage={setCurrentPage}
				titleTable="Products"
				search={search}
				setSearch={setSearch}
				setSearchConfirmed={setSearchConfirmed}
				columns={columnsProductAvailable}
				rows={itemList?.data.map((item) => ({
					thumb: <Thumb name={item.name} imageUrl={item.image} defaultUrl={img} />,
					name: item.name,
					description: item.description ?? '---',
					points: item.points,
					actions: (
						<Tooltip title="Details">
							<IconButton onClick={() => handleOpenView(item.id)}>
								<BsEye size={16} />
							</IconButton>
						</Tooltip>
					),
				}))}
				isLoading={isLoading || isRefetching}
				limit={limit}
			/>
		</div>
	);
};
