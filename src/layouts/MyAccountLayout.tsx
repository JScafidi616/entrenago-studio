import { useLocation, Link, useOutlet, useNavigate } from 'react-router-dom';
import { AnimatePresence, easeInOut, m } from 'motion/react';
import { ArrowLeft, Dumbbell, UserCircle, Settings } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState, useEffect } from 'react';

export const MyAccountLayout = ({
	initialTab = 'profile',
}: {
	initialTab?: string;
}) => {
	const location = useLocation();
	const navigate = useNavigate(); // Added to handle URL changes
	const currentOutlet = useOutlet();
	const [tab, setTab] = useState(initialTab);

	const contentVariants = {
		initial: { opacity: 0 },
		animate: {
			opacity: 1,
		},
		exit: { opacity: 0 },
	};
	// 1. Sync tab state with URL changes (e.g., browser back/forward buttons)
	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

		if (location.pathname.endsWith('/settings')) {
			setTab('settings');
		} else {
			setTab('profile');
		}
	}, [location.pathname]);

	// 2. Update URL when tab changes to trigger useOutlet()
	const handleTabChange = (value: string) => {
		setTab(value);
		// Navigate to the new route.
		// NOTE: Adjust these paths to match your actual route structure!
		navigate(value);
	};

	return (
		<div className='min-h-screen flex flex-col bg-gray-100 dark:bg-neutral-900 transition-colors duration-300'>
			{/* Header */}
			<header
			// className={cn({cn('bg-white shadow-md py-4 px-6 dark:bg-neutral-800')}
			></header>

			{/* Navigation */}
			<nav className='border-b border-border/50 bg-background/95 dark:bg-neutral-800/95 backdrop-blur supports-backdrop-filter:bg-background/60 dark:supports-backdrop-filter:bg-neutral-800/60 sticky top-1 z-50 mx-4 mt-4 rounded-2xl shadow-sm'>
				<div className='container mx-auto px-6'>
					<div className='flex items-center justify-between h-16 md:h-18'>
						<div className='flex items-center space-x-3'>
							<div className='p-2 bg-linear-to-r from-cyan-500 to-green-400 rounded-full shadow-md'>
								<Dumbbell className='h-5 w-5 md:h-6 md:w-6 text-white' />
							</div>
							<span className='font-bold text-lg md:text-xl text-foreground'>
								Entrena GO
							</span>
						</div>

						<Link
							to='/'
							aria-label='Back to Dashboard'
							className='flex items-center gap-2 px-3 md:px-4 h-10 rounded-2xl text-sm font-medium text-foreground bg-muted/40 dark:bg-neutral-700/40 hover:bg-muted/70 dark:hover:bg-neutral-700/70 active:scale-95 transition-all duration-200'
						>
							<ArrowLeft className='h-4 w-4 shrink-0' />
							<span className='hidden sm:inline'>Back to Dashboard</span>
							<span className='sm:hidden'>Dashboard</span>
						</Link>
					</div>
				</div>
			</nav>

			{/* Main Content */}
			<main className='container mx-auto flex-1 w-full px-6 py-6 md:py-8 max-w-4xl'>
				<div className='mb-6 px-1'>
					<h1 className='text-2xl md:text-3xl font-bold text-foreground text-balance'>
						Account
					</h1>
					<p className='text-sm text-muted-foreground mt-1'>
						Manage your profile and app preferences
					</p>
				</div>

				<Tabs value={tab} onValueChange={handleTabChange} className='w-full'>
					<TabsList className='grid w-full grid-cols-2 max-w-sm bg-muted/30 dark:bg-neutral-700/30 rounded-2xl p-1 h-auto'>
						<TabsTrigger
							value='profile'
							className='rounded-2xl py-2 data-[state=active]:bg-linear-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-green-400 data-[state=active]:text-white data-[state=active]:shadow-md'
						>
							<UserCircle className='h-4 w-4 mr-2' />
							Profile
						</TabsTrigger>
						<TabsTrigger
							value='settings'
							className='rounded-2xl py-2 data-[state=active]:bg-linear-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-green-400 data-[state=active]:text-white data-[state=active]:shadow-md'
						>
							<Settings className='h-4 w-4 mr-2' />
							Settings
						</TabsTrigger>
					</TabsList>
					<AnimatePresence mode='wait'>
						<m.div
							key={tab}
							variants={contentVariants}
							initial='initial'
							animate='animate'
							exit='exit'
							transition={{ duration: 0.2, ease: easeInOut }}
							className='mt-6  private-content-viewport'
						>
							{currentOutlet}
						</m.div>
					</AnimatePresence>
				</Tabs>
			</main>
		</div>
	);
};
