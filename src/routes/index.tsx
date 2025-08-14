import Dashboard from '@/pages/Dashboard';
import ForgotPassword from '@/pages/ForgotPassword';
import Login from '@/pages/Login';
import MyRoutines from '@/pages/MyRoutines';
import ProgressTracking from '@/pages/ProgressTracking';
import Register from '@/pages/Register';
import ResetPassword from '@/pages/ResetPassword';

// Grouped route definitions
export const publicRoutes = {
	'/login': <Login />,
	'/register': <Register />,
	'/forgot-password': <ForgotPassword />,
	'/reset-password': <ResetPassword />,
};

export const privateRoutes = {
	'/dashboard': <Dashboard />,
	'/my-routines': <MyRoutines />,
	'/progress-tracking': <ProgressTracking />,
};
