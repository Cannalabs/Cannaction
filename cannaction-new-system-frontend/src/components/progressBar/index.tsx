import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import LinearProgress, {
	linearProgressClasses,
} from '@mui/material/LinearProgress';
import { Tooltip } from '@mui/material';

interface ProgressBarProps {
	progress: number;
	max: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, max }) => {
	const percentage = (progress / max) * 100;

	const getBarColor = (percentage: number): string => {
		if (percentage < 50) {
			return '#f44336';
		} else if (percentage < 80) {
			return '#F76400';
		} else {
			return '#1B7F75';
		}
	};

	const barColor = getBarColor(percentage);

	return (
		<Stack spacing={2} sx={{ flexGrow: 1 }}>
			<Tooltip title={`${percentage} %`}>
				<BorderLinearProgress
					variant="determinate"
					value={percentage > 100 ? 100 : percentage}
					barColor={barColor}
				/>
			</Tooltip>
		</Stack>
	);
};

const BorderLinearProgress = styled(LinearProgress)<{ barColor: string }>(
	({ theme, barColor }) => ({
		height: 10,
		borderRadius: 5,
		[`&.${linearProgressClasses.colorPrimary}`]: {
			backgroundColor:
				theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
		},
		[`& .${linearProgressClasses.bar}`]: {
			borderRadius: 5,
			backgroundColor: barColor,
		},
	})
);
