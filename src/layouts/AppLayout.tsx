// src/layouts/PrivateLayout.tsx

import { NavBottomMobile } from '@/features/navigation/components/NavBottonMobile';
import { NavSideMobile } from '@/features/navigation/components/NavSideMobile';
import { ThemeToggle } from '@/features/darkMode/components/ThemeToggle';
import { UserDropdown } from '@/components/custom/UserDropdown.tsx';
import { cn } from '@/utils/utils';
import { Dumbbell } from 'lucide-react';
import { AnimatePresence, easeInOut, m } from 'motion/react';
import { useLocation, useNavigate, useOutlet } from 'react-router-dom'; //Oulet avoided to maintain animation
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import OnboardingModal from '@/features/onboarding/components/Onboarding';
import { NavDesktop } from '@/features/navigation/components/NavDesktop';

export default function AppLayout() {
	const location = useLocation();
	const navigate = useNavigate();
	const currentOutlet = useOutlet();
	// Derive current section directly from the URL path to avoid manual state management
	const currentSection = location.pathname.replace(/^\/+/, '') || 'dashboard';
	//
	const { user, profile } = useAuth();
	const showOnboarding = !!user && !profile?.onboarded;

	const handleNavigation = (page: string) => {
		navigate(page);
	};

	const contentVariants = {
		initial: { opacity: 0 },
		animate: {
			opacity: 1,
		},
		exit: { opacity: 0 },
	};

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}, [location.pathname]);

	return (
		<div className="flex min-h-screen flex-col bg-gray-100 transition-colors duration-300 dark:bg-neutral-900">
			{/* Header */}
			<header
			// className={cn({cn('bg-white shadow-md py-4 px-6 dark:bg-neutral-800')}
			></header>

			{/* Navigation */}
			<nav className="border-border/50 bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-1 z-50 mx-4 mt-4 rounded-2xl border-b shadow-sm backdrop-blur dark:bg-neutral-800/95 dark:supports-backdrop-filter:bg-neutral-800/60">
				<div className="container mx-auto px-6">
					<div className="flex h-16 items-center justify-between md:h-18">
						<div className="flex items-center space-x-3">
							<div className="rounded-full bg-linear-to-r from-cyan-500 to-green-400 p-2 shadow-md">
								<Dumbbell className={cn('h-5 w-5 text-white md:h-6 md:w-6')} />
							</div>
							<span className="text-foreground text-xl font-bold md:text-xl dark:text-gray-300">
								Entrena GO
							</span>
						</div>

						<div className="flex items-center space-x-2 md:space-x-4">
							{/* Desktop Menu Navigation - Moved to Right */}
							<div className="bg-muted/30 hidden items-center space-x-2 rounded-2xl p-1 md:flex dark:bg-neutral-700/30">
								<NavDesktop />
							</div>

							{/* ThemeToggle & Mobile Menu */}
							<div className={cn('flex items-center space-x-2')}>
								<ThemeToggle />
								<div className="hidden md:block">
									<UserDropdown />
								</div>
								<NavSideMobile
									currentSection={currentSection}
									handleNavigation={handleNavigation} // Pass handleNavigation as a prop
									setCurrentSection={() => {}}
								/>
							</div>
						</div>
					</div>
				</div>
			</nav>

			{/* Main Content */}
			<main className="container mx-auto w-full max-w-7xl grow px-6 py-6 md:py-8">
				<AnimatePresence mode="wait">
					<m.div
						key={location.pathname} // re-animate on route change inside private
						variants={contentVariants}
						initial="initial"
						animate="animate"
						exit="exit"
						transition={{ duration: 0.2, ease: easeInOut }}
					>
						{/* Content */}
						{currentOutlet}
						{/* Modal de onboarding */}
						<AnimatePresence>
							{showOnboarding && user && (
								<OnboardingModal
									userId={user.id}
									// 2. Optional: If your modal doesn't automatically
									// invalidate the query, you can pass a callback to do it.
									onComplete={() => {
										console.log('Onboarding finished successfully!');
									}}
								/>
							)}
						</AnimatePresence>
					</m.div>
				</AnimatePresence>
			</main>
			{/* Bottom Navigation - Mobile Only */}
			<NavBottomMobile
				currentSection={currentSection}
				handleNavigation={handleNavigation} // Pass handleNavigation as a prop
			/>
			{/* Footer */}
			<footer
				className={cn(
					'bg-white px-6 py-4 text-center text-sm text-gray-500 shadow-inner dark:bg-neutral-800 dark:text-gray-400',
				)}
			>
				© {new Date().getFullYear()} EntrenaGo. Todos los derechos reservados.
			</footer>
		</div>
	);
}
