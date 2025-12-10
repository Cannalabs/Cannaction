import React, { useEffect, useState } from 'react';
import {
	Autocomplete,
	Grid,
	IconButton,
	TextField,
	Tooltip,
} from '@mui/material';
import { StyledPatterInput } from '../../../../components/customSelect/styles';
import DataTable from '../../../../components/tableDinamic';
import {
	BsGear,
	BsThreeDotsVertical,
	// BsTrash3,
} from '../../../../themes/icons';
import { getStatusChip } from '../../../../models/enums/status.enum';
import { MenuComponent } from '../../../../components/menuComponent';
import { useNavigate } from 'react-router';
import { useCountriesLabeled } from '../../../../hooks/querys/country/useCountryLabeled';
import { useAuth } from '../../../../contexts/Auth';
import { StoreEntity } from '../../../../models/entities/StoreEntity';
import { useStatesLabeled } from '../../../../hooks/querys/state/useLabeledStates';
import { useCitiesLabeled } from '../../../../hooks/querys/city/useLabeledCities';
import { useStores } from '../../../../hooks/querys/store/useStores';
import { formatDate } from '../../../../utils/string';
import StoreService from '../../../../services/StoreService';
import { useSnackbar } from '../../../../contexts/Snackbar';
import { UserTypeEnum } from '../../../../models/enums/userType.enum';
import { useTranslation } from 'react-i18next';
import { useStoreColumns } from './dataColumnsStore';

