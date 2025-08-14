'use client';

import { Dumbbell, Home, TrendingUp } from 'lucide-react';

interface BottomNavProps {
	currentSection: string;
	handleNavigation: (page: string) => void;
}

export function BottomNav({
	currentSection,
	handleNavigation,
}: BottomNavProps) {
	const navItems = [
		{ id: '/dashboard', label: 'Dashboard', icon: Home },
		{ id: '/progress-tracking', label: 'Progress', icon: TrendingUp },
		{ id: '/my-routines', label: 'Routines', icon: Dumbbell },
	];

	return (
		<div className='fixed bottom-4 left-4 right-4 z-50 md:hidden'>
			<div className='bg-background/95 dark:bg-neutral-800/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:supports-[backdrop-filter]:bg-neutral-800/60 border border-border/50 rounded-2xl shadow-lg'>
				<div className='flex items-center justify-around py-3 px-2'>
					{navItems.map((item) => (
						<button
							key={item.id}
							onClick={() => handleNavigation(item.id)}
							className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-xl transition-all duration-200 min-w-0 ${
								currentSection === item.id.replace(/^\/+/, '')
									? 'bg-gradient-to-r from-cyan-500 to-green-400 text-white shadow-md'
									: 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
							}`}
						>
							<item.icon className='h-5 w-5' />
							<span className='text-xs font-medium truncate'>{item.label}</span>
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
