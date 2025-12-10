import { Chip } from '@mui/material';

export const getBalanceChipColor = (balance: number) => {
	let background = '';
	if (balance < 10) {
		background = '#CE290C';
	} else if (balance <= 30) {
		background = '#ECD83A';
	} else {
		background = '#0D675E';
	}
	return background;
};

export const getBalanceChip = (balance: number) => {
	const background = getBalanceChipColor(balance);
	return (
		<Chip
			label={balance}
			sx={{ height: '25px', background: background, color: '#fff' }}
		/>
	);
};
