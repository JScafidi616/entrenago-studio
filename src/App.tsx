// src/App.jsx
import { AuthContext } from '@/context/AuthContext.tsx';
import { cn } from '@/lib/utils/utils.ts';
import { AnimatePresence, easeInOut, motion } from 'motion/react';
import { useContext } from 'react';
import { useLocation } from 'wouter';

import PrivateLayout from '@/layouts/PrivateLayout';
import PublicLayout from '@/layouts/PublicLayout';
import { privateRoutes, publicRoutes } from '@/routes';

function App() {
	// const [isDark, toggleDark] = useDarkMode();
	const auth = useContext(AuthContext);
	if (!auth) {
		throw new Error('AuthContext is not provided');
	}

	const { user, loading } = auth;
	const [location] = useLocation();
	const isResetPasswordRoute = location.startsWith('/reset-password');

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

	const isPrivateRoute =
		user &&
		privateRoutes[location as keyof typeof privateRoutes] &&
		!isResetPasswordRoute;
	const isPublicRoute =
		(!user && publicRoutes[location as keyof typeof publicRoutes]) ||
		isResetPasswordRoute;

	// Manually map routes to components depending on location and auth
	let content: React.ReactNode;
	if (isPrivateRoute) {
		content = privateRoutes[location as keyof typeof privateRoutes];
	} else if (isPublicRoute) {
		content = publicRoutes[location as keyof typeof publicRoutes];
	} else if (location === '/') {
		content = user ? privateRoutes['/dashboard'] : publicRoutes['/login'];
	} else {
		content = <div className='p-4 text-center'>404 - Página no encontrada</div>;
	}

	const Layout = isPrivateRoute ? PrivateLayout : PublicLayout;

	return (
		<>
			{/* Theme toggle button */}
			{/* <button
				type='button'
				className={cn(
					'fixed top-4 right-4 px-3 py-2 rounded border dark:border-gray-700 border-gray-300 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white shadow transition-colors z-50',
				)}
				onClick={toggleDark}
				aria-label='Cambiar tema'
			>
				{isDark ? (
					<Sun className='h-[1.2rem] w-[1.2rem] scale-100 transition-all bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white z-51' />
				) : (
					<Moon className='h-[1.2rem] w-[1.2rem] scale-100 transition-all bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white z-51' />
				)}
			</button> */}

			{/* Relative wrapper */}
			<AnimatePresence mode='wait'>
				<motion.div
					key={isPrivateRoute ? 'private' : 'public'}
					variants={pageVariants}
					transition={pageTransition}
					initial='initial'
					animate='animate'
					exit='exit'
					className={cn(
						'min-h-screen text-gray-900 dark:text-gray-100 dark:bg-gray-900 bg-white',
					)}
				>
					{/* Render the current page component */}
					<Layout>{content}</Layout>
				</motion.div>
			</AnimatePresence>
		</>
	);
}

export default App;
