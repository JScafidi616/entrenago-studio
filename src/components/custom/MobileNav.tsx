'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Dumbbell, Home, Menu, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface MobileNavProps {
	currentSection: string;
	handleNavigation: (page: string) => void;
	setCurrentSection: (section: string) => void;
}

export function MobileNav({
	currentSection,
	handleNavigation,
}: MobileNavProps) {
	const [open, setOpen] = useState(false);

	const navItems = [
		{ id: '/dashboard', label: 'Dashboard', icon: Home },
		{ id: '/progress-tracking', label: 'Progress', icon: TrendingUp },
		{ id: '/my-routines', label: 'Routines', icon: Dumbbell },
	];

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button
					variant='ghost'
					size='icon'
					className='md:hidden rounded-full h-10 w-10 bg-muted/30 dark:bg-neutral-700/30 hover:bg-muted/50 dark:hover:bg-neutral-700/50'
				>
					<Menu className='h-5 w-5' />
				</Button>
			</SheetTrigger>
			<SheetContent
				side='right'
				className='w-80 dark:bg-neutral-800 rounded-l-3xl border-l border-border/50'
			>
				<div className='flex flex-col space-y-6 mt-8'>
					<div className='flex items-center space-x-3 px-6'>
						<div className='p-2 bg-gradient-to-r from-cyan-500 to-green-400 rounded-full shadow-md'>
							<Dumbbell className='h-5 w-5 text-white' />
						</div>
						<span className='font-bold text-xl text-foreground'>
							FitTracker
						</span>
					</div>

					<nav className='flex flex-col space-y-3 px-4'>
						{navItems.map((item) => (
							<button
								key={item.id}
								onClick={() => {
									handleNavigation(item.id);
									setOpen(false);
								}}
								className={`flex items-center space-x-4 px-6 py-4 rounded-2xl text-left transition-all duration-200 ${
									currentSection === item.id.replace(/^\/+/, '')
										? 'bg-gradient-to-r from-cyan-500 to-green-400 text-white shadow-lg'
										: 'text-muted-foreground hover:text-foreground hover:bg-accent/50 bg-muted/20'
								}`}
							>
								<item.icon className='h-5 w-5' />
								<span className='font-medium'>{item.label}</span>
							</button>
						))}
					</nav>
				</div>
			</SheetContent>
		</Sheet>
	);
}
