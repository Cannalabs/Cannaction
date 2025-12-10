import { ResetQueryFilters, useQuery } from '@tanstack/react-query';
import NewsletterService from '../../../services/NewsletterService';
import { queryClient } from '../../../utils/query';
import { PaginationFilterNewsletterRequest } from '../../../dtos/requests/PaginationFilterNewsletterRequest';

const STALE_TIME = 300000; // 30 seconds

const KEY = 'newsletters';

export const useNewsletters = (filter: PaginationFilterNewsletterRequest) => {
	const { data, isLoading, isRefetching, refetch } = useQuery(
		[KEY, filter],
		async () => {
			return NewsletterService.getNewsletterList(filter);
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

export const resetNewsletters = async (filters?: ResetQueryFilters) => {
	await queryClient.resetQueries([KEY], filters).catch(console.error);
};

export const removeNewsletters = () => {
	queryClient.removeQueries([KEY]);
};
