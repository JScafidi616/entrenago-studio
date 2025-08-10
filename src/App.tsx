// src/App.jsx
import { AuthContext } from '@/context/AuthContext.tsx';
import useDarkMode from '@/lib/hooks/useDarkMode.ts';
import { cn } from '@/lib/utils/utils.ts';
import Dashboard from '@/pages/Dashboard.tsx';
import ForgotPassword from '@/pages/ForgotPassword.tsx';
import Login from '@/pages/Login.tsx';
import Register from '@/pages/Register.tsx';
import ResetPassword from '@/pages/ResetPassword.tsx';
import { AnimatePresence, easeInOut, motion } from 'motion/react';
import { useContext } from 'react';
import { Redirect, useLocation } from 'wouter';

function App() {
	const [isDark, toggleDark] = useDarkMode();
	const auth = useContext(AuthContext);
	if (!auth) {
		throw new Error('AuthContext is not provided');
	}

	const { user, loading } = auth;
	const [location] = useLocation();

	const pageVariants = {
		initial: { opacity: 0 },
		animate: {
			opacity: 1,
			transition: {
				duration: 0.5,
				ease: easeInOut,
			},
		},
		exit: { opacity: 0 },
	};

	const pageTransition = {
		duration: 0.5,
		ease: easeInOut,
	};

	//Todo Generar un loading mas estilizado y con animaciones
	if (loading) return <div>Cargando...</div>;

	// Manually map routes to components depending on location and auth
	const PageComponent = (() => {
		switch (location) {
			case '/login':
				return Login;
			case '/register':
				return Register;
			case '/forgot-password':
				return ForgotPassword;
			case '/reset-password':
				return ResetPassword;
			case '/dashboard':
				return user ? Dashboard : () => <Redirect to='/login' />;
			case '/':
				return user
					? () => <Redirect to='/dashboard' />
					: () => <Redirect to='/login' />;
			default:
				return () => (
					<div className={cn('p-4 text-center')}>
						404 - Página no encontrada
					</div>
				);
		}
	})();

	return (
		<>
			{' '}
			{/* Relative wrapper */}
			<AnimatePresence mode='wait'>
				<motion.div
					key={`page-${location}`}
					variants={pageVariants}
					transition={pageTransition}
					initial='initial'
					animate='animate'
					exit='exit'
					className={cn(
						'min-h-screen text-gray-900 dark:text-gray-100 dark:bg-gray-900 bg-white',
					)}
				>
					{/* Theme toggle button */}
					<button
						type='button'
						className={cn(
							'fixed top-4 right-4 px-3 py-2 rounded border dark:border-gray-700 border-gray-300 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white shadow transition-colors z-50',
						)}
						onClick={toggleDark}
						aria-label='Cambiar tema'
					>
						{isDark ? '☀️ Light' : '🌙 Dark'}
					</button>

					{/* Render the current page component */}
					<PageComponent />
				</motion.div>
			</AnimatePresence>
		</>
	);
}

export default App;
