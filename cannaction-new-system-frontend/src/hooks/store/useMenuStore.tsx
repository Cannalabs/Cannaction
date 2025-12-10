import { useNavigate } from 'react-router-dom';
import { create } from 'zustand';

type State = {
	isMenuExpanded: boolean;
	drawerWidth: number;
};

type Action = {
	handleDrawerOpen: () => void;
	handleDrawerClose: () => void;
};

const useMenuStore = create<State & Action>((set) => ({
	isMenuExpanded: false,
	drawerWidth: 240,
	handleDrawerClose: () => set({ isMenuExpanded: false }),
	handleDrawerOpen: () => set({ isMenuExpanded: true }),
}));

export const useMenu = () => {
	const navigate = useNavigate();
	const { isMenuExpanded, drawerWidth, handleDrawerClose, handleDrawerOpen } =
		useMenuStore();

	const handleNavigateHome = () => {
		navigate('/dashboard');
	};

	return {
		isMenuExpanded,
		drawerWidth,
		handleDrawerOpen,
		handleDrawerClose,
		handleNavigateHome,
	};
};
