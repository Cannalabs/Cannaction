import React, { useState } from 'react';
import DataTable from '../../../../../../components/tableDinamic';
import { getStatusChip } from '../../../../../../models/enums/status.enum';
import { columnsPromotions } from '../data';
import { formatDate } from '../../../../../../utils/string';
import { usePromotionsStoreUser } from '../../../../../../hooks/querys/promotion/usePromotionsForStoreUser';
import { useTranslation } from 'react-i18next';

interface Props {
	storeId: number;
}

export const Promotion: React.FC<Props> = ({ storeId }) => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [limit, setLimit] = useState(10);
	const [search, setSearch] = useState('');
	const [searchConfirmed, setSearchConfirmed] = useState('');
	const {t} = useTranslation();

	const { data, isLoading } = usePromotionsStoreUser({
		search: searchConfirmed,
		take: limit,
		page: currentPage,
		storeId,
	});

	return (
		<div
			className="container-xl "
			style={{ padding: 0, marginTop: '1rem', maxWidth: '1464px' }}
		>
			<DataTable
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				meta={data?.meta}
				onLimitChange={setLimit}
				onPageChange={setCurrentPage}
				itemCount={data?.meta.itemCount ?? 0}
				hasPagination
				hasSearch
				search={search}
				setSearch={setSearch}
				setSearchConfirmed={setSearchConfirmed}
				titleTable={t('marketing.storesSetting.promotionsTableTitle')}
				columns={columnsPromotions}
				rows={data?.data.map((promotion) => ({
					promotion: promotion.name,
					coupons: promotion.coupons,
					created: formatDate(promotion.createdAt),
					active: getStatusChip(promotion.active),
				}))}
				isLoading={isLoading}
				limit={limit}
			/>
		</div>
	);
};
