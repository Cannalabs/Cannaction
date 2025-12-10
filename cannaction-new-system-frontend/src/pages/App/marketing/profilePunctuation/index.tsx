import { Grid } from '@mui/material';
import React from 'react';
import { Card } from './card';
import { useProfilePontuations } from '../../../../hooks/querys/profilePontuation/useProfilePontuations';

export const ProfileScoring: React.FC = () => {
	const {
		data: cardData,
		isLoading,
		isRefetching,
		refetch,
	} = useProfilePontuations();

	return (
		<div className="container-xl px-4 mt-n10">
			<div className="row">
				{cardData.map((card) => (
					<Card
						entity={card}
						key={card.id}
						label={card.type}
						refetch={refetch}
						isLoading={isLoading}
						isRefetching={isRefetching}
					/>
				))}
			</div>
		</div>
	);
};
