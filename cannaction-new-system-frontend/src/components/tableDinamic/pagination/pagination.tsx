import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import {
	FormControl,
	Grid,
	IconButton,
	MenuItem,
	Select,
	Typography,
} from '@mui/material';
import React from 'react';
import { Footer } from './footPagination';
import { MetaDto } from '../../../dtos/responses/ResponsePaginationResponse';

interface PaginationProps {
	meta: MetaDto;
	limit: number;
	currentPage: number;
	itemCount: number;
	setCurrentPage: (page: number) => void;
	onPageChange: (page: number) => void;
	onLimitChange: (limit: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
	meta,
	limit,
	itemCount,
	currentPage,
	setCurrentPage,
	onPageChange,
	onLimitChange,
}) => {
	const pages = Math.ceil(itemCount / limit);

	const handlePageChange = (page: number) => {
		setCurrentPage((page - 1) * limit!);
		onPageChange(page);
	};

	const firstPage = currentPage === 1;

	currentPage * limit >= itemCount ? itemCount : currentPage * limit;

	const composeFooterText = (totalItems: number, take: number, page: number) => {
		if (take === 0) return ` ${totalItems} `;
		return `${page * take - take + 1} -
		${page * take >= totalItems ? totalItems : page * take} 
		de ${totalItems}`;
	};

	return (
		<Footer>
			<Grid container width="80%" justifyContent="flex-end" alignItems="center">
				<Grid container alignItems="center" justifyContent="flex-end" width="25%">
					<Typography>Linhas por página</Typography>
				</Grid>
				<Grid container width="20%">
					<FormControl sx={{ width: '5.5rem', marginLeft: '32px' }}>
						<Select
							sx={{ height: '40px' }}
							labelId="rowsperpage"
							id="id-rowsPerPage"
							name="rowsperpage"
							value={limit}
							onChange={(e) => onLimitChange(Number(e.target.value))}
						>
							<MenuItem value={5}>5</MenuItem>
							<MenuItem value={10}>10</MenuItem>
							<MenuItem value={15}>15</MenuItem>
							<MenuItem value={20}>20</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				{meta && (
					<>
						<Grid alignItems="center" width="20%">
							<Typography>
								{composeFooterText(meta.itemCount, meta.take, meta.page)}
							</Typography>
						</Grid>

						<Grid width="20%" alignItems="center" justifyContent="space-around">
							<IconButton
								onClick={() => handlePageChange(0)}
								disabled={firstPage}
								aria-label="first page"
							>
								<FirstPageIcon />
							</IconButton>
							<IconButton
								onClick={() => handlePageChange(currentPage! - 1)}
								disabled={firstPage}
								aria-label="previous page"
							>
								<KeyboardArrowLeft />
							</IconButton>

							<IconButton
								onClick={() => handlePageChange(currentPage! + 1)}
								aria-label="next page"
								disabled={currentPage === pages}
							>
								<KeyboardArrowRight />
							</IconButton>
							<IconButton
								onClick={() => handlePageChange(pages)}
								aria-label="last page"
								disabled={currentPage === pages}
							>
								<LastPageIcon />
							</IconButton>
						</Grid>
					</>
				)}
			</Grid>
		</Footer>
	);
};
