import { Grid, IconButton, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DataTable from '../../../../../components/tableDinamic';
import { useParams } from 'react-router-dom';
import { columnsArchives } from './columnsArchives';
import { BsDownload, BsTrash3 } from '../../../../../themes/icons';
import { MoreInformationModal } from '../../../../../components/modals/moreInformation';
import { AddArchive } from './AddArchive';
import { useArchives } from '../../../../../hooks/querys/download/userArchives';
import { formatDate } from '../../../../../utils/string';
import DownloadService from '../../../../../services/DownloadService';

import { useSnackbar } from '../../../../../contexts/Snackbar';
import { useModal } from '../../../../../contexts/ModalMessage';
import { useAuth } from '../../../../../contexts/Auth';
import { getUserTypeText, UserTypeEnum } from '../../../../../models/enums/userType.enum';

export const ArchivesMarketing: React.FC = () => {
	const { id } = useParams();
	const { userTypeLogged, userCountry } = useAuth();
	const [countryId, setCountryId] = useState<number | null | undefined>(
		userTypeLogged === UserTypeEnum.SUPER ? null : userCountry
	);
	const [userType, setUserType] = useState<UserTypeEnum | string | null>(null);
	const [fileName, setFileName] = useState<string | null>(null);
	const [file, setFile] = useState<File>();
	const [loading, setLoading] = useState<boolean>(false);
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState('');
	const [searchConfirmed, setSearchConfirmed] = useState('');
	const [limit, setLimit] = useState(10);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const { openSnackbar } = useSnackbar();
	const { showConfirm } = useModal();
	const MAX_FILE_SIZE_16MB = 16 * 1024 * 1024;


	const { data, refetch, isRefetching, isLoading } = useArchives(
		id as unknown as number,
		{
			search: searchConfirmed,
			take: limit,
			page: currentPage,
		}
	);

	const handleDelete = async (id: number) => {
		setLoading(true);
		try {
			await DownloadService.deleteArchive(id);
			openSnackbar('Archive deleted successfully!', 'success');
			refetch();
		}catch (e: unknown) {
			openSnackbar(e, 'error');
		
		} finally {
			setLoading(false);
		}
	};

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		refetch()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (file) {
			setFileName(file.name);
		}
	}, [file]);

	const handleSubmitFile = async () => {
		if (!file || !fileName) return;
		if (file.size > MAX_FILE_SIZE_16MB) {
			openSnackbar('File size too large! Max file size: 16mb.', 'error');
			return;
		}
		const formData = new FormData();
		formData.append('file', file);
		
		try {
			await DownloadService.createArchive(formData, Number(id), userType ?? undefined, countryId ?? undefined);
			openSnackbar('Archive created successfully!', 'success');
			refetch();
			setCountryId(null);
			setUserType(null);
			setFile(undefined);
			setFileName('');
			handleClose();
		}catch (e: unknown) {
			openSnackbar(e, 'error');
		
		}
	};

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
				cadaster
				hasPagination
				hasInteraction
				hasSearch
				titleTable="Archives"
				search={search}
				setSearch={setSearch}
				setSearchConfirmed={setSearchConfirmed}
				handleOpen={handleOpen}
				columns={columnsArchives}
				rows={data?.data.map((arc) => ({
					archive: arc.name,
					created: formatDate(arc.createdAt),
					userType: arc.userType ? getUserTypeText(arc.userType) : 'All Users',
					country: arc.country ? arc.country.name : 'All Countries',
					actions: (
						<>
							<Tooltip title="Download">
								<IconButton
									onClick={() => window.open(arc.patch, '_blank', 'noopener,noreferrer')}
								>
									<BsDownload size="14px" />
								</IconButton>
							</Tooltip>
							<Tooltip title="Remove">
								<IconButton
									onClick={() =>
										showConfirm(
											'Are you sure you want to delete this folder? This action cannot be undone.',
											{
												title: 'Delete',
												onConfirm: () => handleDelete(arc.id),
											}
										)
									}
								>
									<BsTrash3 size="14px" />
								</IconButton>
							</Tooltip>
						</>
					),
				}))}
				isLoading={isLoading || isRefetching}
			/>
			<MoreInformationModal
				title="Add Archive"
				open={open}
				loading={loading}
				handleSave={handleSubmitFile}
				handleClose={handleClose}
			>
				<AddArchive
					loading={loading}
					userType={userType}
					setCountryId={setCountryId}
					userTypeLogged={userTypeLogged}
					countryId={countryId}
					fileName={fileName}
					setFile={setFile}
					setUserType={setUserType}
				/>
			</MoreInformationModal>
		</Grid>
	);
};
