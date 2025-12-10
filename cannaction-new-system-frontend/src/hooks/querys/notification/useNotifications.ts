import { ResetQueryFilters, useQuery } from '@tanstack/react-query';
import NotificationService from '../../../services/NotificationService';
import { queryClient } from '../../../utils/query';
import { PaginationFilterNotificationRequest } from '../../../dtos/requests/PaginationFilterNotificationRequest';

const STALE_TIME = 300000; // 30 seconds

const KEY = 'notifications';

export const useNotifications = (filter: PaginationFilterNotificationRequest) => {
	const { data, isLoading, isRefetching, refetch } = useQuery(
		[KEY, filter],
		async () => {
			return NotificationService.getNotificationList(filter);
		},
		{
			staleTime: STALE_TIME,
		}
	);

	return {
		data,
		isLoading,
		isRefetching,
		refetch,
	};
};

export const resetNotifications = async (filters?: ResetQueryFilters) => {
	await queryClient.resetQueries([KEY], filters).catch(console.error);
};

export const removeNotifications = () => {
	queryClient.removeQueries([KEY]);
};
