import { useQuery } from '@tanstack/react-query';
import CityService from '../../../services/CityService';

const STALE_TIME = 300000;
const KEY = 'labeled-cities';

export type CityType = {
	value: number;
	label: string;
};

export const useCitiesLabeled = (id?: number) => {
	const { data = [], refetch, isLoading, isRefetching } = useQuery(
		[KEY],
		async () => {
            if (!id) return [];
			const result = await CityService.getCitiesByState(id);
			return result?.map(
				(c) =>
					({
						value: c.id,
						label: c.name,
					} as CityType)
			);
		},
		{
			staleTime: STALE_TIME,
		}
	);
	return { cities: data, refetch, isLoading, isRefetching };
};
