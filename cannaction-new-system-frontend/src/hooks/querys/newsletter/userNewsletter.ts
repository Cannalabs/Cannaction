import { useQuery } from '@tanstack/react-query';

import { queryClient } from '../../../utils/query';
import NewsletterService from '../../../services/NewsletterService';
import  NewsletterEntity from '../../../models/entities/NewsletterEntity';

const KEY = 'newsletter';

export const useNewsletter = (id: number | undefined) => {
	const { data, isLoading, refetch, isRefetching } = useQuery(
		[KEY, id],
		() => (id ? NewsletterService.getById(id) : null),
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
export const setNewsletter = (data: NewsletterEntity) => {
	queryClient.setQueriesData([KEY, data?.id], data);
};

/**
 * @see {@link https://react-query-v3.tanstack.com/reference/QueryClient#queryclientremovequeries}
 */
export const removeNewsletter = (id: number) => {
	queryClient.removeQueries([KEY, id]);
};

const handleFunction = async (id: number) => {
	const newsletter = await NewsletterService.getById(id);
	return newsletter;
};

export const prefetchNewsletter = (id: number) => {
	queryClient.prefetchQuery([KEY, id], () => handleFunction(id));
};
