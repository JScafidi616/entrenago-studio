// src/layouts/PrivateLayout.tsx

import { NavBottomMobile } from '@/features/navigation/components/NavBottonMobile';
import { NavSideMobile } from '@/features/navigation/components/NavSideMobile';
import { ThemeToggle } from '@/features/darkMode/components/ThemeToggle';
import { UserDropdown } from '@/components/custom/UserDropdown.tsx';
import { cn } from '@/utils/utils';
import { Dumbbell } from 'lucide-react';
import { AnimatePresence, easeInOut, m } from 'motion/react';
import { useLocation, useNavigate, useOutlet } from 'react-router-dom'; //Oulet avoided to maintain animation
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase/supabase';
import OnboardingModal from '@/features/onboarding/components/Onboarding';
import { NavDesktop } from '@/features/navigation/components/NavDesktop';

export default function AppLayout() {
	const location = useLocation();
	const navigate = useNavigate();
	const currentOutlet = useOutlet();
	// Derive current section directly from the URL path to avoid manual state management
	const currentSection = location.pathname.replace(/^\/+/, '') || 'dashboard';
	//
	const { user } = useAuth();
	const [showOnboarding, setShowOnboarding] = useState(false);

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

	useEffect(() => {
		const checkSessionAndProfile = async () => {
			if (!user) return;

			const { data: profile, error } = await supabase
				.from('profiles')
				.select('onboarded')
				.eq('id', user.id)
				.single();

			if (error) {
				console.error(error);
				return;
			}

			setShowOnboarding(!profile?.onboarded);
		};

		checkSessionAndProfile();
	}, [user]);

	return (
		<div
			className={cn(
				'min-h-screen flex flex-col bg-gray-100 dark:bg-neutral-900 transition-colors duration-300',
			)}
		>
			{/* Header */}
			<header
			// className={cn({cn('bg-white shadow-md py-4 px-6 dark:bg-neutral-800')}
			></header>

			{/* Navigation */}
			<nav
				className={cn(
					'border-b border-border/50 bg-background/95 dark:bg-neutral-800/95 backdrop-blur supports-backdrop-filter:bg-background/60 dark:supports-backdrop-filter:bg-neutral-800/60 sticky top-1 z-50 mx-4 mt-4 rounded-2xl shadow-sm',
				)}
			>
				<div className={cn('container mx-auto px-6')}>
					<div className={cn('flex items-center justify-between h-16 md:h-18')}>
						<div className={cn('flex items-center space-x-3')}>
							<div
								className={cn(
									'p-2 bg-linear-to-r from-cyan-500 to-green-400 rounded-full shadow-md',
								)}
							>
								<Dumbbell className={cn('h-5 w-5 md:h-6 md:w-6 text-white')} />
							</div>
							<span
								className={cn(
									'text-xl md:text-xl font-bold text-foreground dark:text-gray-300',
								)}
							>
								Entrena GO
							</span>
						</div>

						<div className={cn('flex items-center space-x-2 md:space-x-4')}>
							{/* Desktop Navigation - Moved to Right */}
							<div
								className={cn(
									'hidden md:flex items-center space-x-2 bg-muted/30 dark:bg-neutral-700/30 rounded-2xl p-1',
								)}
							>
								{/* Desktop Menu */}
								<NavDesktop />
							</div>

							<div className={cn('flex items-center space-x-2')}>
								<ThemeToggle />
								<div className='hidden md:block'>
									<UserDropdown />
								</div>
								{/* Mobile Menu */}
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

			<main
				className={cn(
					'container mx-auto grow w-full px-6 py-6 md:py-8 max-w-7xl',
				)}
			>
				<AnimatePresence mode='wait'>
					<m.div
						key={location.pathname} // re-animate on route change inside private
						variants={contentVariants}
						initial='initial'
						animate='animate'
						exit='exit'
						transition={{ duration: 0.2, ease: easeInOut }}
					>
						{/* Content */}
						{currentOutlet}
						{/* Modal de onboarding */}
						<AnimatePresence>
							{showOnboarding && user && (
								<OnboardingModal
									userId={user.id}
									onComplete={() => setShowOnboarding(false)}
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
					'bg-white shadow-inner py-4 px-6 text-center text-sm text-gray-500 dark:bg-neutral-800 dark:text-gray-400',
				)}
			>
				© {new Date().getFullYear()} EntrenaGo. Todos los derechos reservados.
			</footer>
		</div>
	);
}
