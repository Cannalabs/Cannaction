import { Chip } from '@mui/material';
import i18n from '../../utils/i18n';

export enum ExtractOperatorEnum {
	ADDITION = 'addition',
	DEDUCTION = 'deduction',
}

export const getExtractOperatorText = (type: ExtractOperatorEnum) => {
	switch (type) {
		case ExtractOperatorEnum.ADDITION:
			return i18n.t('enums.extractOperator.addition');

		case ExtractOperatorEnum.DEDUCTION:
			return i18n.t('enums.extractOperator.deduction');
	}
};

export const getStatusChipExtractOperator = (status: ExtractOperatorEnum) => {
	let background = '';
	let color = '';

	switch (status) {
		case ExtractOperatorEnum.ADDITION:
			background = 'rgba( 218, 239, 237, 1 )';
			color = '#00ac69';
			break;
		case ExtractOperatorEnum.DEDUCTION:
			background = '#f1e0e3';
			color = '#CE290C';
			break;
		default:
			background = '';
			color = '';
			break;
	}

	const label = getExtractOperatorText(status);

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
