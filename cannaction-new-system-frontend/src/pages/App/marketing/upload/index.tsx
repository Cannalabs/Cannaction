import React, { useState } from 'react';
import { IconButton, Stack, Tooltip } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useColumnsDownload } from './columnsDownload';
import DataTable from '../../../../components/tableDinamic';
import { BsFolderFill, BsTrash3 } from '../../../../themes/icons';
import { useModal } from '../../../../contexts/ModalMessage';
import DownloadService from '../../../../services/DownloadService';
import { useFolders } from '../../../../hooks/querys/download/useFolders';
import { useSnackbar } from '../../../../contexts/Snackbar';

import { formatDate } from '../../../../utils/string';
import { AddFolder } from './AddFolder';
import { useTranslation } from 'react-i18next';

const Upload: React.FC = () => {
	const navigate = useNavigate();
	const [search, setSearch] = useState('');
	const [searchConfirmed, setSearchConfirmed] = useState('');
	const [limit, setLimit] = useState(10);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [modalOpen, setModalOpen] = useState(false);
	const { columnsDownload } = useColumnsDownload();
	const { t } = useTranslation();

	const { openSnackbar } = useSnackbar();
	const { showConfirm } = useModal();

	const { data, refetch, isRefetching, isLoading } = useFolders({
		search: searchConfirmed,
		take: limit,
		page: currentPage,
	});

	const handleNavigate = (id: number) => {
		navigate(`/detail-archives/${id}`);
	};

	const handleDelete = async (id: number) => {
		try {
			await DownloadService.deleteFolder(id);
			openSnackbar('Folder deleted successfully!', 'success');
			refetch();
		} catch (e: unknown) {
			openSnackbar(e, 'error');
		}
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
				cadaster
				handleOpen={() => setModalOpen(true)}
				hasPagination
				hasInteraction
				hasSearch
				titleTable={t('tables.userMarketing.upload.tableTitle')}
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
					created: formatDate(folder.createdAt),
					actions: (
						<Tooltip title="Remove">
							<IconButton
								onClick={() =>
									showConfirm(
										'Are you sure you want to delete this folder? This action cannot be undone.',
										{
											title: 'Delete',
											onConfirm: () => handleDelete(folder.id),
										}
									)
								}
							>
								<BsTrash3 size="14px" />
							</IconButton>
						</Tooltip>
					),
				}))}
				isLoading={isLoading || isRefetching}
			/>
			<AddFolder
				title={'Add Folder'}
				modalOpen={modalOpen}
				handleClose={() => setModalOpen(false)}
				refetch={refetch}
			/>
		</div>
	);
};

export default Upload;
