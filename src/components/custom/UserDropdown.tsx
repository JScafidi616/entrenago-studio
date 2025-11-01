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
import { LogOut, Settings, UserCircle } from 'lucide-react';

export function UserDropdown() {
	const handleProfileClick = () => {
		console.log('Navigate to Profile');
		// Add your profile navigation logic here
	};

	const handleSettingsClick = () => {
		console.log('Navigate to Settings');
		// Add your settings navigation logic here
	};

	const handleLogoutClick = () => {
		console.log('Logout user');
		// Add your logout logic here
	};

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
						<AvatarFallback className='bg-gradient-to-r from-cyan-500 to-green-400 text-white text-xs font-semibold'>
							JD
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align='end'
				className='w-56 bg-background/95 dark:bg-neutral-800/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:supports-[backdrop-filter]:bg-neutral-800/60 border border-border/50 rounded-2xl shadow-lg'
			>
				<div className='flex items-center space-x-3 p-3'>
					<Avatar className='h-10 w-10'>
						<AvatarImage src='/diverse-user-avatars.png' alt='User' />
						<AvatarFallback className='bg-gradient-to-r from-cyan-500 to-green-400 text-white font-semibold'>
							JD
						</AvatarFallback>
					</Avatar>
					<div className='flex flex-col'>
						<p className='text-sm font-medium text-foreground'>John Doe</p>
						<p className='text-xs text-muted-foreground'>
							john.doe@example.com
						</p>
					</div>
				</div>

				<DropdownMenuSeparator className='bg-border/50' />

				<DropdownMenuItem
					onClick={handleProfileClick}
					className='flex items-center space-x-3 px-3 py-2 cursor-pointer hover:bg-accent/50 rounded-xl mx-1 transition-colors duration-200'
				>
					<UserCircle className='h-4 w-4 text-muted-foreground' />
					<span className='text-sm font-medium text-foreground'>Profile</span>
				</DropdownMenuItem>

				<DropdownMenuItem
					onClick={handleSettingsClick}
					className='flex items-center space-x-3 px-3 py-2 cursor-pointer hover:bg-accent/50 rounded-xl mx-1 transition-colors duration-200'
				>
					<Settings className='h-4 w-4 text-muted-foreground' />
					<span className='text-sm font-medium text-foreground'>Settings</span>
				</DropdownMenuItem>

				<DropdownMenuSeparator className='bg-border/50' />

				<DropdownMenuItem
					onClick={handleLogoutClick}
					className='flex items-center space-x-3 px-3 py-2 cursor-pointer hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl mx-1 transition-colors duration-200 text-red-600 dark:text-red-400'
				>
					<LogOut className='h-4 w-4' />
					<span className='text-sm font-medium'>Log Out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
