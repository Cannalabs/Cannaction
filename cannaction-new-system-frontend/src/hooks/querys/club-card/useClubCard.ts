import { useQuery } from '@tanstack/react-query';
import ClubCardService from '../../../services/ClubCardService';
import { PaginationFilterItemRequest } from '../../../dtos/requests/PaginationFilterItemRequest';

const STALE_TIME = 300000;

const KEY = 'use-club-card-list';

export const useClubCardList = (filter: PaginationFilterItemRequest) => {
	const { data, isLoading, refetch, isRefetching } = useQuery(
		[KEY, filter],
		() => ClubCardService.getClubCardList(filter),
		{
			staleTime: STALE_TIME,
			refetchOnMount: false,
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
