import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { MdFilterAlt } from '../../../../../themes/icons';

export const DropDownActions: React.FC = () => {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleMenuItemClick = (action) => {
		handleClose();
	};

	return (
		<div>
			<IconButton
				className="btn btn-transparent-dark btn-icon"
				onClick={handleClick}
			>
				<MdFilterAlt style={{ color: '#1b7f75' }} size={22} />
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuItem onClick={() => handleMenuItemClick('Interaction')}>
					Interaction
				</MenuItem>
				<MenuItem onClick={() => handleMenuItemClick('Points')}>Points</MenuItem>
				<MenuItem onClick={() => handleMenuItemClick('Customers Actives')}>
					Customers Actives
				</MenuItem>
				<MenuItem onClick={() => handleMenuItemClick('Target Hit')}>
					Target Hit
				</MenuItem>
			</Menu>
		</div>
	);
};
