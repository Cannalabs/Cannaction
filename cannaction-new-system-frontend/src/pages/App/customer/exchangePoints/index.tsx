import React, { useEffect } from 'react';
import { Card } from './Card';
import { useNavigate } from 'react-router-dom';
import { useItemForExchange } from '../../../../hooks/querys/item/useItemForExchange.ts';

export const ExchangePointsCustomer: React.FC = () => {
	const navigate = useNavigate();
	const { data, refetch } = useItemForExchange();

	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleNavigate = (id: number) => {
		navigate(`/detail-exchange-points/${id}`);
	};

	return (
		<div className="container-xl px-4 mt-n10">
			<div className="row">
				{data?.map((item) => (
					<Card key={item.id} item={item} handleNavigate={handleNavigate} />
				))}
			</div>
		</div>
	);
};
