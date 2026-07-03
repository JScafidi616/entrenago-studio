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
					variant="ghost"
					size="icon"
					className="hover:bg-accent bg-muted/30 h-10 w-10 cursor-pointer rounded-2xl transition-all duration-200 hover:shadow-md dark:bg-neutral-700/30"
				>
					<Avatar className="h-6 w-6">
						<AvatarImage src="/diverse-user-avatars.png" alt="User" />
						<AvatarFallback className="bg-linear-to-r from-cyan-500 to-green-400 text-xs font-semibold text-white">
							{initials}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				className="bg-background/95 supports-backdrop-filter:bg-background/60 border-border/50 w-56 rounded-2xl border shadow-lg backdrop-blur dark:bg-neutral-800/95 dark:supports-backdrop-filter:bg-neutral-800/60"
			>
				<div className="flex items-center space-x-3 p-3">
					<Avatar className="h-10 w-10">
						<AvatarImage src="/diverse-user-avatars.png" alt="User" />
						<AvatarFallback className="bg-linear-to-r from-cyan-500 to-green-400 font-semibold text-white">
							{initials}
						</AvatarFallback>
					</Avatar>
					<div className="flex min-w-0 flex-col">
						{user && (
							<>
								<p className="text-foreground truncate text-sm font-medium">
									{profile?.full_name || profile?.email?.split('@')[0] || 'Usuario'}
								</p>
								<p className="text-muted-foreground truncate text-xs">{user.email}</p>
							</>
						)}
					</div>
				</div>

				<DropdownMenuSeparator className="bg-border/50" />

				{/* User Profile/Settings Navigation */}
				{accountNavItems.map((item) => (
					<DropdownMenuItem
						key={item.id}
						asChild
						className="hover:bg-accent/50 mx-1 flex cursor-pointer items-center space-x-3 rounded-xl px-3 py-2 transition-colors duration-200"
					>
						<NavLink to={item.id}>
							<item.icon className="text-muted-foreground h-4 w-4" />
							<span className="text-foreground text-sm font-medium">{item.label}</span>
						</NavLink>
					</DropdownMenuItem>
				))}

				<DropdownMenuSeparator className="bg-border/50" />
				{/* TODO: Create a NavDropDown Component in navigation */}
				{/* Log out button */}
				<DropdownMenuItem
					onClick={() => signOut()}
					className="mx-1 flex cursor-pointer items-center space-x-3 rounded-xl px-3 py-2 text-red-600 transition-colors duration-200 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
				>
					<LogOut className="h-4 w-4" />
					<span className="text-sm font-medium">Log Out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
