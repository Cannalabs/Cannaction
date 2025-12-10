import React from 'react';
import { FaArrowTrendDown, FaArrowTrendUp } from '../../../../themes/icons';
import upImg from '../../../../assets/img/illustrations/value.svg';
import rateImg from '../../../../assets/img/illustrations/rate.svg';

interface CardProps {
	title: string;
	amount: string;
	percentage: string;
}

const getColorAndIcon = (amount: string) => {
	const value = parseFloat(amount.toString());
	if (value > 10) {
		return {
			borderClass: 'border-start-lg border-start-primary',
			badgeClass: 'bg-primary',
			icon: <FaArrowTrendUp />,
			imgUrl: upImg,
		};
	} else {
		return {
			borderClass: 'border-start-lg border-start-danger',
			badgeClass: 'bg-danger',
			icon: <FaArrowTrendDown />,
			imgUrl: rateImg,
		};
	}
};

export const Card: React.FC<CardProps> = ({ title, amount, percentage }) => {
	const { borderClass, badgeClass, icon, imgUrl } = getColorAndIcon(amount);

	return (
		<div className="col-xl-4 col-md-4 mb-4">
			<div className={`card ${borderClass} h-100`}>
				<div className="card-body">
					<div className="d-flex align-items-center">
						<div className="flex-grow-1">
							<div className="small fw-bold text-primary mb-1">{title}</div>
							<div className="h5">$ {amount}</div>
							<div
								className={`badge ${badgeClass} text-xs fw-bold text-white d-inline-flex align-items-center`}
								style={{ gap: '0.5rem' }}
							>
								{icon}
								{percentage}
							</div>
						</div>
						<img
							className="absolute"
							src={imgUrl}
							alt="Rate"
							style={{ bottom: '14px', right: '12px' }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
