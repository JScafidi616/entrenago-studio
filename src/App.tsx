// src/App.jsx
import { AuthContext } from '@/context/AuthContext.tsx';
import { cn } from '@/lib/utils/utils.ts';
import { AnimatePresence, easeInOut, motion } from 'motion/react';
import { useContext, useEffect } from 'react';
import { useLocation } from 'wouter';

import PrivateLayout from '@/layouts/PrivateLayout';
import PublicLayout from '@/layouts/PublicLayout';
import { privateRoutes, publicRoutes } from '@/routes';

// Loading component for Suspense fallback
// const LoadingFallback = () => (
// 	<div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-100 dark:bg-neutral-900'>
// 		<div
// 			className='h-10 w-10 animate-spin rounded-full border-4
//                    border-gray-300 border-t-gray-800
//                    dark:border-gray-700 dark:border-t-white bg-transparent'
// 			role='status'
// 			aria-label='Loading...'
// 		></div>
// 	</div>
// );

const privateRouteKeys = Object.keys(
	privateRoutes,
) as (keyof typeof privateRoutes)[];
const publicRouteKeys = Object.keys(
	publicRoutes,
) as (keyof typeof publicRoutes)[];

function App() {
	// const [isDark, toggleDark] = useDarkMode();
	const auth = useContext(AuthContext);
	if (!auth) {
		throw new Error('AuthContext is not provided');
	}

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

	const { user, loading } = auth;
	const [location, setLocation] = useLocation();
	const isResetPassword = location.startsWith('/reset-password');

	const isPrivate = privateRouteKeys.includes(
		location as keyof typeof privateRoutes,
	);
	const isPublic = publicRouteKeys.includes(
		location as keyof typeof publicRoutes,
	);

	useEffect(() => {
		if (loading) return;
		if (isResetPassword) return;

		if (user && isPublic) {
			setLocation('/dashboard');
			return;
		}
		if (!user && isPrivate) {
			setLocation('/login');
			return;
		}
		if (!user && !isPublic && !isPrivate && location !== '/') {
			setLocation('/login');
		}
	}, [user, loading, location]);

	// if (loading) return <LoadingFallback />;

	let content: React.ReactNode;
	let Layout: typeof PrivateLayout | typeof PublicLayout;
	let routeType: 'private' | 'public';

	if (isResetPassword) {
		content = publicRoutes['/reset-password'];
		Layout = PublicLayout;
		routeType = 'public';
	} else if (user && isPrivate) {
		content = privateRoutes[location as keyof typeof privateRoutes];
		Layout = PrivateLayout;
		routeType = 'private';
	} else if (!user && isPublic) {
		content = publicRoutes[location as keyof typeof publicRoutes];
		Layout = PublicLayout;
		routeType = 'public';
	} else if (location === '/') {
		content = user ? privateRoutes['/dashboard'] : publicRoutes['/login'];
		Layout = user ? PrivateLayout : PublicLayout;
		routeType = user ? 'private' : 'public';
	} else {
		// Redirect in progress via useEffect, render nothing
		content = null;
		Layout = PublicLayout;
		routeType = 'public';
	}

	//Todo Generar un loading mas estilizado y con animaciones
	//if (loading) return <LoadingFallback />;

	// const isPrivateRoute =
	// 	user &&
	// 	privateRoutes[location as keyof typeof privateRoutes] &&
	// 	!isResetPasswordRoute;
	// const isPublicRoute =
	// 	(!user && publicRoutes[location as keyof typeof publicRoutes]) ||
	// 	isResetPasswordRoute;

	// Manually map routes to components depending on location and auth
	// let content: React.ReactNode;
	// if (isPrivateRoute) {
	// 	content = privateRoutes[location as keyof typeof privateRoutes];
	// } else if (isPublicRoute) {
	// 	content = publicRoutes[location as keyof typeof publicRoutes];
	// } else if (location === '/') {
	// 	content = user ? privateRoutes['/dashboard'] : publicRoutes['/login'];
	// } else {
	// 	content = <div className='p-4 text-center'>404 - Page not found...</div>; //todo create a standalone 404 page...
	// }

	// const Layout = isPrivateRoute ? PrivateLayout : PublicLayout;
	// added only for debugging purposes, can be removed later
	// console.log('********* APP STARTED - app tsx *********');
	// console.log('ENV:', import.meta.env);

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
					key={routeType ? 'private' : 'public'}
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
