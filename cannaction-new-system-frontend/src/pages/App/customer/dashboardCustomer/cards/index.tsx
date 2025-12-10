import React from 'react';
import {
	MdMailOutline,
	MdOutlineHelpOutline,
	MdOutlineSettings,
} from '../../../../../themes/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../../contexts/Auth';
import { useTranslation } from 'react-i18next';

export const Cards: React.FC = () => {
	const navigate = useNavigate();
	const { userLoggedId } = useAuth();
	const {t} = useTranslation();

	return (
		<div className="row">
			<div className="col-xl-4 mb-4">
				<a className="card lift h-100" onClick={() => navigate('/quiz')}>
					<div className="card-body d-flex justify-content-center flex-column">
						<div className="d-flex align-items-center justify-content-between">
							<div className="me-3">
								<h5>{t('customer.customerDashboard.quizCard.title')}</h5>
								<div className="text-muted small">{t('customer.customerDashboard.quizCard.description')}</div>
							</div>

							<MdOutlineHelpOutline className="feather-xl text-primary mb-3" />
						</div>
					</div>
				</a>
			</div>
			{/* <div className="col-xl-4 mb-4">
				<a className="card lift h-100" onClick={() => navigate('/invite-friend')}>
					<div className="card-body d-flex justify-content-center flex-column">
						<div className="d-flex align-items-center justify-content-between">
							<div className="me-3">
								<h5>Invite a Friend</h5>
								<div className="text-muted small">
									Invite your friends to earn points!
								</div>
							</div>
							<MdMailOutline className="feather-xl text-primary mb-3" />
						</div>
					</div>
				</a>
			</div> */}
			<div className="col-xl-4 mb-4">
				<a className="card lift h-100" onClick={() => navigate('/notification')}>
					<div className="card-body d-flex justify-content-center flex-column">
						<div className="d-flex align-items-center justify-content-between">
							<div className="me-3">
								<h5>{t('customer.customerDashboard.notificationsCard.title')}</h5>
								<div className="text-muted small">{t('customer.customerDashboard.notificationsCard.description')}</div>
							</div>
							<MdMailOutline className="feather-xl text-primary mb-3" />
						</div>
					</div>
				</a>
			</div>
			<div className="col-xl-4 mb-4">
				<a
					className="card lift h-100"
					onClick={() => navigate(`/account-profile/${userLoggedId}`)}
				>
					<div className="card-body d-flex justify-content-center flex-column">
						<div className="d-flex align-items-center justify-content-between">
							<div className="me-3">
								<h5>{t('customer.customerDashboard.updateProfileCard.title')}</h5>
								<div className="text-muted small">
									{t('customer.customerDashboard.updateProfileCard.description')}
								</div>
							</div>
							<MdOutlineSettings className="feather-xl text-primary mb-3" />
						</div>
					</div>
				</a>
			</div>
		</div>
	);
};