const Store: React.FC = () => {
	const navigate = useNavigate();
	const { userTypeLogged, userCountry } = useAuth();
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [limit, setLimit] = useState(10);
	const [search, setSearch] = useState('');
	const [searchConfirmed, setSearchConfirmed] = useState('');
	const [store, setStore] = useState<StoreEntity>();
	const [countryFilter, setCountryFilter] = useState<number | undefined>(
		userTypeLogged === UserTypeEnum.SUPER ? undefined : userCountry
	);
	const [stateFilter, setStateFilter] = useState<number | undefined>();
	const [cityFilter, setCityFilter] = useState<number | undefined>();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const { openSnackbar } = useSnackbar();
	const { countries, isLoading: isLoadingCountries } = useCountriesLabeled();
	const {
		states,
		refetch: refetchStates,
		isLoading: isLoadingStates,
		isRefetching: isRefetchingStates,
	} = useStatesLabeled(countryFilter);
	const {
		cities,
		refetch: refetchCities,
		isLoading: isLoadingCities,
		isRefetching: isRefetchingCities,
	} = useCitiesLabeled(stateFilter);
	const {
		data: stores,
		refetch,
		isLoading,
		isRefetching,
	} = useStores({
		search: searchConfirmed,
		countryId: countryFilter,
		stateId: stateFilter,
		cityId: cityFilter,
		page: currentPage,
		take: limit,
	});
	const { t } = useTranslation();
	const { columnsStore } = useStoreColumns();

	useEffect(() => {
		if (!countryFilter) {
			setStateFilter(undefined);
		} else {
			refetchStates();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [countryFilter]);

	useEffect(() => {
		if (!stateFilter) {
			setCityFilter(undefined);
		} else {
			refetchCities();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stateFilter]);

	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchConfirmed]);

	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleAddStore = () => {
		navigate('/add-store');
	};

	const handleOpenEdit = (id: number) => {
		navigate(`/edit-store/${id}`);
	};

	// const handleOpenView = (id: number) => {
	// 	navigate(`/detail-store/${id}`);
	// };

	const handleStoreStatus = async (id: number, active: boolean) => {
		setAnchorEl(null);
		try {
			await StoreService.changeStoreStatus(id, active);
			refetch();
			openSnackbar(t('marketing.Stores.storeStatus'), 'success');
		} catch (e: unknown) {
			openSnackbar(e, 'error');
		}
	};

	return (
		<div className="container-xl px-4 mt-n10">
			<Grid
				p="1rem"
				boxShadow="0 0.15rem 1.75rem 0 rgba(33, 40, 50, 0.15)"
				borderRadius=".35rem"
				sx={{ backgroundColor: '#fff' }}
				xs={4.8}
				sm={12}
				columns={{ xs: 2, sm: 8, md: 12 }}
			>
				<Grid
					container
					mb={'1rem'}
					spacing={{ xs: 2, md: 3 }}
					columns={{ xs: 4, sm: 8, md: 12 }}
				>
					<Grid item xs={3.9} sm={4} md={4}>
						<Autocomplete
							disablePortal
							sx={StyledPatterInput}
							options={countries}
							fullWidth
							disabled={isLoadingCountries || userTypeLogged !== UserTypeEnum.SUPER}
							value={countries.find((c) => c.value === countryFilter) || null}
							onChange={(_, value) => setCountryFilter(value?.value)}
							renderInput={(params) => (
								<TextField
									{...params}
									placeholder={t('marketing.Stores.CountryDropDown')}
									variant="outlined"
									value={countries}
								/>
							)}
						/>
					</Grid>

					<Grid item xs={3.9} sm={4} md={4}>
						<Autocomplete
							disablePortal
							sx={StyledPatterInput}
							options={states}
							fullWidth
							disabled={isLoadingStates || isRefetchingStates}
							value={states.find((c) => c.value === stateFilter) || null}
							onChange={(_, value) => setStateFilter(value?.value)}
							renderInput={(params) => (
								<TextField
									{...params}
									placeholder={t('marketing.Stores.RegionDropDown')}
									variant="outlined"
									value={states}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={3.9} sm={4} md={4}>
						<Autocomplete
							disablePortal
							sx={StyledPatterInput}
							options={cities}
							fullWidth
							disabled={isLoadingCities || isRefetchingCities}
							value={cities.find((c) => c.value === cityFilter) || null}
							onChange={(_, value) => setCityFilter(value?.value)}
							renderInput={(params) => (
								<TextField
									{...params}
									placeholder={t('marketing.Stores.CityDropDown')}
									variant="outlined"
									value={cities}
								/>
							)}
						/>
					</Grid>
				</Grid>
			</Grid>

			<Grid
				my="1rem"
				sx={{ background: '#fff' }}
				boxShadow="0 0.15rem 1.75rem 0 rgba(33, 40, 50, 0.15)"
				borderRadius=".35rem"
				xs={4.8}
				sm={12}
				columns={{ xs: 2, sm: 8, md: 12 }}
			>
				<DataTable
					limit={limit}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					meta={stores?.meta}
					onLimitChange={setLimit}
					onPageChange={setCurrentPage}
					itemCount={stores?.meta.itemCount ?? 0}
					hasSearch
					cadaster
					// download
					// upload
					handleOpen={() => handleAddStore()}
					titleTable={t('marketing.Stores.storesTableTitle')}
					search={search}
					setSearch={setSearch}
					setSearchConfirmed={setSearchConfirmed}
					columns={columnsStore}
					rows={stores?.data?.map((store) => ({
						name: store?.name,
						country: store?.country?.name,
						region: store?.state?.name,
						city: store?.city?.name,
						lastInteraction: formatDate(store.lastInteractionDate),
						active: getStatusChip(store.active),
						actions: (
							<>
								<Tooltip title={t('marketing.Quiz.actionsColumnMoreTooltip')}>
									<IconButton
										onClick={(e) => {
											setStore(store);
											handleClick(e);
										}}
									>
										<BsThreeDotsVertical size="14px" />
									</IconButton>
								</Tooltip>

								<Tooltip title={t('marketing.Stores.actionsColumnViewReportTooltip')}>
									<IconButton onClick={() => navigate(`/store-settings/${store.id}`)}>
										<BsGear size="14px" />
									</IconButton>
								</Tooltip>
								{/* <Tooltip title={'Remove'}>
									<IconButton>
										<BsTrash3 size="14px" />
									</IconButton>
								</Tooltip> */}
							</>
						),
					}))}
					hasInteraction
					isLoading={isLoading || isRefetching}
				/>
			</Grid>
			{store && (
				<MenuComponent
					handleClose={() => handleClose()}
					anchorEl={anchorEl}
					open={open}
					handleOpenEdit={() => handleOpenEdit(store?.id)}
					handleActive={() => handleStoreStatus(store.id, store.active)}
					handleInactive={() => handleStoreStatus(store.id, store.active)}
					active={store.active}
					entityId={store.id}
				/>
			)}
		</div>
	);
};

export default Store;
