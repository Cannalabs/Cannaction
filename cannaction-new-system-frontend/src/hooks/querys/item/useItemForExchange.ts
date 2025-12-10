import { useQuery } from '@tanstack/react-query';

import ItemService from '../../../services/ItemService';

const KEY = 'item-exchange';

export const useItemForExchange = () => {
	const { data = [], isLoading, refetch, isRefetching } = useQuery(
		[KEY],
		async () => {
			return ItemService.findForExchange();
		},
	);

	return {
		data,
		isLoading,
		refetch,
		isRefetching,
	};
};
