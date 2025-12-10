import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
	signed: boolean;
	redirectPath?: string;
}
export const PrivateRoute: React.FC<PrivateRouteProps> = ({
	signed,
	redirectPath = '/login',
}) => {
	if (!signed) {
		return <Navigate to={redirectPath} />;
	}
	return <Outlet />;
};
