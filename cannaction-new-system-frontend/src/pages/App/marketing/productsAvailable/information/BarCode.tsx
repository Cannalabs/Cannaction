import { Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FormValues } from '../form/formValues';
import FormikHook from '../../../../../models/interfaces/FormikHook';
import { UserTypeEnum } from '../../../../../models/enums/userType.enum';
import { useAuth } from '../../../../../contexts/Auth';
import { useTranslation } from 'react-i18next';

const baseBarcodes = [
	{
		barcode: '',
		country: { id: 20, name: 'International Code' },
	},
	{
		barcode: '',
		country: { id: 3, name: 'Germany' },
	},
	{
		barcode: '',
		country: { id: 5, name: 'Austria' },
	},
	{
		barcode: '',
		country: { id: 6, name: 'Poland' },
	},
	{
		barcode: '',
		country: { id: 7, name: 'Turkey' },
	},
	{
		barcode: '',
		country: { id: 8, name: 'Italy' },
	},
	{
		barcode: '',
		country: { id: 9, name: 'Slovenia' },
	},
	{
		barcode: '',
		country: { id: 10, name: 'Finland' },
	},
	{
		barcode: '',
		country: { id: 11, name: 'Bulgaria' },
	},
	{
		barcode: '',
		country: { id: 12, name: 'Malta' },
	},
	{
		barcode: '',
		country: { id: 13, name: 'Croatia' },
	},
	{
		barcode: '',
		country: { id: 15, name: 'Hungary' },
	},
	{
		barcode: '',
		country: { id: 17, name: 'Denmark' },
	},
	{
		barcode: '',
		country: { id: 18, name: 'Norway' },
	},
	{
		barcode: '',
		country: { id: 19, name: 'Ireland' },
	},
	
];

const filterBarcodesByUserType = (
	barcodes: Barcode[] | undefined,
	userTypeLogged: string | undefined,
	userCountry: number | undefined
) => {
	if (userTypeLogged === UserTypeEnum.SUPER) {
		return barcodes || [];
	}

	if (userTypeLogged === UserTypeEnum.MARKETING && userCountry !== undefined) {
		return (barcodes || []).filter(
			(barcode) => barcode.country.id === userCountry || barcode.country.id === 20
		);
	}

	return [];
};
interface Barcode {
	barcode?: string;
	country: {
		id: number;
		name: string;
	};
}

interface Props {
	formik: FormikHook<FormValues>;
	barcodes: {
		barcode: string;
		country: {
			id: number;
			name: string;
		};
	}[];
}

const BarcodeDisplay: React.FC<Props> = ({ formik, barcodes }) => {
	const { userCountry, userTypeLogged } = useAuth();
	const { setFieldValue } = formik;
	const [barcodeList, setBarcodeList] = useState<Barcode[]>([]);
	const {t} = useTranslation();

	useEffect(() => {
		if (barcodes.length == 0) {
			setBarcodeList(baseBarcodes);
		} else {
			let list = baseBarcodes;
			for (const barcode of barcodes) {
				list = list.filter((b) => b.country.id !== barcode.country.id);
				list.push(barcode);
			}
			setBarcodeList(list);
		}
	}, [barcodes]);

	const filteredBarcodes = filterBarcodesByUserType(
		barcodeList,
		userTypeLogged,
		userCountry
	);

	const handleBarcodeChange = (index: number, value: string) => {
		const updatedBarcodes = [...filteredBarcodes];
		updatedBarcodes[index] = { ...updatedBarcodes[index], barcode: value };
		setFieldValue('barcodes', updatedBarcodes);
	};

	return (
		<>
			{filteredBarcodes.map((barcodeObj, index) => (
				<Grid item xs={12} sm={6} md={4} key={index} container gap={2}>
					<TextField
						sx={{ marginBottom: 2 }}
						onChange={(e) => handleBarcodeChange(index, e.target.value)}
						value={barcodeObj.barcode || ''}
						fullWidth
						label={`${t('marketing.addProduct.barCodeInput')} - ` + barcodeObj.country.name}
						variant="outlined"
					/>
				</Grid>
			))}
		</>
	);
};

export default BarcodeDisplay;
