// src/layouts/PublicLayout.tsx
import { ThemeToggle } from '@/features/darkMode/components/ThemeToggle';
import { useLocation, useOutlet } from 'react-router-dom'; //Oulet avoided to maintain animation
import { AnimatePresence, easeInOut, motion } from 'motion/react';
import { cn } from '@/utils/utils';

export const AuthLayout = () => {
	const location = useLocation();
	const currentOutlet = useOutlet();
	const contentVariants = {
		initial: { opacity: 0 },
		animate: {
			opacity: 1,
		},
		exit: { opacity: 0 },
	};

	return (
		<>
			{/* Simple Logo/Brand */}
			<span
				className={cn(
					'fixed top-4 right-4 px-3 py-2 rounded border dark:border-gray-700 border-gray-300 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white shadow transition-colors z-50',
				)}
			>
				<ThemeToggle />
			</span>
			<div className={cn('bg-gray-100 dark:bg-neutral-900')}>
				{/* AnimatePresence handles the exit animation of the old page */}
				<AnimatePresence mode='wait'>
					<motion.div
						key={location.pathname} // re-animate on route change inside private
						variants={contentVariants}
						initial='initial'
						animate='animate'
						exit='exit'
						transition={{ duration: 0.2, ease: easeInOut }}
					>
						{currentOutlet}
					</motion.div>
				</AnimatePresence>
			</div>
		</>
	);
};
