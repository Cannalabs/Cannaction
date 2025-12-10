import { Box, Grid, Link, List, ListItem, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import LogoHome from '../../images/logotype-white.png';
import StandartCanna from '../../images/standart-canna.png';
import './Cannaction.styles.css';
import { getCurrentYear } from '../../utils/string';

const Cannaction: React.FC = () => {
	const { t, i18n } = useTranslation();
	const [selectedFlag, setSelectedFlag] = useState(i18n.language);

	const year = getCurrentYear();

	const handleLanguageChange = (lang: string) => {
		i18n.changeLanguage(lang);
		setSelectedFlag(lang);
	};

	return (
		<Grid
			item
			xs={12}
			md={6}
			display="flex"
			justifyContent="center"
			alignItems="center"
			flexDirection="column"
			bgcolor="#0D675E"
			padding="1rem"
			position="relative"
		>
			<Grid
				top="15px"
				paddingLeft="20px"
				paddingRight="20px"
				width="100%"
				display="flex"
				alignItems="center"
				justifyContent="space-between"
				position="absolute"
			>
				<Grid paddingLeft="12px">
					<Link to="/login" id="logo" component={RouterLink}>
						<img src={StandartCanna} alt="" width="49" height="35" />
					</Link>
				</Grid>
				<Grid>
					<List>
						<ListItem className="flag-container">
							<img
								src="/images/flags/us.png"
								alt="US Flag"
								className="flag"
								onClick={() => handleLanguageChange('en')}
								style={{
									cursor: 'pointer',
									opacity: selectedFlag === 'en' ? 1 : 0.5,
									transition: 'opacity 0.3s ease',
								}}
							/>
							<img
								src="/images/flags/it.png"
								alt="IT Flag"
								className="flag"
								onClick={() => handleLanguageChange('it')}
								style={{
									cursor: 'pointer',
									opacity: selectedFlag === 'it' ? 1 : 0.5,
									transition: 'opacity 0.3s ease',
								}}
							/>
							<img
								src="/images/flags/de.png"
								alt="DE Flag"
								className="flag"
								onClick={() => handleLanguageChange('de')}
								style={{
									cursor: 'pointer',
									opacity: selectedFlag === 'de' ? 1 : 0.5,
									transition: 'opacity 0.3s ease',
								}}
							/>
							<img
								src="/images/flags/pl.png"
								alt="PL Flag"
								className="flag"
								onClick={() => handleLanguageChange('pl')}
								style={{
									cursor: 'pointer',
									opacity: selectedFlag === 'pl' ? 1 : 0.5,
									transition: 'opacity 0.3s ease',
								}}
							/>
							<img
								src="/images/flags/si.png"
								alt="SI Flag"
								className="flag"
								onClick={() => handleLanguageChange('sl')}
								style={{
									cursor: 'pointer',
									opacity: selectedFlag === 'sl' ? 1 : 0.5,
									transition: 'opacity 0.3s ease',
								}}
							/>
							<img
								src="/images/flags/fi.png"
								alt="FI Flag"
								className="flag"
								onClick={() => handleLanguageChange('fi')}
								style={{
									cursor: 'pointer',
									opacity: selectedFlag === 'fi' ? 1 : 0.5,
									transition: 'opacity 0.3s ease',
								}}
							/>
						</ListItem>
					</List>
				</Grid>
			</Grid>

			<Box
				marginTop={{
					xs: '2rem',
					md: '0',
				}}
				width={{ xs: '100%', sm: '80%' }}
			>
				<img src={LogoHome} alt="Logo Canna" width="100%" />
			</Box>

			<Typography
				color="white"
				textAlign="center"
				fontSize="0.8rem"
				marginBottom={{ xs: '1rem', sm: '0' }}
				style={{ opacity: 0.8 }}
				paddingLeft="90px"
				paddingRight="90px"
			>
				{t('cannaction.samples')}
			</Typography>

			{/* <Box
				textAlign="center"
				fontSize="0.8rem"
				display="flex"
				flexDirection="column"
				alignItems="center"
				marginBottom={{ xs: '1rem', sm: '0' }}
			>
				<List sx={{ display: 'flex', justifyContent: 'center' }}>
					<ListItem>
						<Link href="#" sx={{ color: 'white', minWidth: '90px' }}>
							{t('cannaction.howItWorks')}
						</Link>
					</ListItem>
					<ListItem>
						<Link
							href="https://blog.cannaction.online/about"
							sx={{ color: 'white', minWidth: '40px' }}
						>
							{t('cannaction.about')}
						</Link>
					</ListItem>
				</List>
			</Box> */}

			<Box
				sx={{
					position: {
						md: 'absolute',
					},
					bottom: {
						md: '15px',
					},
				}}
			>
				<Typography
					fontSize="0.8rem"
					bottom="2rem"
					color="white"
					style={{ opacity: 0.8 }}
				>
					©{year} Canna
				</Typography>
			</Box>
		</Grid>
	);
};

export default Cannaction;
