import { useQuery } from '@tanstack/react-query';
import PromotionService from '../../../services/PromotionService';
import { PromotionType } from '../../../models/enums/promotion.enum';

const STALE_TIME = 300000; // 30 seconds

const KEY = 'promotions-labeled';

export type PromotionLabeledType = {
	value: number;
	label: string;
	type: PromotionType;
};

export const usePromotionsLabeled = (id?: number) => {
	const { data, isLoading, isRefetching, refetch } = useQuery(
		[KEY],
		async () => {
            if (!id) return [];
			const result = await PromotionService.getLabeled(id);

			return result?.data?.map(
				(c) =>
					({
						value: c.id,
						label: c.name,
						type: c.type,
					} as PromotionLabeledType)
			);
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
