import {
	Autocomplete,
	Button,
	Grid,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material';
import React from 'react';
import { StyledPatterInput } from '../../customSelect/styles';
import { useItemLabeled } from '../../../hooks/querys/item/useItemLabeled';
import { BsPlus, HiOutlineAdjustmentsVertical } from '../../../themes/icons';
import { useStoreLabeledByCountry } from '../../../hooks/querys/store/useStoreLabeledByCountry';
import useDisableNumberInputScroll from '../../../hooks/useDisabledScrollNumberInput';

interface Props {
	title: string;
}

export const Information: React.FC<Props> = ({ title }) => {
	const { items } = useItemLabeled();
	const { stores } = useStoreLabeledByCountry();
	useDisableNumberInputScroll();

	return (
		<Grid
			container
			justifyContent="space-between"
			bgcolor={'#FFFFFF'}
			borderRadius={'8px'}
			boxShadow="0.15rem 0 1.75rem 0 rgba(33, 40, 50, 0.15)"
			spacing={{ xs: 2, md: 3 }}
			columns={{ xs: 4, sm: 8, md: 12 }}
			xs={8}
			height={650}
		>
			<Grid
				bgcolor={'#F8F8F9'}
				sx={{ borderTopLeftRadius: '6px', borderTopRightRadius: '6px' }}
				container
				justifyContent="space-between"
				alignItems="center"
				p={2}
				height={'60px'}
				borderBottom={'1px solid lightgray'}
			>
				<Typography color="primary" variant="h4">
					{title}
				</Typography>
			</Grid>
			<Grid container p={2} flexWrap={'wrap'} justifyContent={'space-between'}>
				<Grid item xs={5} sm={4} md={8}>
					<Autocomplete
						disablePortal
						sx={StyledPatterInput}
						options={items}
						fullWidth
						renderInput={(params) => (
							<TextField
								{...params}
								variant="outlined"
								value={items}
								placeholder="Products List"
							/>
						)}
					/>
				</Grid>

				<Grid
					height={'55px'}
					width={'30%'}
					container
					alignItems="center"
					columns={{ xs: 2 }}
				>
					<Grid item xs={1} sm={7} md={7}>
						<Tooltip title="Add Product" placement="top">
							<Button variant="contained" sx={{ height: 40, width: '100px' }}>
								<BsPlus />
							</Button>
						</Tooltip>
					</Grid>
					<Grid item xs={1} sm={7} md={7}>
						<Tooltip title="Manager Product" placement="top">
							<Button
								variant="contained"
								sx={{ height: 40, width: '100px', background: 'black' }}
							>
								<HiOutlineAdjustmentsVertical />
							</Button>
						</Tooltip>
					</Grid>
				</Grid>
				<Grid item xs={1} sm={4} md={12}>
					<TextField fullWidth placeholder="Promotion Name" />
				</Grid>
				<Grid item xs={1} sm={4} md={12}>
					<TextField
						fullWidth
						placeholder="Promotion Description"
						multiline
						rows={4}
					/>
				</Grid>
				<Grid item xs={2} sm={2} md={5.5}>
					<Autocomplete
						disablePortal
						sx={StyledPatterInput}
						options={stores}
						renderInput={(params) => (
							<TextField
								{...params}
								variant="outlined"
								value={stores}
								placeholder="Choose Promotion Type"
							/>
						)}
					/>
				</Grid>
				<Grid item xs={2} sm={2} md={5.5}>
					<TextField fullWidth placeholder="Promotion Code" type="number" />
				</Grid>
				<Grid item xs={2} sm={2} md={5.5}>
					<TextField fullWidth placeholder="Promotion Coupons" type="number" />
				</Grid>
				<Grid item xs={2} sm={2} md={5.5}>
					<Autocomplete
						disablePortal
						sx={StyledPatterInput}
						options={stores}
						renderInput={(params) => (
							<TextField
								{...params}
								variant="outlined"
								value={stores}
								placeholder="Stores"
							/>
						)}
					/>
				</Grid>
			</Grid>
		</Grid>
	);
};
