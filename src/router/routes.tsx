import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute';

//Layouts
import { AuthLayout } from '@/layouts/AuthLayout';
import AppLayout from '@/layouts/AppLayout';
import { MyAccountLayout } from '@/layouts/MyAccountLayout';

// Public Pages
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import { ForgotPassword } from '@/pages/ForgotPassword';

// Protected Main Pages
import { Dashboard } from '@/pages/Dashboard';
import { MyRoutines } from '@/pages/MyRoutines';
import { ProgressTracking } from '@/pages/ProgressTracking';

// Protected Settings Pages
import { Settings } from '@/pages/Settings';
import { Profile } from '@/pages/Profile';

// Special Auth Flow
import { ResetPassword } from '@/pages/ResetPassword';
//TODO: create a 404 page

export const router = createBrowserRouter([
	// 1. Root redirect
	{
		path: '/',
		element: <Navigate to='/dashboard' replace />,
	},

	// 2. Public Auth Routes (No auth required)
	{
		element: <AuthLayout />,
		children: [
			{ path: 'login', element: <Login /> },
			{ path: 'register', element: <Register /> },
			{ path: 'forgot-password', element: <ForgotPassword /> },
		],
	},

	// 3. Protected Main App Routes (Requires Auth)
	{
		element: (
			<ProtectedRoute>
				<AppLayout />
			</ProtectedRoute>
		),
		children: [
			{ path: 'dashboard', element: <Dashboard /> },
			{ path: 'my-routines', element: <MyRoutines /> },
			{ path: 'progress-tracking', element: <ProgressTracking /> },
		],
	},
	// 4. Protected Settings Routes (Requires Auth)
	{
		element: (
			<ProtectedRoute>
				<MyAccountLayout />
			</ProtectedRoute>
		),
		children: [
			{ path: '/settings', element: <Settings /> },
			{ path: '/profile', element: <Profile /> },
			// Future: { path: 'profile/security', element: <SecuritySettings /> }
		],
	},
	// 5. Special Reset Password Flow (Requires temporary auth from email link)
	{
		path: 'reset-password',
		element: (
			<ProtectedRoute>
				<ResetPassword />
			</ProtectedRoute>
		),
	},
	// 6. Catch-all 404
	{
		path: '*',
		element: <Navigate to='/dashboard' replace />,
	},
]);
