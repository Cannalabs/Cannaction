import { Navigate, Outlet } from 'react-router-dom';

interface SignedRouteProps {
	signed: boolean;
	redirectPath?: string;
}
export const SignedRoute: React.FC<SignedRouteProps> = ({
	signed,
	redirectPath = '/dashboard',
}) => {
	if (signed) return <Navigate to={redirectPath} />;
	return <Outlet />;
};
