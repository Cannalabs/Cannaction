import { Avatar } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../../contexts/Auth';
import { BsBoxArrowRight, BsGear } from '../../themes/icons';
import { useTheme } from '@mui/system';
import { useUser } from '../../hooks/querys/user/useUser';
import { useNavigate } from 'react-router-dom';
import 'bootstrap';

export const Profile: React.FC = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const navigate = useNavigate();
	const { logout, userLoggedId } = useAuth();
	const theme = useTheme();
	const grey = theme.palette.grey[600];

	const userId = Number(userLoggedId);
	const { data: user } = useUser(Number(userLoggedId));

	const dropdownRef = useRef(null);

	const handleClickOutside = (event) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
			setIsDropdownOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);
	return (
		<li className="nav-item dropdown no-caret dropdown-user me-3 me-lg-4">
			<a
				className="btn btn-icon btn-transparent-dark dropdown-toggle"
				id="navbarDropdownUserImage"
				role="button"
				data-bs-toggle="dropdown"
				aria-haspopup="true"
				aria-expanded="false"
			>
				<Avatar
					alt="User Avatar"
					src={user?.profilePic || <AccountCircleIcon />}
					style={{ cursor: 'pointer' }}
				/>
			</a>
			<div
				className="dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up"
				aria-labelledby="navbarDropdownUserImage"
			>
				<h6 className="dropdown-header d-flex align-items-center">
					<Avatar
						alt="User Avatar"
						src={user?.profilePic || <AccountCircleIcon />}
						style={{ cursor: 'pointer' }}
					/>
					<div className="dropdown-user-details">
						<div className="dropdown-user-details-name">
							{user?.name} {user?.lastName}
						</div>
						<div className="dropdown-user-details-email">
							<small>{user?.email}</small>
						</div>
					</div>
				</h6>
				<div className="dropdown-divider"></div>
				<a
					className="dropdown-item"
					type="button"
					onClick={() => navigate(`/account-profile/${userId}`)}
				>
					<div className="dropdown-item-icon">
						<BsGear size={14} color={grey} />
					</div>
					Account Profile
				</a>
				<a type="button" onClick={logout} className="dropdown-item">
					<div className="dropdown-item-icon">
						<BsBoxArrowRight size={14} color={grey} />
					</div>
					Logout
				</a>
			</div>
		</li>
	);
};
