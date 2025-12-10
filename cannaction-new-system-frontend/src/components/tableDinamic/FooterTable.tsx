import { Grid, Typography, IconButton } from '@mui/material';
import React from 'react';
import { MetaDto } from '../../dtos/responses/ResponsePaginationResponse';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

interface Props {
	meta: MetaDto | undefined;
	composeFooterText: (totalItems: number, take: number, page: number) => string;
	handlePageChange: (page: number) => void;
	currentPage: number;
	pages: number;
}

export const FooterTable: React.FC<Props> = ({
	meta,
	composeFooterText,
	handlePageChange,
	currentPage,
	pages,
}) => {
	return (
		<Grid
			container
			sx={{ background: '#fff', height: '80px' }}
			p={2}
			justifyContent={'space-between'}
			alignItems={'center'}
		>
			<Typography variant="h5">
				{composeFooterText(meta.itemCount, meta?.take, meta?.page)}
			</Typography>

			<Grid container sx={{ width: '70%' }}>
				<IconButton
					onClick={() => handlePageChange(1)}
					disabled={!meta.hasPreviousPage}
					aria-label="first page"
				>
					<FirstPageIcon />
				</IconButton>
				<IconButton
					onClick={() => handlePageChange(currentPage! - 1)}
					disabled={!meta.hasPreviousPage}
					aria-label="previous page"
				>
					<KeyboardArrowLeft />
				</IconButton>

				<IconButton
					onClick={() => handlePageChange(currentPage! + 1)}
					aria-label="next page"
					disabled={!meta.hasNextPage}
				>
					<KeyboardArrowRight />
				</IconButton>
				<IconButton
					onClick={() => handlePageChange(pages)}
					aria-label="last page"
					disabled={meta.page === meta.pageCount || !meta.hasNextPage}
				>
					<LastPageIcon />
				</IconButton>
			</Grid>
		</Grid>
	);
};
