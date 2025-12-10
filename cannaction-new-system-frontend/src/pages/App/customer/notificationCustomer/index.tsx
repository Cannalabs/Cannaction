import React, { useEffect } from 'react';
import { Banner } from './Banner';
import { Divider, Grid } from '@mui/material';
import { Notification } from './Notification';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../contexts/Auth';
import { useUserNotifications } from '../../../../hooks/querys/notification/useUserNotifications';
import { formatDate } from '../../../../utils/string';
import NotificationService from '../../../../services/NotificationService';
import { useTranslation } from 'react-i18next';

export const NotificationCustomer: React.FC = () => {
	const navigate = useNavigate();
	const { userLoggedId } = useAuth();
	const { data, refetch } = useUserNotifications();
	const {t} = useTranslation();

	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleDetailNotification = async (id: number) => {
		await NotificationService.setNotificationSeen(
			userLoggedId as unknown as number,
			id
		);

		navigate(`/view-detail-notification/${id}`);
	};

	return (
		<div className="container-xl px-4 " style={{ marginTop: '4.5rem' }}>
			<Banner />
			<h4 className="mb-3 mt-5">{t('customer.customerNotificationsPage.allNotifications')}</h4>
			<Grid mb={4}>
				<Divider orientation="horizontal" sx={{ background: 'grey' }} />
			</Grid>

			<div className="row">
				{data?.map((notification) => (
					<Notification
						name={notification.title}
						description={formatDate(notification.createdAt)}
						active={notification.userNotifications[0].seen}
						onClick={() => handleDetailNotification(notification.id)}
					/>
				))}
			</div>
		</div>
	);
};
