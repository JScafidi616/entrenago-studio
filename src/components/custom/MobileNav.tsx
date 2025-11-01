'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { DropdownMenuSeparator } from '@components/ui/dropdown-menu';
import {
	Dumbbell,
	Home,
	LogOut,
	Menu,
	Settings,
	TrendingUp,
	UserCircle,
} from 'lucide-react';
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
					className={cn(
						'md:hidden rounded-full h-10 w-10 bg-muted/30 dark:bg-neutral-700/30 hover:bg-muted/50 dark:hover:bg-neutral-700/50',
					)}
				>
					<Menu className={cn('h-5 w-5')} />
				</Button>
			</SheetTrigger>
			<SheetContent
				side='right'
				className={cn(
					'w-80 dark:bg-neutral-800 rounded-l-3xl border-l border-border/50',
				)}
			>
				<div className={cn('flex flex-col space-y-6 mt-8')}>
					<div className={cn('px-4')}>
						<div
							className={cn(
								'flex items-center space-x-3 p-4 bg-gradient-to-r from-cyan-500/10 to-green-400/10 dark:from-cyan-500/20 dark:to-green-400/20 rounded-2xl border border-cyan-500/20',
							)}
						>
							<Avatar className={cn('h-12 w-12 ring-2 ring-cyan-500/50')}>
								<AvatarImage src='/diverse-user-avatars.png' alt='User' />
								<AvatarFallback
									className={cn(
										'bg-gradient-to-r from-cyan-500 to-green-400 text-white font-semibold text-base',
									)}
								>
									JD
								</AvatarFallback>
							</Avatar>
							<div className={cn('flex flex-col')}>
								<p className={cn('text-base font-semibold text-foreground')}>
									John Doe
								</p>
								<p className={cn('text-xs text-muted-foreground')}>
									john.doe@example.com
								</p>
							</div>
						</div>
					</div>

					<nav className={cn('flex flex-col space-y-3 px-4')}>
						{navItems.map((item) => (
							<button
								key={item.id}
								onClick={() => {
									handleNavigation(item.id);
									setOpen(false);
								}}
								className={cn(
									`flex items-center space-x-4 px-6 py-4 rounded-2xl text-left transition-all duration-200 ${
										currentSection === item.id.replace(/^\/+/, '')
											? 'bg-gradient-to-r from-cyan-500 to-green-400 text-white shadow-lg'
											: 'text-muted-foreground hover:text-foreground hover:bg-accent/50 bg-muted/20'
									}`,
								)}
							>
								<item.icon className='h-5 w-5' />
								<span className={cn('font-medium')}>{item.label}</span>
							</button>
						))}
					</nav>

					<DropdownMenuSeparator className={cn('bg-border/50 mx-4')} />
					{/* User Profile/Settings Navigation */}
					<div className={cn('px-4')}>
						<div className={cn('mt-4 space-y-2')}>
							<button
								className={cn(
									'flex items-center space-x-3 w-full px-4 py-3 text-left rounded-2xl hover:bg-accent/50 transition-colors duration-200',
								)}
							>
								<UserCircle className={cn('h-5 w-5 text-muted-foreground')} />
								<span className={cn('font-medium text-foreground')}>
									Profile
								</span>
							</button>
							<button
								className={cn(
									'flex items-center space-x-3 w-full px-4 py-3 text-left rounded-2xl hover:bg-accent/50 transition-colors duration-200',
								)}
							>
								<Settings className={cn('h-5 w-5 text-muted-foreground')} />
								<span className={cn('font-medium text-foreground')}>
									Settings
								</span>
							</button>
							<button
								className={cn(
									'flex items-center space-x-3 w-full px-4 py-3 text-left rounded-2xl hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors duration-200 text-red-600 dark:text-red-400',
								)}
							>
								<LogOut className={cn('h-5 w-5')} />
								<span className={cn('font-medium')}>Log Out</span>
							</button>
						</div>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
