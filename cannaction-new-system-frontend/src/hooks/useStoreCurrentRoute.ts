// Passo 1: Hook para armazenar a rota atual no LocalStorage
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function useStoreCurrentRoute() {
	const location = useLocation();

	useEffect(() => {
		localStorage.setItem('currentRoute', location.pathname);
	}, [location]);
}

export default useStoreCurrentRoute;
