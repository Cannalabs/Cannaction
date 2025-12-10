import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import AuthContextModel from './models/AuthContextModel';
import LoginRequest from '../../dtos/requests/LoginRequest';
import AuthStorageService from '../../services/AuthStorageService';
import { clearLoggedUser } from '../../utils/auth';
import { UserTypeEnum } from '../../models/enums/userType.enum';
import { useSnackbar } from '../Snackbar';
import { useTranslation } from 'react-i18next';

const AuthContext = createContext<AuthContextModel>({} as AuthContextModel);

interface Props {
	children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
	const navigate = useNavigate();
	const location = useLocation();
	const { i18n } = useTranslation();
	const { openSnackbar } = useSnackbar();
	const [signed, setSigned] = useState<boolean>(false);
	const [userLoggedId, setUserLoggedId] = useState<string>('');
	const [userTypeLogged, setUserTypeLogged] = useState<UserTypeEnum>();
	const [userCountry, setUserCountry] = useState<number | undefined>();
	const [language, setLanguage] = useState<string>(() => {
		const savedLanguage = localStorage.getItem('i18nextLng');
		return savedLanguage || 'en';
	});

	useEffect(() => {
		i18n.changeLanguage(language);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [language]);

	const saveSigned = useCallback((val: boolean) => {
		setSigned(val);
	}, []);

	const login = useCallback(
		async (body: LoginRequest) => {
			const { accessToken, userType, userId, userCountry, userLanguage } =
				await AuthService.login(body);

			AuthStorageService.setTokenSessionStorage(accessToken);
			AuthStorageService.setUserIdSessionStorage(userId);
			AuthStorageService.setUserTypeSessionStorage(userType);
			AuthStorageService.setUserCountrySessionStorage(userCountry);
			AuthStorageService.setUserLanguageSessionStorage(userLanguage);

			saveSigned(true);
			setUserTypeLogged(userType);
			setUserLoggedId(userId);
			setUserCountry(+userCountry);
			setLanguage(userLanguage);
			localStorage.setItem('i18nextLng', userLanguage);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[navigate, saveSigned]
	);

	const logout = useCallback(async () => {
		try {
			navigate('/');
		} catch (e: unknown) {
			openSnackbar(e, 'error');
		} finally {
			saveSigned(false);
			clearLoggedUser();

			navigate('/', { replace: true });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [navigate, saveSigned]);

	useEffect(() => {
		const storedToken = AuthStorageService.getStoredToken();
		const userType = AuthStorageService.getUserType();
		const userId = AuthStorageService.getUserId();
		const userCountry = AuthStorageService.getUserCountry();
		const storedLanguage = localStorage.getItem('i18nextLng');

		if (storedToken && userType && userId) {
			saveSigned(true);
			setUserTypeLogged(userType as UserTypeEnum);
			setUserLoggedId(userId);
			setUserCountry(userCountry ? +userCountry : undefined);
		}

		if (storedLanguage) {
			setLanguage(storedLanguage);
		}
	}, [saveSigned]);

	useEffect(() => {
		localStorage.setItem('currentRoute', window.location.pathname);
	}, [location]);

	const value = useMemo<AuthContextModel>(
		() => ({
			signed,
			userTypeLogged,
			login,
			logout,
			userLoggedId,
			userCountry,
			setLanguage,
		}),
		[
			signed,
			login,
			logout,
			userLoggedId,
			userTypeLogged,
			userCountry,
			setLanguage,
		]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
	const context = useContext(AuthContext);
	return context;
}
