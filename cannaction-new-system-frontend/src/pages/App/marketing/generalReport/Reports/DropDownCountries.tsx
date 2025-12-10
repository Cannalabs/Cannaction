import React, { useState } from 'react';
import { BsGlobe } from 'react-icons/bs';
import { IconButton, Menu, MenuItem } from '@mui/material'; // Certifique-se de que o Material UI está instalado
import { useCountries } from '../../../../../hooks/querys/country/useCountries';

interface Props {
	setCountryId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export const DropDownCountries: React.FC<Props> = ({ setCountryId }) => {
	const { data: listCountries } = useCountries();

	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className="dropdown no-caret">
			<IconButton
				className="btn btn-transparent-dark btn-icon "
				type="button"
				onClick={handleClick}
			>
				<BsGlobe style={{ color: '#1b7f75' }} />
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuItem
					onClick={() => {
						setCountryId(undefined);
						handleClose();
					}}
				>
					All Countries
				</MenuItem>
				{listCountries?.map((country, index) => (
					<MenuItem
						key={index}
						onClick={() => {
							setCountryId(country.id);
							handleClose();
						}}
					>
						{country.name}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
};
