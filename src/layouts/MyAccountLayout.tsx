import { useLocation, Link, useOutlet, useNavigate } from 'react-router-dom';
import { AnimatePresence, easeInOut, m } from 'motion/react';
import { ArrowLeft, Dumbbell, UserCircle, Settings } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/utils/utils';

export const MyAccountLayout = ({ initialTab = 'profile' }: { initialTab?: string }) => {
	const location = useLocation();
	const navigate = useNavigate(); // Added to handle URL changes
	const currentOutlet = useOutlet();

	const contentVariants = {
		initial: { opacity: 0 },
		animate: {
			opacity: 1,
		},
		exit: { opacity: 0 },
	};
	const tab = location.pathname.endsWith('/settings') ? 'settings' : initialTab;

	// Update URL when tab changes to trigger useOutlet()
	const handleTabChange = (value: string) => {
		navigate(value);
	};

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
								<Dumbbell className="h-5 w-5 text-white md:h-6 md:w-6" />
							</div>
							<span className="text-foreground text-lg font-bold md:text-xl">Entrena GO</span>
						</div>

						<Link
							to="/"
							aria-label="Back to Dashboard"
							className="text-foreground bg-muted/40 hover:bg-muted/70 flex h-10 items-center gap-2 rounded-2xl px-3 text-sm font-medium transition-all duration-200 active:scale-95 md:px-4 dark:bg-neutral-700/40 dark:hover:bg-neutral-700/70"
						>
							<ArrowLeft className="h-4 w-4 shrink-0" />
							<span className="hidden sm:inline">Back to Dashboard</span>
							<span className="sm:hidden">Dashboard</span>
						</Link>
					</div>
				</div>
			</nav>

			{/* Main Content */}
			<main className="container mx-auto w-full max-w-4xl grow px-6 py-6 md:py-8">
				<div className="mb-6 px-1">
					<h1 className="text-foreground text-2xl font-bold text-balance md:text-3xl">Account</h1>
					<p className="text-muted-foreground mt-1 text-sm">
						Manage your profile and app preferences
					</p>
				</div>

				<Tabs value={tab} onValueChange={handleTabChange} className="w-full">
					{/* Tabs section here */}
					<TabsList className="bg-muted/30 grid h-auto w-full max-w-sm grid-cols-2 rounded-2xl p-1 dark:bg-neutral-700/30">
						{/* Profile tab */}
						<TabsTrigger
							value="profile"
							className={cn(
								'relative cursor-pointer rounded-2xl py-2 transition-colors data-[state=active]:bg-transparent',
								tab === 'profile' ? 'text-white' : 'text-muted-foreground hover:text-foreground',
							)}
						>
							{tab === 'profile' && (
								<m.div
									layoutId="active-tab-pill"
									className="absolute inset-0 rounded-2xl bg-linear-to-r from-cyan-500 to-green-400 shadow-md"
									transition={{ type: 'spring', stiffness: 300, damping: 30 }}
								/>
							)}
							<div className="relative z-10 flex items-center justify-center">
								<UserCircle className="mr-2 h-4 w-4" />
								Profile
							</div>
						</TabsTrigger>
						{/* Settings tab */}
						<TabsTrigger
							value="settings"
							className={cn(
								'relative cursor-pointer rounded-2xl py-2 transition-colors data-[state=active]:bg-transparent',
								tab === 'settings' ? 'text-white' : 'text-muted-foreground hover:text-foreground',
							)}
						>
							{tab === 'settings' && (
								<m.div
									layoutId="active-tab-pill"
									className="absolute inset-0 rounded-2xl bg-linear-to-r from-cyan-500 to-green-400 shadow-md"
									transition={{ type: 'spring', stiffness: 300, damping: 30 }}
								/>
							)}
							<div className="relative z-10 flex items-center justify-center">
								<Settings className="mr-2 h-4 w-4" />
								Settings
							</div>
						</TabsTrigger>
					</TabsList>
					{/* Loading Content here */}
					<AnimatePresence mode="wait">
						<m.div
							key={tab}
							variants={contentVariants}
							initial="initial"
							animate="animate"
							exit="exit"
							className="mt-6"
							transition={{ duration: 0.2, ease: easeInOut }}
						>
							{currentOutlet}
						</m.div>
					</AnimatePresence>
				</Tabs>
			</main>

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
};
