/* eslint-disable react-refresh/only-export-components */
import React, {
	ReactNode,
	createContext,
	useCallback,
	useContext,
	useState,
} from 'react';
import CustomSnackbar from '../../components/customSnackbar';
import { CannError } from '../../errors';

interface SnackbarState {
	message: string;
	severity: 'success' | 'error';
}

interface SnackbarContextType {
	openSnackbar: (
		message: string | unknown,
		severity: 'success' | 'error'
	) => void;
	closeSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
	undefined
);

interface SnackbarProviderProps {
	children: ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
	children,
}) => {
	const [snackbar, setSnackbar] = useState<SnackbarState | null>(null);

	const openSnackbar = useCallback(
		(message: string | unknown, severity: 'success' | 'error') => {
			if (typeof message === 'string') {
				setSnackbar({ message, severity });
			} else if (message instanceof CannError) {
				setSnackbar({ message: message.message, severity });
			}
		},
		[]
	);

	const closeSnackbar = useCallback(() => {
		setSnackbar(null);
	}, []);

	return (
		<SnackbarContext.Provider value={{ openSnackbar, closeSnackbar }}>
			{children}
			{snackbar && (
				<CustomSnackbar
					open={!!snackbar}
					handleClose={closeSnackbar}
					message={snackbar.message}
					severity={snackbar.severity}
				/>
			)}
		</SnackbarContext.Provider>
	);
};

export const useSnackbar = () => {
	const context = useContext(SnackbarContext);
	if (context === undefined) {
		throw new Error('useSnackbar must be used within a SnackbarProvider');
	}
	return context;
};
