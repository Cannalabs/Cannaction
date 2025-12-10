import { Grid, IconButton, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DataTable from '../../../../../components/tableDinamic';
import { useParams } from 'react-router-dom';
import { columnsArchives } from './columnsArchives';
import { BsDownload } from '../../../../../themes/icons';
import { useArchives } from '../../../../../hooks/querys/download/userArchives';
import { formatDate } from '../../../../../utils/string';
import { getUserTypeText } from '../../../../../models/enums/userType.enum';
import { useTranslation } from 'react-i18next';

export const Archives: React.FC = () => {
	const { id } = useParams();
	const [search, setSearch] = useState('');
	const [searchConfirmed, setSearchConfirmed] = useState('');
	const [limit, setLimit] = useState(10);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const {t} = useTranslation();

	const { data, isLoading, refetch } = useArchives(id as unknown as number, {
		search: searchConfirmed,
		take: limit,
		page: currentPage,
	});

	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Grid container height={'259.61px'}>
			<DataTable
				limit={limit}
				meta={data?.meta}
				itemCount={data?.meta?.itemCount ?? 0}
				onPageChange={setCurrentPage}
				onLimitChange={setLimit}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				hasPagination
				hasInteraction
				hasSearch
				titleTable={t('store.customers.archives.title')}
				search={search}
				setSearch={setSearch}
				setSearchConfirmed={setSearchConfirmed}
				columns={columnsArchives}
				rows={data?.data.map((arc) => ({
					archive: arc.name,
					created: formatDate(arc.createdAt),
					userType: arc.userType ? getUserTypeText(arc.userType) : t('store.customers.archives.allUsers'),
					country: arc.country ? arc.country.name : t('store.customers.archives.allCountries'),
					actions: (
						<>
							<Tooltip title={t('store.customers.archives.download')}>
								<IconButton
									onClick={() => window.open(arc.patch, '_blank', 'noopener,noreferrer')}
								>
									<BsDownload size="14px" />
								</IconButton>
							</Tooltip>
						</>
					),
				}))}
				isLoading={isLoading}
			/>
		</Grid>
	);
};
