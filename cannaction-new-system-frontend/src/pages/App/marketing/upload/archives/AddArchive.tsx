import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useRef } from 'react';
import { useCountriesLabeled } from '../../../../../hooks/querys/country/useCountryLabeled';
import { inputPreventSubmit } from '../../../../../utils/form';
import { UserTypeEnum } from '../../../../../models/enums/userType.enum';

interface Props {
	userTypeLogged: UserTypeEnum | undefined;
	countryId: number | null | undefined;
	setCountryId: (countryId: number | null | undefined) => void;
	userType: UserTypeEnum | string | null;
	setUserType: (type: UserTypeEnum | string | null) => void;
	fileName: string | null;
	setFile: (file: File) => void;
	loading: boolean;
}

export const AddArchive: React.FC<Props> = ({
	userTypeLogged,
	countryId,
	setCountryId,
	userType,
	fileName,
	setFile,
	setUserType,
	loading,
}) => {
	const { countries } = useCountriesLabeled();
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			setFile(event.target.files[0]);
		}
	};

	const handleFileClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	return (
		<div
			className="col-xl-8"
			style={{ display: 'flex', width: '100%', padding: '2rem' }}
		>
			<div className="modal-body">
				<div className="row" style={{ width: '100%' }}>
					{userTypeLogged === UserTypeEnum.SUPER && (
						<div className="col-md-6 mb-3">
							<FormControl fullWidth>
								<InputLabel id="country">Choose Country</InputLabel>
								<Select
									id="country"
									label="Choose Country"
									disabled={loading}
									name="country"
									value={countryId}
									onChange={(e) => {
										const value = e.target.value as unknown as number;
										setCountryId(value);
									}}
									onKeyDown={inputPreventSubmit}
								>
									<MenuItem value={0}> All Countries </MenuItem>
									{countries.map((country) => (
										<MenuItem value={country.value}> {country.label}</MenuItem>
									))}
								</Select>
							</FormControl>
						</div>
					)}

					<div className="col-md-6 mb-3">
						<FormControl fullWidth>
							<InputLabel id="userType">Choose UserType</InputLabel>
							<Select
								id="userType"
								label="Choose User Type"
								disabled={loading}
								name="userType"
								value={userType}
								onChange={(e) => {
									const value = e.target.value as unknown as string;
									if (value === 'null') {
										setUserType(value as string);
									} else {
										setUserType(value as UserTypeEnum);
									}
								}}
								onKeyDown={inputPreventSubmit}
							>
								<MenuItem value={'null'}> All User Types </MenuItem>
								<MenuItem value={UserTypeEnum.CUSTOMER}> Customer </MenuItem>
								<MenuItem value={UserTypeEnum.STORE}> Store </MenuItem>
							</Select>
						</FormControl>
					</div>
					<div className="mb-3">
						<div className="row">
							<div className="col-md-12">
								<div className="form-group">
									<label className="btn btn-primary w-100" onClick={handleFileClick}>
										Select Archives
									</label>
									<input
										ref={fileInputRef}
										hidden
										accept="*"
										type="file"
										disabled={loading}
										name="file"
										className="form-control"
										required
										onChange={handleFileChange}
									/>
								</div>
								{fileName && <p>Selected file: {fileName}</p>}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
