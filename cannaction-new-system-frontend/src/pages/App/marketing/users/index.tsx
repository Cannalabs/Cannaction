import React, { useEffect, useState } from 'react';
import { Autocomplete, Grid, TextField } from '@mui/material';
import { TableUsers } from './tables/tableUsers';
import { StyledPatterInput } from '../../../../components/customSelect/styles';
import { useCountriesLabeled } from '../../../../hooks/querys/country/useCountryLabeled';
import { useStatesLabeled } from '../../../../hooks/querys/state/useLabeledStates';
import { useCitiesLabeled } from '../../../../hooks/querys/city/useLabeledCities';
import { useUsers } from '../../../../hooks/querys/user/useUsers';
import PaginationFilterUserRequest from '../../../../dtos/requests/PaginationFilterUserRequest';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../../contexts/Auth';
import { UserTypeEnum } from '../../../../models/enums/userType.enum';

const Users: React.FC = () => {
	const { userTypeLogged, userCountry } = useAuth();
	const [search, setSearch] = useState('');
	const [searchConfirmed, setSearchConfirmed] = useState('');
	const [countryId, setCountryId] = useState<number | undefined>(
		userTypeLogged === UserTypeEnum.SUPER ? undefined : userCountry
	);
	const [stateId, setStateId] = useState<number | undefined>();
	const [cityId, setCityId] = useState<number | undefined>();
	const { countries } = useCountriesLabeled();
	const { states, refetch: refetchStates } = useStatesLabeled(countryId);
	const { cities, refetch: refetchCities } = useCitiesLabeled(stateId);
	const [currentPage, setCurrentPage] = useState<number>(1);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [limit, setLimit] = useState(10);
	const { t } = useTranslation();

	const filter: PaginationFilterUserRequest = {
		search: searchConfirmed,
		page: currentPage,
		take: limit,
		countryId,
		stateId,
		cityId,
	};

	const { data: userList, refetch, isLoading, isRefetching } = useUsers(filter);

	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!countryId) setStateId(undefined);
		refetchStates();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [countryId]);

	useEffect(() => {
		if (!stateId) setCityId(undefined);
		refetchCities();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stateId]);

	return (
		<div className="container-xl px-4 mt-n10">
			<Grid
				p="1rem"
				boxShadow="0 0.15rem 1.75rem 0 rgba(33, 40, 50, 0.15)"
				borderRadius=".35rem"
				sx={{ backgroundColor: '#fff' }}
				xs={4.8}
				sm={12}
				mb={2}
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
							disabled={
								isRefetching || isLoading || !countries || countries.length == 0 ||  userTypeLogged !== UserTypeEnum.SUPER
							}
							value={countries?.find((c) => c.value === countryId) || null}
							onChange={(_, value) => setCountryId(value?.value)}
							renderInput={(params) => (
								<TextField
									{...params}
									placeholder={t('marketing.users.CountryDropDown')}
									variant="outlined"
									value={countries}
								/>
							)}
						/>
					</Grid>

					{/* <Grid item xs={3.9} sm={4} md={4}>
						<Autocomplete
							disablePortal
							sx={StyledPatterInput}
							options={states}
							fullWidth
							disabled={isRefetching || isLoading || !states || states.length == 0}
							value={states.find((c) => c.value == stateId) || null}
							onChange={(_, value) => setStateId(value?.value)}
							renderInput={(params) => (
								<TextField
									{...params}
									placeholder={t('marketing.users.RegionDropDown')}
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
							disabled={isRefetching || isLoading || !cities || cities.length == 0}
							value={cities.find((c) => c.value === cityId) || null}
							onChange={(_, value) => setCityId(value?.value)}
							renderInput={(params) => (
								<TextField
									{...params}
									placeholder={t('marketing.users.CityDropDown')}
									variant="outlined"
									value={cities}
								/>
							)}
						/>
					</Grid> */}
				</Grid>
			</Grid>

			<TableUsers
				loading={isLoading || isRefetching}
				search={search}
				setSearchConfirmed={setSearchConfirmed}
				setSearch={setSearch}
				users={userList ?? undefined}
				refetch={refetch}
				limit={limit}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				setLimit={setLimit}
			/>
		</div>
	);
};

export default Users;
