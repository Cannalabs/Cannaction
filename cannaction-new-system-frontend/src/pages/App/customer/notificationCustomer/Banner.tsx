import React from 'react';
import illustration from '../../../../assets/img/illustrations/notifications.svg';
import { useTranslation } from 'react-i18next';

export const Banner: React.FC = () => {
	const {t} = useTranslation();
	return (
		<header className="card card-waves">
			<div className="card-body px-4 py-4">
				<div className="row align-items-center justify-content-between">
					<div className="col-7">
						<h1
							className="text-primary"
							style={{
								fontSize: 'calc(1.2rem + 1vw)',
							}}
						>
							{t('customer.customerNotificationsPage.title')}
						</h1>
						<p
							className="lead mb-4"
							style={{
								fontSize: 'calc(0.9rem + 0.3vw)',
								lineHeight: '1.4',
							}}
						>
							{t('customer.customerNotificationsPage.subtitle')}
						</p>
					</div>
					<div className="col-4 text-center">
						<img
							className="img-fluid"
							src={illustration}
							style={{ maxWidth: '100%', height: 'auto' }}
							alt="Notification Center Illustration"
						/>
					</div>
				</div>
			</div>
		</header>
	);
};
