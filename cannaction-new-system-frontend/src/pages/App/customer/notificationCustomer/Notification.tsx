import React from 'react';
import { BsBell } from '../../../../themes/icons';
import { Grid, Typography } from '@mui/material';

interface Props {
	name: string;
	description: string;
	active?: boolean;
	onClick: () => void;
}

export const Notification: React.FC<Props> = ({
	name,
	description,
	active = false,
	onClick,
}) => {
	return (
		<Grid className="col-md-6 col-sm-12" sx={{ cursor: 'pointer' }}>
			<a className="card card-icon lift lift-sm mb-4" onClick={onClick}>
				<Grid className="row g-0">
					<Grid
						className={
							active
								? 'col-auto card-icon-aside bg-gray-600'
								: 'col-auto card-icon-aside bg-danger'
						}
					>
						<BsBell className="text-white-50" />
					</Grid>
					<Grid className="col">
						<Grid className="card-body py-5">
							<Typography
								className={
									active ? 'card-title text-muted mb-2' : 'card-title text-danger mb-2'
								}
							>
								{name}
							</Typography>

							<Grid className="small text-muted">{description}</Grid>
						</Grid>
					</Grid>
				</Grid>
			</a>
		</Grid>
	);
};
