import { Grid, Divider, TextField } from '@mui/material';
import React from 'react';
import useDisableNumberInputScroll from '../../../../../../hooks/useDisabledScrollNumberInput';

interface Props {
	total: number | undefined;
	minimumAmount: number | undefined;
	setTotal: React.Dispatch<React.SetStateAction<number | undefined>>;
	setMinimumAmount: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export const AdjustmentModal: React.FC<Props> = ({
	total,
	minimumAmount,
	setTotal,
	setMinimumAmount,
}) => {
	useDisableNumberInputScroll();
	return (
		<Grid
			container
			direction={'column'}
			justifyContent={'center'}
			justifyItems={'center'}
			alignItems={'center'}
			sx={{ flexWrap: 'nowrap' }}
			pl={2}
			pr={2}
			height={'30vh'}
		>
			<Grid
				container
				justifyContent="center"
				gap={2}
				sx={{ height: '50px', alignItems: 'center' }}
			>
				<Grid item xs={5} sm={4} md={8}>
					<TextField
						fullWidth
						type="number"
						label="Minimum Amount"
						placeholder="Minimum Amount"
						value={minimumAmount}
						onChange={(e) => setMinimumAmount(e.target.value as unknown as number)}
						variant="outlined"
						sx={{
							borderRadius: '7px',
							'& input[type=number]::-webkit-inner-spin-button': {
								'-webkit-appearance': 'none',
							},
						}}
					/>
				</Grid>
				<Grid item xs={5} sm={4} md={8}>
					<TextField
						fullWidth
						type="number"
						label="Add Items to Store"
						value={total}
						onChange={(e) => setTotal(e.target.value as unknown as number)}
						placeholder="Add Items to Store"
						variant="outlined"
						sx={{
							borderRadius: '7px',
							'& input[type=number]::-webkit-inner-spin-button': {
								'-webkit-appearance': 'none',
							},
						}}
					/>
				</Grid>
			</Grid>
			<Divider />
		</Grid>
	);
};
