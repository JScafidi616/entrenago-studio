'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/AuthContext';
import { LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { accountNavItems } from '@/features/navigation/constants/constantNav';
import { useUserInitials } from '@/hooks/userUserInitials';

export const UserDropdown = () => {
	const { user, signOut, profile } = useAuth();
	const initials = useUserInitials();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='ghost'
					size='icon'
					className='hover:bg-accent rounded-2xl h-10 w-10 bg-muted/30 dark:bg-neutral-700/30 transition-all duration-200 hover:shadow-md'
				>
					<Avatar className='h-6 w-6'>
						<AvatarImage src='/diverse-user-avatars.png' alt='User' />
						<AvatarFallback className='bg-linear-to-r from-cyan-500 to-green-400 text-white text-xs font-semibold'>
							{initials}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align='end'
				className='w-56 bg-background/95 dark:bg-neutral-800/95 backdrop-blur supports-backdrop-filter:bg-background/60 dark:supports-backdrop-filter:bg-neutral-800/60 border border-border/50 rounded-2xl shadow-lg'
			>
				<div className='flex items-center space-x-3 p-3'>
					<Avatar className='h-10 w-10'>
						<AvatarImage src='/diverse-user-avatars.png' alt='User' />
						<AvatarFallback className='bg-linear-to-r from-cyan-500 to-green-400 text-white font-semibold'>
							{initials}
						</AvatarFallback>
					</Avatar>
					<div className='flex flex-col min-w-0'>
						{user && (
							<>
								<p className='text-sm font-medium text-foreground truncate'>
									{profile?.full_name ||
										profile?.email?.split('@')[0] ||
										'Usuario'}
								</p>
								<p className='text-xs text-muted-foreground truncate'>
									{user.email}
								</p>
							</>
						)}
					</div>
				</div>

				<DropdownMenuSeparator className='bg-border/50' />

				{/* User Profile/Settings Navigation */}
				{accountNavItems.map((item) => (
					<NavLink key={item.id} to={item.id}>
						<DropdownMenuItem className='flex items-center space-x-3 px-3 py-2 cursor-pointer hover:bg-accent/50 rounded-xl mx-1 transition-colors duration-200'>
							<item.icon className='h-4 w-4 text-muted-foreground' />
							<span className='text-sm font-medium text-foreground'>
								<NavLink to='/profile'></NavLink>
								{item.label}
							</span>
						</DropdownMenuItem>
					</NavLink>
				))}

				<DropdownMenuSeparator className='bg-border/50' />
				{/* TODO: Create a NavDropDown Component in navigation */}
				{/* Log out button */}
				<DropdownMenuItem
					onClick={() => signOut()}
					className='flex items-center space-x-3 px-3 py-2 cursor-pointer hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl mx-1 transition-colors duration-200 text-red-600 dark:text-red-400'
				>
					<LogOut className='h-4 w-4' />
					<span className='text-sm font-medium'>Log Out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
