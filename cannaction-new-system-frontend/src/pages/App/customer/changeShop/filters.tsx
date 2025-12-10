import React, { useEffect, useState } from 'react';
import { useCountriesLabeled } from '../../../../hooks/querys/country/useCountryLabeled';
import { useStoreLabeledByCountry } from '../../../../hooks/querys/store/useStoreLabeledByCountry';
import { Autocomplete, TextField } from '@mui/material';
import { StyledPatterInput } from '../../../../components/customSelect/styles';
import CustomButton from '../../../../components/customButton/CustomButton';
import ChangeShopService from '../../../../services/ChangeShopService';
import { useSnackbar } from '../../../../contexts/Snackbar';
import { useTranslation } from 'react-i18next';

interface Props {
	refetch: () => void;
}

export const Filters: React.FC<Props> = ({ refetch }) => {
	const { countries } = useCountriesLabeled();
	const [loading, setLoading] = useState<boolean>(false);
	const [reason, setReason] = useState<string | undefined>();
	const [storeFilter, setStoreFilter] = useState<number | undefined>();
	const [countryFilter, setCountryFilter] = useState<number | undefined>();
	const { stores, refetch: refetchStores } =
		useStoreLabeledByCountry(countryFilter);
	const { openSnackbar } = useSnackbar();
	const { t } = useTranslation();

	useEffect(() => {
		refetchStores();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [countryFilter]);

	const handleChangeShop = async () => {
		if (!reason || !storeFilter) return;
		setLoading(true);
		try {
			await ChangeShopService.createChangeShop(reason, storeFilter);
			setReason('');
			setStoreFilter(undefined);
			setCountryFilter(undefined);
			openSnackbar(
				t('customer.changeShopPage.form.changeShopRequested'),
				'success'
			);
			refetch();
		} catch (e: unknown) {
			openSnackbar(e, 'error');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="card mb-4">
			<div className="card-body">
				<div className="row">
					<div className="col-md-4 col-12 mb-3">
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
									placeholder={t('customer.changeShopPage.form.country')}
									variant="outlined"
									value={countries}
								/>
							)}
						/>
					</div>
					<div className="col-md-4 col-12 mb-3">
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
									placeholder={t('customer.changeShopPage.form.store')}
									variant="outlined"
									value={stores}
								/>
							)}
						/>
					</div>
					<div className="col-md-4 col-12 mb-3">
						<TextField
							fullWidth
							value={reason}
							onChange={(e) => setReason(e.target.value)}
							label={t('customer.changeShopPage.form.reason')}
							placeholder={t('customer.changeShopPage.form.reason')}
							variant="outlined"
						/>
					</div>
					<div className="col-md-6 col-12">
						<CustomButton disabled={loading} onClick={handleChangeShop} type="button">
							{t('customer.changeShopPage.form.submit')}
						</CustomButton>
					</div>
				</div>
			</div>
		</div>
	);
};
