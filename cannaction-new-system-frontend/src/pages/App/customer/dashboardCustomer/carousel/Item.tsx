import React from 'react';
import { Products } from '.';
import { Grid } from '@mui/material';

interface Props {
	item: Products;
}

export const Item: React.FC<Props> = ({ item }) => {
	return (
		<div className="embla__slide__number">
			<img src={item.img} className="d-block w-100" />
			<div className="carousel-caption d-none d-md-block">
				<h4 className="h1 bg-white text-primary fw-900">{item.points}</h4>
				<p className="badge bg-white text-dark fw-600">{item.productName}</p>
			</div>
		</div>
	);
};
