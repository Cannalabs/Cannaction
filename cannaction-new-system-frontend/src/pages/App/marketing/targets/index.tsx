import React, { useEffect, useState } from 'react';
import { Autocomplete, Grid, TextField, Typography } from '@mui/material';
import { useAuth } from '../../../../contexts/Auth';
import { UserTypeEnum } from '../../../../models/enums/userType.enum';
import { StyledPatterInput } from '../../../../components/customSelect/styles';
import { useCountriesLabeled } from '../../../../hooks/querys/country/useCountryLabeled';
import { useStoreLabeledByCountry } from '../../../../hooks/querys/store/useStoreLabeledByCountry';
import { PromoTargetStore } from './itemBack';
import { MoneyBack } from './moneyBack';
import { PromoTargetUser } from './userTarget';
import { useStoreTargets } from '../../../../hooks/querys/storeTarget/useStoreTargets';
import StoreTargetService from '../../../../services/StoreTargetService';
import { useSnackbar } from '../../../../contexts/Snackbar';
import { PrizeType } from '../../../../models/enums/prizeType.enum';
import { useTranslation } from 'react-i18next';

const style = {
	typography: {
		cursor: 'pointer',
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'underline',
		},
	},
};

const Target: React.FC = () => {
	const { userTypeLogged, userCountry } = useAuth();
	const [selectedOption, setSelectedOption] =
		useState<string>('Moneyback Targets');
	const [searchConcluded, setSearchConcluded] = useState<string>('');
	const [searchNotConcluded, setSearchNotConcluded] = useState<string>('');
	const [countryFilter, setCountryFilter] = useState<number | undefined>(
		userTypeLogged === UserTypeEnum.SUPER ? undefined : userCountry
	);
	const [storeFilter, setStoreFilter] = useState<number | undefined>(undefined);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [limit, setLimit] = useState(10);
	const { openSnackbar } = useSnackbar();
	const { countries } = useCountriesLabeled();
	const { stores, refetch: refetchStores } =
		useStoreLabeledByCountry(countryFilter);
	const {
		data: storeTargets,
		refetch,
		isRefetching,
		isLoading,
	} = useStoreTargets({
		take: limit,
		page: currentPage,
		countryId: countryFilter,
		storeId: storeFilter,
		searchNotConcluded,
		searchConcluded,
		type:
			selectedOption === 'Moneyback Targets' ? PrizeType.POINTS : PrizeType.ITEM,
	});
	const {t} = useTranslation();

	useEffect(() => {
		refetchStores();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [countryFilter]);

	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedOption, searchConcluded, searchNotConcluded]);

	const handleTargetStatus = async (id: number, status: boolean) => {
		try {
			await StoreTargetService.handleStoreTargetStatus(id, status);
			openSnackbar(t('marketing.targets.targetStatus'), 'success');
			refetch();
		} catch (e: unknown) {
			openSnackbar(e, 'error');
		}
	};

	const handleDeleteTarget = async (id: number) => {
		try {
			await StoreTargetService.delete(id);
			openSnackbar(t('marketing.targets.targetDeleted'), 'success');
			refetch();
		} catch (e: unknown) {
			openSnackbar(e, 'error');
		}
	};

	const renderSelectedComponent = () => {
		switch (selectedOption) {
			case 'Moneyback Targets':
				return (
					<MoneyBack
						storeTargets={storeTargets ?? undefined}
						loading={isRefetching || isLoading}
						handleTargetStatus={handleTargetStatus}
						handleDeleteTarget={handleDeleteTarget}
						setSearchConcluded={setSearchConcluded}
						setSearchNotConcluded={setSearchNotConcluded}
						limit={limit}
						setLimit={setLimit}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						search={searchNotConcluded}
						setSearch={setSearchNotConcluded}
					/>
				);
			case 'StoreTargets':
				return (
					<PromoTargetStore
						storeTargets={storeTargets}
						loading={isRefetching || isLoading}
						handleTargetStatus={handleTargetStatus}
						handleDeleteTarget={handleDeleteTarget}
						setSearchConcluded={setSearchConcluded}
						setSearchNotConcluded={setSearchNotConcluded}
						limit={limit}
						setLimit={setLimit}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						search={searchConcluded}
						setSearch={setSearchConcluded}
					/>
				);
			case 'UserTargets':
				return <PromoTargetUser country={countryFilter} store={storeFilter} />;

			default:
				return null;
		}
	};

	return (
		<div className="container-xl px-4 mt-n10">
			<Grid
				p="1rem"
				boxShadow="0 0.15rem 1.75rem 0 rgba(33, 40, 50, 0.15)"
				borderRadius=".35rem"
				sx={{ backgroundColor: '#fff' }}
				xs={8.5}
				sm={12}
				columns={{ xs: 2, sm: 8, md: 12 }}
				style={{
					marginBottom: '1rem',
				}}
			>
				<Grid container mb={2} gap={2}>
					<Typography
						variant="h5"
						sx={style}
						color={'#0D675E'}
						onClick={() => setSelectedOption('Moneyback Targets')}
					>
						{t('marketing.targets.moneybackTargets')}
					</Typography>
					{' - '}
					<Typography
						variant="h5"
						sx={style}
						color={'#0D675E'}
						onClick={() => setSelectedOption('StoreTargets')}
					>
						{t('marketing.targets.itembackTargets')}
					</Typography>
					{' - '}
					<Typography
						variant="h5"
						sx={style}
						color={'#0D675E'}
						onClick={() => setSelectedOption('UserTargets')}
					>
						{t('marketing.targets.userbackTargets')}
					</Typography>
				</Grid>
				<Grid
					container
					mb={'1rem'}
					spacing={{ xs: 2, md: 3 }}
					columns={{ xs: 4, sm: 8, md: 12 }}
				>
					{userTypeLogged === UserTypeEnum.SUPER && (
						<Grid item xs={3.9} sm={4} md={4}>
							<Autocomplete
								disablePortal
								sx={StyledPatterInput}
								options={countries}
								fullWidth
								value={countries.find((c) => c.value === countryFilter) || null}
								onChange={(_, value) => setCountryFilter(value?.value)}
								renderInput={(params) => (
									<TextField
										{...params}
										placeholder={t('marketing.targets.CountryDropDown')}
										variant="outlined"
										value={countries}
									/>
								)}
							/>
						</Grid>
					)}
					<Grid item xs={3.9} sm={4} md={4}>
						<Autocomplete
							disablePortal
							sx={StyledPatterInput}
							options={stores}
							fullWidth
							value={stores.find((c) => c.value === storeFilter) || null}
							onChange={(_, value) => setStoreFilter(value?.value)}
							renderInput={(params) => (
								<TextField
									{...params}
									placeholder={t('marketing.targets.StoreDropDown')}
									variant="outlined"
									value={stores}
								/>
							)}
						/>
					</Grid>
				</Grid>
			</Grid>
			{renderSelectedComponent()}
		</div>
	);
};

export default Target;
