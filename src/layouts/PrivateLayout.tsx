// src/layouts/PrivateLayout.tsx

import { BottomNav } from '@/components/custom/BottonNav.tsx';
import { MobileNav } from '@/components/custom/MobileNav.tsx';
import { ThemeToggle } from '@/components/custom/ThemeToggle.tsx';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/utils';
import { Dumbbell, User } from 'lucide-react';
import { AnimatePresence, easeInOut, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

export default function PrivateLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [location, setLocation] = useLocation(); // Hook de Wouter
	const [currentSection, setCurrentSection] = useState(
		location.replace(/^\/+/, '') || 'dashboard',
	);

	useEffect(() => {
		setCurrentSection(location.replace(/^\/+/, '') || 'dashboard');
	}, [location]);

	const contentVariants = {
		initial: { opacity: 0 },
		animate: {
			opacity: 1,
		},
		exit: { opacity: 0 },
	};

	const pageTransition = {
		duration: 0.2,
		ease: easeInOut,
	};

	const handleNavigation = (page: string) => {
		setLocation(page);
		setCurrentSection(page.replace(/^\/+/, ''));
	};

	return (
		<div
			className={cn(
				'min-h-screen flex flex-col bg-gray-100 dark:bg-neutral-900',
			)}
		>
			{/* Header */}
			<header
			// className={cn({cn('bg-white shadow-md py-4 px-6 dark:bg-neutral-800')}
			></header>
			{/* Navigation */}
			<nav
				className={cn(
					'border-b border-border/50 bg-background/95 dark:bg-neutral-800/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:supports-[backdrop-filter]:bg-neutral-800/60 sticky top-0 z-50 mx-4 mt-4 rounded-2xl shadow-sm',
				)}
			>
				<div className={cn('container mx-auto px-6')}>
					<div className={cn('flex items-center justify-between h-16 md:h-18')}>
						<div className={cn('flex items-center space-x-3')}>
							<div
								className={cn(
									'p-2 bg-gradient-to-r from-cyan-500 to-green-400 rounded-full shadow-md',
								)}
							>
								<Dumbbell className={cn('h-5 w-5 md:h-6 md:w-6 text-white')} />
							</div>
							<span
								className={cn('font-bold text-lg md:text-xl text-foreground')}
							>
								<h1 className={cn('text-xl font-semibold dark:text-gray-300')}>
									Entrena GO
								</h1>
							</span>
						</div>

						<div className={cn('flex items-center space-x-2 md:space-x-4')}>
							{/* Desktop Navigation - Moved to Right */}
							<div
								className={cn(
									'hidden md:flex items-center space-x-2 bg-muted/30 dark:bg-neutral-700/30 rounded-2xl p-1',
								)}
							>
								<button
									onClick={() => handleNavigation('/dashboard')}
									className={cn(
										`px-4 py-2 text-sm font-medium rounded-2xl transition-all duration-200 ${
											currentSection === 'dashboard'
												? 'bg-gradient-to-r from-cyan-500 to-green-400 text-white shadow-md'
												: 'text-muted-foreground hover:text-foreground hover:bg-background/50 dark:hover:bg-neutral-600/50'
										}`,
									)}
								>
									Dashboard
								</button>
								<button
									onClick={() => handleNavigation('/progress-tracking')}
									className={cn(
										`px-4 py-2 text-sm font-medium rounded-2xl transition-all duration-200 ${
											currentSection === 'progress-tracking'
												? 'bg-gradient-to-r from-cyan-500 to-green-400 text-white shadow-md'
												: 'text-muted-foreground hover:text-foreground hover:bg-background/50 dark:hover:bg-neutral-600/50'
										}`,
									)}
								>
									Progress
								</button>
								<button
									onClick={() => handleNavigation('/my-routines')}
									className={cn(
										`px-4 py-2 text-sm font-medium rounded-2xl transition-all duration-200 ${
											currentSection === 'my-routines'
												? 'bg-gradient-to-r from-cyan-500 to-green-400 text-white shadow-md'
												: 'text-muted-foreground hover:text-foreground hover:bg-background/50 dark:hover:bg-neutral-600/50'
										}`,
									)}
								>
									My Routines
								</button>
							</div>

							<div className={cn('flex items-center space-x-2')}>
								<ThemeToggle />
								<Button
									variant='ghost'
									size='icon'
									className={cn(
										'hover:bg-accent rounded-2xl h-10 w-10 bg-muted/30 dark:bg-neutral-700/30',
									)}
								>
									<User className={cn('h-5 w-5')} />
								</Button>
							</div>

							{/* Mobile Menu */}
							<MobileNav
								currentSection={currentSection}
								handleNavigation={handleNavigation} // Pass handleNavigation as a prop
								setCurrentSection={setCurrentSection}
							/>
						</div>
					</div>
				</div>
			</nav>
			<main
				className={cn(
					'flex-grow flex items-center justify-center text-center px-4',
				)}
			>
				<AnimatePresence mode='wait'>
					<motion.div
						key={location} // re-animate on route change inside private
						variants={contentVariants}
						transition={pageTransition}
						initial='initial'
						animate='animate'
						exit='exit'
					>
						{children}
					</motion.div>
				</AnimatePresence>
			</main>
			{/* Bottom Navigation - Mobile Only */}
			<BottomNav
				currentSection={currentSection}
				handleNavigation={handleNavigation} // Pass handleNavigation as a prop
			/>
			{/* Footer */}
			<footer
				className={cn(
					'bg-white shadow-inner py-4 px-6 text-center text-sm text-gray-500 dark:bg-neutral-800 dark:text-gray-400',
				)}
			>
				© {new Date().getFullYear()} EntrenaGo. Todos los derechos reservados.
			</footer>
		</div>
	);
}
