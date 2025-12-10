import { useQuery } from '@tanstack/react-query';

import { queryClient } from '../../../utils/query';
import NotificationService from '../../../services/NotificationService';
import  NotificationEntity from '../../../models/entities/NotificationEntity';

const KEY = 'notification';

export const useNotification = (id: number | undefined) => {
	const { data, isLoading, refetch, isRefetching } = useQuery(
		[KEY, id],
		() => (id ? NotificationService.getById(id) : null),
		{
			refetchOnMount: true,
			refetchOnReconnect: false,
			refetchOnWindowFocus: false,
		}
	);

	return {
		data,
		isLoading,
		refetch,
		isRefetching,
	};
};

/**
 * @see {@link https://react-query-v3.tanstack.com/reference/QueryClient#queryclientsetqueriesdata}
 */
export const setNotification = (data: NotificationEntity) => {
	queryClient.setQueriesData([KEY, data?.id], data);
};

/**
 * @see {@link https://react-query-v3.tanstack.com/reference/QueryClient#queryclientremovequeries}
 */
export const removeNotification = (id: number) => {
	queryClient.removeQueries([KEY, id]);
};

const handleFunction = async (id: number) => {
	const notification = await NotificationService.getById(id);
	return notification;
};

export const prefetchNotification = (id: number) => {
	queryClient.prefetchQuery([KEY, id], () => handleFunction(id));
};
