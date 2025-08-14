// src/layouts/PublicLayout.tsx
import { ThemeToggle } from '@/components/custom/ThemeToggle.tsx';
import { AnimatePresence, easeInOut, motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const contentVariants = {
		initial: { opacity: 0, y: 10 },
		animate: {
			opacity: 1,
			transition: { duration: 0.3, ease: easeInOut },
		},
		exit: {
			opacity: 0,
			transition: { duration: 0.2, ease: easeInOut },
		},
	};
	return (
		<>
			<span
				className={cn(
					'fixed top-4 right-4 px-3 py-2 rounded border dark:border-gray-700 border-gray-300 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white shadow transition-colors z-50',
				)}
			>
				<ThemeToggle />
			</span>
			<div className={cn('bg-gray-100 dark:bg-neutral-900')}>
				<AnimatePresence mode='wait'>
					<motion.div
						key={`page-${location}`} // re-animate on route change inside private
						variants={contentVariants}
						initial='initial'
						animate='animate'
						exit='exit'
					>
						{children}
					</motion.div>
				</AnimatePresence>
			</div>
		</>
	);
}
