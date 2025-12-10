import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { MetaDto } from '../../dtos/responses/ResponsePaginationResponse';
import { LinearProgress, Typography } from '@mui/material';
import { DataTable as SimpleDataTable } from 'simple-datatables';
import { Title } from './Title';
import { Pagination } from './Pagination';
import { FooterTable } from './FooterTable';

export interface Column {
	id: string;
	label: string;
	minWidth?: number;
	maxWidth?: number;
	align?: 'center' | 'left' | 'right';
}

export interface Row {
	[key: string]: any;
}

export interface DataTableProps {
	limit: number;
	currentPage: number;
	meta: MetaDto | undefined;
	setCurrentPage: (page: number) => void;
	onLimitChange: (limit: number) => void;
	onPageChange: (page: number) => void;
	itemCount: number;
	columns: Column[];
	rows?: Row[] | undefined;
	cadaster?: boolean;
	button?: boolean;
	download?: boolean;
	upload?: boolean;
	codeScan?: boolean;
	isLoading: boolean;
	hasInteraction?: boolean;
	search?: string | undefined;
	titleTable?: string;
	setSearch?: React.Dispatch<React.SetStateAction<string>>;
	setSearchConfirmed?: React.Dispatch<React.SetStateAction<string>>;
	hasSearch: boolean;
	hasPagination?: boolean;
	handleOpen?: () => void;
	hasTitle?: boolean;
}

const DataTable: React.FC<DataTableProps> = ({
	columns,
	rows,
	isLoading,
	setSearch,
	setSearchConfirmed,
	titleTable,
	hasSearch,
	hasPagination = true,
	search,
	hasInteraction,
	handleOpen,
	cadaster = false,
	button = false,
	download = false,
	upload = false,
	codeScan = false,
	hasTitle = true,
	onLimitChange,
	onPageChange,
	limit,
	currentPage,
	meta,
	setCurrentPage,
	itemCount,
}) => {
	const { t } = useTranslation();
	const tableRef = useRef<HTMLTableElement | null>(null);
	const dataTableInstance = useRef<any>(null);

	const pages = Math.ceil(itemCount / limit);

	const composeFooterText = (totalItems: number, take: number, page: number) => {
		if (take === 0) return ` ${totalItems} `;
		return `${t('general.tableFooter.tableFooterShow')} ${
			page * take - take + 1
		} ${t('general.tableFooter.tableFooterTo')}
		${page * take >= totalItems ? totalItems : page * take} 
		${t('general.tableFooter.tableFooterOf')} ${totalItems} ${t(
			'general.tableFooter.tableFooterEntries'
		)}`;
	};

	useEffect(() => {
		if (tableRef.current && !dataTableInstance.current) {
			dataTableInstance.current = new SimpleDataTable(tableRef.current, {
				perPageSelect: [2, 5, 10, 15, 20],
				perPage: limit,
				columns: columns.map((col) => ({ select: col.id, sortable: true })),
			});
		}

		return () => {
			if (dataTableInstance.current) {
				dataTableInstance.current.destroy();
			}
		};
	}, [columns, limit]);

	useEffect(() => {
		if (dataTableInstance.current) {
			dataTableInstance.current.update();
		}
	}, [rows]);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch && setSearch(e.target.value);
	};

	const handlePageChange = (page: number) => {
		setCurrentPage((page - 1) * limit);
		onPageChange(page);
	};

	return (
		<div className="row">
			<div className="col-12 mb-4">
				<div className="card card-header-actions h-100">
					{hasTitle && (
						<Title
							titleTable={titleTable}
							hasInteraction={hasInteraction}
							cadaster={cadaster}
							button={button}
							download={download}
							upload={upload}
							codeScan={codeScan}
							handleOpen={handleOpen}
						/>
					)}

					{hasPagination && (
						<Pagination
							isLoading={isLoading}
							limit={limit}
							hasSearch={hasSearch}
							search={search}
							setSearchConfirmed={setSearchConfirmed}
							handleSearchChange={handleSearchChange}
							onLimitChange={onLimitChange}
						/>
					)}

					<div className="card-body table-responsive">
						<table className="table table-striped table-hover">
							<thead>
								<tr>
									{columns.map((column) => (
										<th
											key={column.id}
											style={{
												minWidth: column.minWidth,
												fontWeight: 'bold',
												fontSize: '1rem',
											}}
											className={`text-${column.align || 'left'}`}
										>
											{column.label}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{isLoading ? (
									<tr>
										<td colSpan={columns.length}>
											<LinearProgress style={{ width: '100%' }} />
										</td>
									</tr>
								) : (
									rows &&
									rows.map((row, rowIndex) => (
										<tr tabIndex={-1} key={rowIndex}>
											{columns.map((column) => {
												const value = row[column.id];
												return (
													<td
														key={column.id}
														className="text-left"
														style={{
															minWidth: column.minWidth,
															maxWidth: column.maxWidth,
															wordBreak: 'break-word',
															whiteSpace: 'normal',
														}}
													>
														<Typography variant="body2" fontSize="0.875rem">
															{value}
														</Typography>
													</td>
												);
											})}
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>

					{meta && hasPagination && (
						<FooterTable
							meta={meta}
							composeFooterText={composeFooterText}
							handlePageChange={handlePageChange}
							currentPage={currentPage}
							pages={pages}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default DataTable;
