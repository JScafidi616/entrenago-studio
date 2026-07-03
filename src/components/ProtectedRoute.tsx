import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '@components/loader/Loader';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const { user, isLoading } = useAuth();
	const location = useLocation();

	if (isLoading) {
		return (
			<div className="flex h-screen items-center justify-center">
				<Loader message="Loading..." />
			</div>
		);
	}

	if (!user) {
		// Redirect to login, preserving the intended destination
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return <>{children}</>;
};
