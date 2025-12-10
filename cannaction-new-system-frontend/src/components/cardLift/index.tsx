import React from 'react';
import Windows from '../../assets/img/illustrations/windows.svg';
import Processing from '../../assets/img/illustrations/processing.svg';
import BrosweStats from '../../assets/img/illustrations/browser-stats.svg';
import { FaUserFriends, FiBook, FiTarget } from '../../themes/icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const CardLift: React.FC = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	return (
		<div className="row">
			<div className="col-xl-4 mb-4">
				<a
					className="card lift h-100"
					style={{ cursor: 'pointer' }}
					onClick={() => navigate('/stores')}
				>
					<div className="card-body d-flex justify-content-center flex-column">
						<div className="d-flex align-items-center justify-content-between">
							<div className="me-3">
								<FiBook className="feather-xl text-green mb-3" />
								<h5>{t('marketing.dashboard.storesTitleBox')}</h5>
								<div className="text-muted small">
									{t('marketing.dashboard.storesDescriptionBox')}
								</div>
							</div>
							<img src={Processing} alt="..." style={{ width: '8rem' }} />
						</div>
					</div>
				</a>
			</div>
			<div className="col-xl-4 mb-4">
				<a
					className="card lift h-100"
					style={{ cursor: 'pointer' }}
					onClick={() => navigate('/targets')}
				>
					<div className="card-body d-flex justify-content-center flex-column">
						<div className="d-flex align-items-center justify-content-between">
							<div className="me-3">
								<FiTarget className="feather-xl text-green mb-3" />
								<h5>{t('marketing.dashboard.targetsTitleBox')}</h5>
								<div className="text-muted small">
									{t('marketing.dashboard.targetsDescriptionBox')}
								</div>
							</div>
							<img src={Windows} alt="..." style={{ width: '8rem' }} />
						</div>
					</div>
				</a>
			</div>
			<div className="col-xl-4 mb-4">
				<a
					className="card lift h-100"
					style={{ cursor: 'pointer' }}
					onClick={() => navigate('/users')}
				>
					<div className="card-body d-flex justify-content-center flex-column">
						<div className="d-flex align-items-center justify-content-between">
							<div className="me-3">
								<FaUserFriends className="feather-xl text-green mb-3" />
								{/* <i className="feather-xl text-green mb-3" data-feather="users"></i> */}
								<h5>{t('marketing.dashboard.usersTitleBox')}</h5>
								<div className="text-muted small">{t("marketing.dashboard.usersDescriptionBox")}</div>
							</div>
							<img
								src={BrosweStats}
								alt="..."
								style={{ width: '8rem' }}
								// style="width: 8rem"
							/>
						</div>
					</div>
				</a>
			</div>
		</div>
	);
};
