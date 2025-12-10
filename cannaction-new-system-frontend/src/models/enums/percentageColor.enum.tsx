import { Chip } from '@mui/material';

export enum PercentageColorEnum {
	ADDITION = 'addition',
	DECREASE = 'decrease',
}

export const getPercentageText = (type: PercentageColorEnum) => {
	switch (type) {
		case PercentageColorEnum.ADDITION:
			return '';
		case PercentageColorEnum.DECREASE:
			return '';
	}
};

export const getStatusChipPercentage = (
	status: PercentageColorEnum,
	percent: number
) => {
	let background = '';
	const color = '#fff';

	switch (status) {
		case PercentageColorEnum.ADDITION:
			background = '#F4A100';
			break;
		case PercentageColorEnum.DECREASE:
			background = '#E81500';
			break;
	}

	const label = `${getPercentageText(status)} (${percent.toFixed(2)}%)`;

	return (
		<Chip
			label={label}
			sx={{
				height: '20px',
				background: background,
				color: color,
				borderRadius: '5px',
				fontSize: '12px',
			}}
		/>
	);
};
