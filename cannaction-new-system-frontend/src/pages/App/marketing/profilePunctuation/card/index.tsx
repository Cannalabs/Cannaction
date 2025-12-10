import React, { useState } from 'react';
import { Switch, TextField } from '@mui/material';
import CustomButton from '../../../../../components/customButton/CustomButton';
import { ProfilePontuationEntity } from '../../../../../models/entities/ProfilePontuationEntity';
import ProfilePontuationService from '../../../../../services/ProfilePontuationService';

import { useSnackbar } from '../../../../../contexts/Snackbar';
import useDisableNumberInputScroll from '../../../../../hooks/useDisabledScrollNumberInput';
import { useTranslation } from 'react-i18next';

interface Props {
	entity: ProfilePontuationEntity;
	refetch: () => void;
	isLoading: boolean;
	isRefetching: boolean;
	label: string;
}

export const Card: React.FC<Props> = ({
	entity,
	refetch,
	isLoading,
	isRefetching,
	label,
}) => {
	const [checked, setChecked] = useState<boolean>(entity.active);
	const [points, setPoints] = useState<number>(entity.points);
	const [change, setChange] = useState<boolean>(false);
	const { openSnackbar } = useSnackbar();
	useDisableNumberInputScroll();
	const {t} =useTranslation();

	const handleCheck = () => {
		setChange(true);
		setChecked(!checked);
	};

	const handleUpdateProfilePontuation = async () => {
		try {
			await ProfilePontuationService.update(entity.id, {
				active: checked,
				points,
			});
			refetch();
			setChange(false);
		} catch (e: unknown) {
			openSnackbar(e, 'error');
		}
	};

	return (
		<div className="col-xxl-4 col-xl-4 mb-4">
			<div className="card card-header-actions h-100">
				<div className="card-header">
					{entity.type}
					<div className="dropdown no-caret">
						<div className="form-check form-switch float-end">
							<Switch
								disabled={isLoading || isRefetching}
								checked={checked}
								onChange={handleCheck}
							/>
						</div>
					</div>
				</div>
				<div className="card-body">
					<div className="mb-3">
						<TextField
							disabled={isLoading || isRefetching}
							onChange={(e) => {
								setChange(true);
								setPoints(+e.target.value);
							}}
							type="number"
							label={label}
							value={points}
							fullWidth
							size="small"
							helperText={entity.description}
							sx={{
								'& input[type=number]::-webkit-inner-spin-button': {
									'-webkit-appearance': 'none',
								},
							}}
						/>
					</div>
					<div className="mb-3">
						<CustomButton
							disabled={isLoading || isRefetching || !change}
							onClick={handleUpdateProfilePontuation}
							type="button"
						>
							{t('marketing.profilePunctuation.saveButton')}
						</CustomButton>
					</div>
				</div>
			</div>
		</div>
	);
};
