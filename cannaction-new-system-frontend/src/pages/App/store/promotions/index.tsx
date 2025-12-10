import React, { useEffect, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import DataTable from '../../../../components/tableDinamic';
import imgDefault from '../../../../assets/favicon.ico';
import { BsEye } from '../../../../themes/icons';
import { useNavigate } from 'react-router-dom';
import { usePromotionsStoreUser } from '../../../../hooks/querys/promotion/usePromotionsForStoreUser';
import { formatDate } from '../../../../utils/string';
import { Thumb } from '../../../../components/tableDinamic/Thumb';
import { usePromotionsColumns } from './columnPromotions';
import { useTranslation } from 'react-i18next';

export const PromotionsStore: React.FC = () => {
	const navigate = useNavigate();
	const [search, setSearch] = useState('');
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [searchConfirmed, setSearchConfirmed] = useState('');
	const [limit, setLimit] = useState(10);
	const { columnsPromotions } = usePromotionsColumns();
	const { t } = useTranslation();

	const {
		data: promotions,
		isLoading,
		isRefetching,
		refetch,
	} = usePromotionsStoreUser({
		search: searchConfirmed,
		take: limit,
		page: currentPage,
	});

	useEffect(() => {
		refetch();
	}, [refetch]);

	const handleOpenView = (id: number) => {
		navigate(`/detail-promotion/${id}`);
	};

	return (
		<div className="container-xl px-4 mt-n10">
			<DataTable
				hasPagination
				hasInteraction
				onLimitChange={setLimit}
				meta={promotions?.meta}
				currentPage={currentPage}
				onPageChange={setCurrentPage}
				itemCount={promotions?.meta?.itemCount ?? 0}
				setCurrentPage={setCurrentPage}
				hasSearch
				titleTable={t('tables.userStore.promotions.tableTitle')}
				search={search}
				setSearch={setSearch}
				setSearchConfirmed={setSearchConfirmed}
				columns={columnsPromotions}
				rows={promotions?.data.map((promo) => ({
					thumb: (
						<Thumb name={promo.name} imageUrl={promo.thumb} defaultUrl={imgDefault} />
					),
					promotion: promo.name,
					coupons: promo.coupons,
					created: formatDate(promo.createdAt),
					actions: (
						<Tooltip title={t('marketing.promoReport.actionsColumnDetailsTooltip')}>
							<IconButton onClick={() => handleOpenView(promo.id)}>
								<BsEye size={16} />
							</IconButton>
						</Tooltip>
					),
				}))}
				isLoading={isLoading || isRefetching}
				limit={limit}
			/>
		</div>
	);
};
