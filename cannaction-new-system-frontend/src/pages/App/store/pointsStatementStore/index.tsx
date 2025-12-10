import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import DataTable from '../../../../components/tableDinamic';
import { usePointsStatementColumns } from './dataPointsStatement';
import { formatDate } from '../../../../utils/string';
// import { useNavigate } from 'react-router-dom';
import { useExtracts } from '../../../../hooks/querys/extract/useExtracts';
import {
	ExtractOperatorEnum,
	getStatusChipExtractOperator,
} from '../../../../models/enums/ExtractOperator.enum';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const PointsStatementStore: React.FC = () => {
	const [search, setSearch] = useState('');
	const [searchConfirmed, setSearchConfirmed] = useState('');
	// const navigate = useNavigate();
	const [limit, setLimit] = useState(10);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const navigate = useNavigate();
	const { pointRegistrationColumn } = usePointsStatementColumns();
	const { t } = useTranslation();

	const { data, isRefetching, refetch, isLoading } = useExtracts({
		search: searchConfirmed,
		take: limit,
		page: currentPage,
	});

	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleOpenSales = () => {
		navigate(`/sales-points-statement`);
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
					titleTable={t('tables.userStore.dashboard.pointRegistration.tableTitle')}
					meta={data?.meta}
					itemCount={data?.meta?.itemCount ?? 0}
					onPageChange={setCurrentPage}
					onLimitChange={setLimit}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					button
					hasPagination
					hasInteraction
					hasSearch
					handleOpen={handleOpenSales}
					search={search}
					setSearch={setSearch}
					setSearchConfirmed={setSearchConfirmed}
					columns={pointRegistrationColumn}
					rows={data?.data.map((points) => ({
						pointRegistration: points.description,
						type: getStatusChipExtractOperator(
							points.operator as ExtractOperatorEnum
						),
						points: points.points,
						quantity: points.amount,
						total: points.total,
						balance: points.balance,
						created: formatDate(points.createdAt),
					}))}
					isLoading={isLoading || isRefetching}
					limit={limit}
				/>
			</Grid>
		</div>
	);
};
