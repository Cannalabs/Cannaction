import React from 'react';
import { Card } from './Card';

const cardData = [
	{
		title: 'BALANCE',
		amount: '27.000',
		percentage: '3%',
	},
	{
		title: 'LAST MONTH',
		amount: '4,39',
		percentage: '3%',
	},
	{
		title: 'CURRENT MONTH',
		amount: '4,39',
		percentage: '3%',
	},
];

export const Cards: React.FC = () => {
	return (
		<>
			{cardData.map((card, index) => (
				<Card
					key={index}
					title={card.title}
					amount={card.amount}
					percentage={card.percentage}
				/>
			))}
		</>
	);
};
