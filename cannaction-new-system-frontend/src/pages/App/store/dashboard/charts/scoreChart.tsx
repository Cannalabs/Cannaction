import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Card, Grid, IconButton } from '@mui/material';
import { FaExpand } from '../../../../../themes/icons';

interface Props {
	sales: number;
}

const ScoreChart: React.FC<Props> = ({ sales }) => {
	const formattedSales = parseFloat(sales.toFixed(2));
	const addZeroPrefix = (num: number) => {
		if (num == 100) return '1.0';
		let numStr = num.toString();
		if (!numStr.includes('.')) {
			numStr = numStr + '.0';
		}
		return '0.' + numStr.replace('.', '');
	};

	const numberWithPrefix = parseFloat(addZeroPrefix(sales));

	const chartRef = useRef(null);

	useEffect(() => {
		const eChartInstance = echarts.init(chartRef.current);

		const detectionData = (value: number) => {
			if (value >= 30 && value <= 60) return '#369e94';
			if (value > 60) return '#1B7F75';
			return '#5ac4ba';
		};

		const option4 = {
			tooltip: {
				formatter: '{a} <br/>{b} : {c}%',
			},
			series: [
				{
					name: 'Score',
					type: 'gauge',
					splitNumber: 5,
					axisLine: {
						lineStyle: {
							color: [
								[formattedSales / 100, detectionData(sales)],
								[1, '#f4f4f4'],
							],
							width: 15,
						},
					},
					axisTick: {
						lineStyle: {
							color: '#0c5951',
							width: 3,
						},
						length: -60,
						splitNumber: 1,
					},
					axisLabel: {
						distance: -80,
						textStyle: {
							color: '#878787',
						},
					},
					splitLine: {
						show: false,
					},
					itemStyle: {
						normal: {
							color: '#0c5951',
						},
					},
					detail: {
						formatter: '{value}%',
						offsetCenter: [0, '40%'],
						textStyle: {
							fontSize: 12,
							color: '#878787',
						},
					},
					title: {
						offsetCenter: [0, '100%'],
					},
					data: [
						{
							name: '',
							value: formattedSales,
						},
					],
				},
			],
		};

		eChartInstance.setOption(option4);

		const handleResize = () => {
			eChartInstance.resize();
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			eChartInstance.dispose();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Grid className="col-md-6 mb-4">
			<Card className="card card-header-actions">
				<div className="card-header">
					Score
					<div className="dropdown no-caret">
						<IconButton className="btn btn-transparent-dark btn-icon">
							<FaExpand size={14} />
						</IconButton>
					</div>
				</div>

				<Grid container>
					<div
						id="e_chart_4"
						ref={chartRef}
						style={{ width: '100%', height: '400px' }}
					/>
				</Grid>
			</Card>
		</Grid>
	);
};

export default ScoreChart;
