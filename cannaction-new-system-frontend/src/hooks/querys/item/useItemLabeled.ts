import { useQuery } from '@tanstack/react-query';
import ItemService from '../../../services/ItemService';

const STALE_TIME = 300000;
const KEY = 'labeled-items';

export type ItemType = {
	value: number;
	label: string;
};

export type ItemLabeledFilter = {
	exchange?: boolean;
}

export const useItemLabeled = (filter?: ItemLabeledFilter) => {
	const { data = [], refetch } = useQuery(
		[KEY],
		async () => {
			const result = await ItemService.getLabeled(filter);
			return result?.map(
				(c) =>
					({
						value: c.id,
						label: c.name,
					} as ItemType)
			);
		},
		{
			staleTime: STALE_TIME,
		}
	);
	return { items: data, refetch };
};
