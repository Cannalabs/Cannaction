import { ResetQueryFilters, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../../utils/query';
import { PaginationFilterExtractRequest } from '../../../dtos/requests/PaginationFilterExtractRequest';
import DownloadService from '../../../services/DownloadService';

const STALE_TIME = 300000; // 30 seconds

const KEY = 'folders';

export const useFolders = (filter: PaginationFilterExtractRequest) => {
	const { data, isLoading, isRefetching, refetch } = useQuery(
		[KEY, filter],
		async () => {
			return DownloadService.findFolders(filter);
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

export const resetFolders = async (filters?: ResetQueryFilters) => {
	await queryClient.resetQueries([KEY], filters).catch(console.error);
};

export const removeFolders = () => {
	queryClient.removeQueries([KEY]);
};
