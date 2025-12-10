import { useQuery } from '@tanstack/react-query';
import StateService from '../../../services/StateService';

const STALE_TIME = 300000;
const KEY = 'labeled-states';

export type StateType = {
	value: number;
	label: string;
};

export const useStatesLabeled = (id?: number) => {
	const { data = [], refetch, isRefetching, isLoading } = useQuery(
		[KEY],
		async () => {
            if (!id) return [];
			const result = await StateService.getStatesByCountry(id);
			return result?.map(
				(c) =>
					({
						value: c.id,
						label: c.name,
					} as StateType)
			);
		},
		{
			staleTime: STALE_TIME,
		}
	);
	return { states: data, refetch, isRefetching, isLoading };
};
