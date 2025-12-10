import { useQuery } from '@tanstack/react-query';
import UserService from '../../../services/UserService';
import { FilterUserLabeledDto } from '../../../dtos/requests/FilterUserLabeledRequest';

const STALE_TIME = 300000;
const KEY = 'labeled-users';

export type UserType = {
	value: number;
	label: string;
};

export const useUserLabeled = (filter: FilterUserLabeledDto) => {
	const { data = [], refetch, isLoading, isRefetching } = useQuery(
		[KEY],
		async () => {
			if (!filter.countryId) return [];
			const dataResult =
				await UserService.getLabeledUsers(filter);
			return dataResult?.map(
				(c) =>
					({
						value: c.id,
						label: `${c.name} ${c.lastName}`,
					} as UserType)
			);
		},
		{
			staleTime: STALE_TIME,
		}
	);
	return { users: data, refetch, isLoading, isRefetching };
};
