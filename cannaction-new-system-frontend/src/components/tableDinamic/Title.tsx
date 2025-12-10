import {
	Grid,
	Typography,
	IconButton,
	Tooltip,
	useTheme,
	useMediaQuery,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BsUpload, BsUpc, BsDownload, BsPlusCircle } from 'react-icons/bs';

interface Props {
	hasInteraction?: boolean;
	titleTable?: string;
	cadaster?: boolean;
	button?: boolean;
	download?: boolean;
	upload?: boolean;
	codeScan?: boolean;
	search?: string | undefined;
	handleOpen?: () => void;
}

export const Title: React.FC<Props> = ({
	titleTable,
	hasInteraction,
	cadaster = false,
	button = false,
	download = false,
	upload = false,
	codeScan = false,
	handleOpen,
}) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const {t} = useTranslation();

	return (
		<Grid
			container
			sx={{
				background: '#F8F8F9',
				minHeight: '60px',
				flexDirection: { xs: 'column', sm: 'row' },
				py: { xs: 2, sm: 2 },
				px: 2,
				gap: { xs: 2, sm: 0 },
			}}
			justifyContent={'space-between'}
			alignItems={isMobile ? 'stretch' : 'center'}
		>
			<Typography
				variant="h4"
				fontSize={'1.075rem'}
				fontWeight={600}
				color={'primary'}
				sx={{ textAlign: { xs: 'center', sm: 'left' } }}
			>
				{titleTable}
			</Typography>

			<Grid
				container
				sx={{
					width: { xs: '100%', sm: '38%' },
					justifyContent: { xs: 'center', sm: 'flex-end' },
				}}
				gap={2}
			>
				{hasInteraction && (
					<>
						{upload && (
							<>
								{isMobile ? (
									<button
										className="btn btn-sm btn-primary d-flex align-items-center gap-2 w-100 justify-content-center"
										onClick={() => handleOpen && handleOpen()}
									>
										<BsUpload size={14} />
										Upload
									</button>
								) : (
									<Tooltip title={'Upload'}>
										<IconButton size="small" color="primary">
											<BsUpload size={14} />
										</IconButton>
									</Tooltip>
								)}
							</>
						)}
						{codeScan && (
							<>
								{isMobile ? (
									<button
										className="btn btn-sm btn-primary d-flex align-items-center gap-2 w-100 justify-content-center"
										onClick={() => handleOpen && handleOpen()}
									>
										<BsUpc size={20} />
										Code Scan
									</button>
								) : (
									<Tooltip title={'Code Scan'}>
										<IconButton size="small" color="primary">
											<BsUpc size={20} />
										</IconButton>
									</Tooltip>
								)}
							</>
						)}
						{download && (
							<>
								{isMobile ? (
									<button
										className="btn btn-sm btn-primary d-flex align-items-center gap-2 w-100 justify-content-center"
										onClick={() => handleOpen && handleOpen()}
									>
										<BsDownload size={15} />
										{t('marketing.users.usersTableDownloadButtonTooltip')}
									</button>
								) : (
									<Tooltip title={'Download'}>
										<IconButton size="small" color="primary">
											<BsDownload size={15} />
										</IconButton>
									</Tooltip>
								)}
							</>
						)}
						{cadaster && (
							<>
								{isMobile ? (
									<button
										className="btn btn-sm btn-primary d-flex align-items-center gap-2 w-100 justify-content-center"
										onClick={() => handleOpen && handleOpen()}
									>
										<BsPlusCircle size={14} />
										{t('marketing.promotions.promotionsTableAddButtonTooltip')}
									</button>
								) : (
									<Tooltip title={'Add'}>
										<IconButton
											size="small"
											color="primary"
											onClick={() => handleOpen && handleOpen()}
										>
											<BsPlusCircle size={14} />
										</IconButton>
									</Tooltip>
								)}
							</>
						)}
						{button && (
							<button
								className="btn btn-sm btn-primary d-flex align-items-center gap-2 w-100 justify-content-center"
								onClick={() => handleOpen && handleOpen()}
							>
								{t('store.pointsStatement.addProductButton')}
							</button>
						)}
					</>
				)}
			</Grid>
		</Grid>
	);
};
