import React, { useState } from 'react';
import { IconButton, Stack, Tooltip } from '@mui/material';
import DataTable from '../../../../components/tableDinamic';
import { BsFolderFill, BsFolderSymlink } from '../../../../themes/icons';
import { useNavigate } from 'react-router-dom';
import { useDownloadColumns } from './columnsDownload';
import { useFolders } from '../../../../hooks/querys/download/useFolders';
import { useTranslation } from 'react-i18next';

export const DownloadsStore: React.FC = () => {
	const navigate = useNavigate();
	const [search, setSearch] = useState('');
	const [searchConfirmed, setSearchConfirmed] = useState('');
	const [limit, setLimit] = useState(10);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const { t } = useTranslation();
	const { columnsDownload } = useDownloadColumns();

	const { data, isLoading } = useFolders({
		search: searchConfirmed,
		take: limit,
		page: currentPage,
	});

	const handleNavigate = (id: number) => {
		navigate(`/detail-archives/${id}`);
	};

	return (
		<div className="container-xl px-4 mt-n10">
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
				titleTable={t('tables.userStore.download.downloads.tableTitle')}
				search={search}
				setSearch={setSearch}
				setSearchConfirmed={setSearchConfirmed}
				columns={columnsDownload}
				rows={data?.data.map((folder) => ({
					folder: (
						<Stack
							direction={'row'}
							alignItems={'center'}
							gap={1}
							onClick={() => handleNavigate(folder.id)}
							sx={{ cursor: 'pointer' }}
						>
							<BsFolderFill size="14px" />
							{folder.name}
						</Stack>
					),
					actions: (
						<>
							<Tooltip title={t('store.customers.archives.title')}>
								<IconButton onClick={() => handleNavigate(folder.id)}>
									<BsFolderSymlink size="14px" />
								</IconButton>
							</Tooltip>
						</>
					),
				}))}
				isLoading={isLoading}
			/>
		</div>
	);
};
