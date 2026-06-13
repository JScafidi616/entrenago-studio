import {
	Outlet,
	useLocation,
	NavLink,
	Link,
	useOutlet,
} from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';

export const SettingsLayout = () => {
	const location = useLocation();
	const currentOutlet = useOutlet();
	const { signOut } = useAuth();

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Top Header */}
			<header className='bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center'>
				<Link
					to='/dashboard'
					className='text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors'
				>
					&larr; Back to App
				</Link>
				<button
					onClick={() => signOut()}
					className='text-sm text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors font-medium'
				>
					Sign Out
				</button>
			</header>

			<div className='max-w-5xl mx-auto p-8'>
				<h1 className='text-2xl font-bold text-gray-900 mb-6'>Settings</h1>

				{/* Settings Sub-navigation */}
				<div className='mb-8 border-b border-gray-200'>
					<nav className='flex space-x-8'>
						<SettingsTab to='/profile'>Profile</SettingsTab>
						<SettingsTab to='/profile/security'>Security</SettingsTab>{' '}
						{/* Example future route */}
					</nav>
				</div>

				{/* Settings Content */}
				<AnimatePresence mode='wait'>
					<motion.div
						key={location.pathname}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.2 }}
						className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'
					>
						{currentOutlet} {/* Renders Profile page */}
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
};

const SettingsTab = ({
	to,
	children,
}: {
	to: string;
	children: React.ReactNode;
}) => (
	<NavLink
		to={to}
		className={({ isActive }) =>
			`border-b-2 pb-3 text-sm font-medium transition-colors ${
				isActive
					? 'border-blue-600 text-blue-600'
					: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
			}`
		}
	>
		{children}
	</NavLink>
);
