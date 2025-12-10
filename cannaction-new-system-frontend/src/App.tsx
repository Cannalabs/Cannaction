import { BrowserRouter } from 'react-router-dom';
import { ThemeCustomization } from './themes';
import SimpleBarReact from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { AuthProvider } from './contexts/Auth';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './utils/query';
import { Routes } from './routes';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { ModalProvider } from './contexts/ModalMessage';
import { SnackbarProvider } from './contexts/Snackbar';
import './styles.css';

export const App: React.FC = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="en-us">
				<BrowserRouter>
					<SnackbarProvider>
						<AuthProvider>
							<ModalProvider>
								<ThemeCustomization>
									<SimpleBarReact style={{ maxHeight: '100vh', background: '#F2F6FC' }}>
										<Routes />
									</SimpleBarReact>
								</ThemeCustomization>
							</ModalProvider>
						</AuthProvider>
					</SnackbarProvider>
				</BrowserRouter>
				<ReactQueryDevtools />
			</LocalizationProvider>
		</QueryClientProvider>
	);
};
