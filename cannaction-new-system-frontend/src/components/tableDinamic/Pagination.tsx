import {
	Grid,
	FormControl,
	Select,
	MenuItem,
	Typography,
	OutlinedInput,
	InputAdornment,
	IconButton,
	useTheme,
	useMediaQuery,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MdOutlineSearch } from 'react-icons/md';

interface Props {
	limit: number;
	hasSearch: boolean;
	search?: string;
	isLoading: boolean;
	setSearch?: React.Dispatch<React.SetStateAction<string>>;
	setSearchConfirmed?: React.Dispatch<React.SetStateAction<string>>;
	handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onLimitChange: (limit: number) => void;
}

export const Pagination: React.FC<Props> = ({
	isLoading,
	limit,
	hasSearch,
	search,
	setSearchConfirmed,
	handleSearchChange,
	onLimitChange,
}) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const { t } = useTranslation();

	return (
		<Grid
			container
			justifyContent="space-between"
			p={2}
			alignItems="center"
			gap={2}
			flexWrap="nowrap"
		>
			<Grid
				container
				justifyContent="flex-start"
				alignItems="center"
				gap={2}
				width={'auto'}
				xs={4}
				sm={12}
				md={4}
			>
				<FormControl>
					<Select
						sx={{ height: '40px', borderRadius: '6px' }}
						labelId="rowsperpage"
						id="id-rowsPerPage"
						name="rowsperpage"
						value={limit}
						onChange={(e) => onLimitChange(Number(e.target.value))}
					>
						<MenuItem value={2}>2</MenuItem>
						<MenuItem value={5}>5</MenuItem>
						<MenuItem value={10}>10</MenuItem>
						<MenuItem value={15}>15</MenuItem>
						<MenuItem value={20}>20</MenuItem>
					</Select>
				</FormControl>
				{!isMobile && (
					<Typography
						variant={'subtitle1'}
						fontSize={'1.095rem'}
						color={'gray'}
						fontWeight={500}
					>
						{t('marketing.promoReport.couponsTableEntriesDropdown')}
					</Typography>
				)}
			</Grid>

			{hasSearch && (
				<FormControl
					variant="outlined"
					sx={{ width: { xs: '60%', sm: '40%' }, maxWidth: '300px' }}
				>
					<OutlinedInput
						fullWidth
						sx={{ borderRadius: '6px', height: '44px' }}
						value={search}
						onKeyDown={(event) => {
							if (event.key === 'Enter')
								setSearchConfirmed && setSearchConfirmed(search ?? '');
						}}
						onChange={handleSearchChange}
						placeholder={t('marketing.promoReport.couponsTableSearchInput')}
						disabled={isLoading}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									onClick={() => setSearchConfirmed && setSearchConfirmed(search ?? '')}
									edge="end"
								>
									<MdOutlineSearch />
								</IconButton>
							</InputAdornment>
						}
					/>
				</FormControl>
			)}
		</Grid>
	);
};
