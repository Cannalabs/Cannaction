import React, { useEffect, useState } from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import { useUser } from '../../../../../hooks/querys/user/useUser';
import { useTheme } from '@mui/system';
import { formatDate } from '../../../../../utils/string';
import { useTranslation } from 'react-i18next';

interface Props {
	id?: number;
}

interface Label {
	label: string;
	value: string | undefined;
}

export const CustomerInfoModal: React.FC<Props> = ({ id }) => {
	const { data, refetch } = useUser(id);
	const theme = useTheme();
	const darkGrey = theme.palette.grey[300];
	const [labelList, setLabelList] = useState<Label[]>([]);
	const {t} = useTranslation();

	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!data) return;
		const newLabel = [
			{ 
				label: t('store.customers.customerInfoModal.name'),
				value: data.name
					? `${data.name} ${data.lastName}`
					: `${t('marketing.clubCard.title')} ${data.code}`,
			},
			{
				label: t('store.customers.customerInfoModal.email'),
				value: data.email ? data.email : '---',
			},
			{
				label: t('store.customers.customerInfoModal.sex'),
				value: data.gender ? data.gender : '---',
			},
			{ label: t('store.customers.customerInfoModal.birthdate'), value: data.birthdate ? formatDate(data.birthdate) : '---' },
		];

		setLabelList(newLabel);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	return (
		<>
			{labelList.map((data) => (
				<Grid
					container
					direction={'column'}
					sx={{ flexWrap: 'nowrap' }}
					pl={2}
					pr={2}
				>
					<Grid
						container
						justifyContent="space-between"
						sx={{ height: '50px', alignItems: 'center' }}
					>
						<Typography variant="h4" fontWeight="bold" color={darkGrey}>
							{data.label}
						</Typography>
						<Typography variant="h6" fontWeight="700" color={'#69707a'}>
							{data.value}
						</Typography>
					</Grid>
					<Divider />
				</Grid>
			))}
		</>
	);
};
