'use client';
import { NavLink } from 'react-router-dom';
import { cn } from '@/utils/utils'; // Adjust path to your cn utility
import { navItems } from '@/features/navigation/constants/constantNav';

export const DesktopNavLink = () => {
	return (
		<div className='hidden md:flex items-center gap-2'>
			{navItems.map((item) => (
				<NavLink
					key={item.id}
					to={item.id}
					className={({ isActive }) =>
						cn(
							'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-2xl transition-all duration-200',
							isActive
								? 'bg-linear-to-r from-cyan-500 to-green-400 text-white shadow-md'
								: 'text-muted-foreground hover:text-foreground hover:bg-background/50 dark:hover:bg-neutral-600/50',
						)
					}
				>
					<item.icon className='h-4 w-4' />
					<span>{item.label}</span>
				</NavLink>
			))}
		</div>
	);
};
