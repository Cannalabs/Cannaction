import { ReactNode, useMemo } from 'react';
import Typography from './typography';
import Palette from './pallete';
import CustomShadows from './shadows';
import {
	createTheme,
	StyledEngineProvider,
	ThemeProvider,
} from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { enUS } from '@mui/material/locale';

interface Props {
	children: ReactNode;
}

export const ThemeCustomization: React.FC<Props> = ({ children }) => {
	const theme = Palette();

	const themeTypography = Typography(`'Metropolis', sans-serif`);
	const themeCustomShadows = useMemo(() => CustomShadows(theme), [theme]);

	const themeOptions = useMemo(
		() => ({
			breakpoints: {
				values: {
					xs: 0,
					sm: 768,
					md: 1024,
					lg: 1266,
					xl: 1536,
				},
			},
			palette: theme.palette,
			customShadows: themeCustomShadows,
			typography: themeTypography,
		}),
		[theme, themeTypography, themeCustomShadows]
	);

	const themes = createTheme(themeOptions, enUS);

	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={themes}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</StyledEngineProvider>
	);
};
