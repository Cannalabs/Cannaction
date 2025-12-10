import { ResetQueryFilters, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../../utils/query';
import { PaginationFilterExtractRequest } from '../../../dtos/requests/PaginationFilterExtractRequest';
import DownloadService from '../../../services/DownloadService';

const STALE_TIME = 300000; // 30 seconds

const KEY = 'archives';

export const useArchives = (
	id: number,
	filter: PaginationFilterExtractRequest
) => {
	const { data, isLoading, isRefetching, refetch } = useQuery(
		[KEY, filter],
		async () => {
			return DownloadService.findArchives(id, filter);
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

export const resetArchives = async (filters?: ResetQueryFilters) => {
	await queryClient.resetQueries([KEY], filters).catch(console.error);
};

export const removeArchives = () => {
	queryClient.removeQueries([KEY]);
};
