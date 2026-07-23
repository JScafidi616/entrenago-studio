'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/shared/utils/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { DropdownMenuSeparator } from '@components/ui/dropdown-menu';
import { LogOut, Menu } from 'lucide-react';
import { useState } from 'react';
import { appNavItems, accountNavItems } from '@/features/navigation/constants/constantNav';
import { useUserInitials } from '@/hooks/userUserInitials';

interface MobileNavProps {
	currentSection: string;
	handleNavigation: (page: string) => void;
	setCurrentSection: (section: string) => void;
}

export const NavSideMobile = ({ currentSection, handleNavigation }: MobileNavProps) => {
	const { user, signOut, profile } = useAuth();
	const [open, setOpen] = useState(false);
	const initials = useUserInitials();
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className={cn(
						'bg-muted/30 hover:bg-muted/50 h-10 w-10 rounded-full md:hidden dark:bg-neutral-700/30 dark:hover:bg-neutral-700/50',
					)}
				>
					<Menu className={cn('h-5 w-5')} />
				</Button>
			</SheetTrigger>
			<SheetContent
				side="right"
				className={cn('border-border/50 w-80 rounded-l-3xl border-l pt-2 pl-2 dark:bg-neutral-800')}
			>
				<div className={cn('mt-4 flex flex-col space-y-6 overflow-y-scroll')}>
					<div className={cn('px-4')}>
						<SheetClose asChild>
							<div
								className={cn(
									'flex items-center space-x-3 rounded-2xl border border-cyan-500/20 bg-linear-to-r from-cyan-500/10 to-green-400/10 p-4 dark:from-cyan-500/20 dark:to-green-400/20',
								)}
							>
								<Avatar className={cn('h-12 w-12 ring-2 ring-cyan-500/50')}>
									<AvatarImage src="/diverse-user-avatars.png" alt="User" />
									<AvatarFallback
										className={cn(
											'bg-linear-to-r from-cyan-500 to-green-400 text-base font-semibold text-white',
										)}
									>
										{initials}
									</AvatarFallback>
								</Avatar>
								<div className={cn('flex min-w-0 flex-col')}>
									{user && (
										<>
											<p className={cn('text-foreground truncate text-base font-semibold')}>
												{profile?.full_name || profile?.email?.split('@')[0] || 'Usuario'}
											</p>
											<p className={cn('text-muted-foreground truncate text-xs')}>{user.email}</p>
										</>
									)}
								</div>
							</div>
						</SheetClose>
					</div>
					{/* Main Navigation */}
					<nav className={cn('flex flex-col space-y-3 px-4')}>
						{appNavItems.map((item) => (
							<button
								key={item.id}
								onClick={() => {
									handleNavigation(item.id);
									setOpen(false);
								}}
								className={cn(
									`flex items-center space-x-4 rounded-2xl px-6 py-4 text-left transition-all duration-200 ${
										currentSection === item.id.replace(/^\/+/, '')
											? 'bg-linear-to-r from-cyan-500 to-green-400 text-white shadow-lg'
											: 'text-muted-foreground hover:text-foreground hover:bg-accent/50 bg-muted/20'
									}`,
								)}
							>
								<item.icon className="h-5 w-5" />
								<span className={cn('font-medium')}>{item.label}</span>
							</button>
						))}
					</nav>

					<DropdownMenuSeparator className={cn('bg-border/50 mx-4')} />

					{/* User Profile/Settings Navigation */}
					<div className={cn('mt-4 flex flex-col space-y-3 px-4')}>
						{accountNavItems.map((item) => (
							<SheetClose asChild key={item.id}>
								<button
									onClick={() => {
										handleNavigation(item.id);
										setOpen(false);
									}}
									className={cn(
										'text-muted-foreground hover:text-foreground hover:bg-accent/50 bg-muted/20 flex w-full items-center space-x-3 rounded-2xl px-4 py-3 text-left transition-all duration-200',
									)}
								>
									<item.icon className={cn('h-5 w-5')} />
									<span className={cn('font-medium')}>{item.label}</span>
								</button>
							</SheetClose>
						))}

						{/* Log out button */}
						<SheetClose asChild>
							<button
								onClick={() => signOut()}
								className={cn(
									'flex w-full items-center space-x-3 rounded-2xl px-4 py-3 text-left text-red-600 transition-colors duration-200 hover:bg-red-400 hover:text-red-200 dark:text-red-400 dark:hover:bg-red-700 dark:hover:text-red-950',
								)}
							>
								<LogOut className={cn('h-5 w-5')} />
								<span className={cn('font-medium')}>Log Out</span>
							</button>
						</SheetClose>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
};
