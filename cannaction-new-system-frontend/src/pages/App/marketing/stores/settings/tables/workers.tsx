import React, { useEffect, useState } from 'react';
import DataTable from '../../../../../../components/tableDinamic';
import { columnsWorkers } from '../data';
import { useStoreWorkers } from '../../../../../../hooks/querys/store/userStoreWorkers';
import { IconButton, Tooltip } from '@mui/material';
import { BsEye } from 'react-icons/bs';
import { formatDate } from '../../../../../../utils/string';
import { MoreInformationModal } from '../../../../../../components/modals/moreInformation';
import { UserTargetModal } from './components/UserTargetModal';
import UserEntity from '../../../../../../models/entities/UserEntity';
import { useTranslation } from 'react-i18next';

interface Props {
	storeId: number;
}

export const Workers: React.FC<Props> = ({ storeId }) => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [limit, setLimit] = useState(10);
	const [search, setSearch] = useState(''); // eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [searchConfirmed, setSearchConfirmed] = useState('');
	const [open, setOpen] = useState<boolean>(false);
	const [user, setUser] = useState<UserEntity>();
	const { data, refetch, isLoading, isRefetching } = useStoreWorkers(storeId, {
		search: searchConfirmed,
	});
	const {t} = useTranslation();

	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleOpen = (u: UserEntity) => {
		setUser(u);
		setOpen(true);
	};
	const handleClose = () => {
		setUser(undefined);
		setOpen(false);
	};

	return (
		<div className="container-xl " style={{ padding: 0, maxWidth: '1464px' }}>
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
				titleTable={t('marketing.storesSetting.workers')}
				columns={columnsWorkers}
				rows={data?.data.map((user) => ({
					name: `${user?.name} ${user.lastName}`,
					email: user.email,
					points: user.points,
					createdAt: formatDate(user.createdAt),
					actions: (
						<Tooltip title={t('marketing.users.actionsMoreButtonDetails')}>
							<IconButton onClick={() => handleOpen(user)}>
								<BsEye size={16} />
							</IconButton>
						</Tooltip>
					),
				}))}
				isLoading={isLoading || isRefetching}
				limit={limit}
			/>
			<MoreInformationModal
				title={`${t('marketing.storesSetting.shopkeeperTargetUser')} ${user?.name} ${user?.lastName}`}
				open={open}
				handleClose={handleClose}
				hideSave
				hideClose
			>
				<UserTargetModal storeId={storeId} userId={user?.id} />
			</MoreInformationModal>
		</div>
	);
};
