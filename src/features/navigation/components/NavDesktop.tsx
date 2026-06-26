'use client';
import { NavLink } from 'react-router-dom';
import { cn } from '@/utils/utils'; // Adjust path to your cn utility
import { appNavItems } from '@/features/navigation/constants/constantNav';

import { m } from 'motion/react';

export const NavDesktop = () => {
	return (
		<div className='hidden md:flex items-center gap-2'>
			{appNavItems.map((item) => (
				<NavLink
					key={item.id}
					to={item.id}
					className={({ isActive }) =>
						cn(
							'relative flex items-center px-4 py-2 text-sm font-medium rounded-2xl transition-colors duration-300 group',
							!isActive &&
								'hover:bg-background/50 dark:hover:bg-neutral-600/50',
						)
					}
				>
					{({ isActive }) => (
						<>
							{isActive && (
								<m.div
									layoutId='active-nav-pill'
									className='absolute inset-0 bg-linear-to-r from-cyan-500 to-green-400 rounded-2xl shadow-md'
									transition={{ type: 'spring', stiffness: 300, damping: 30 }}
								/>
							)}

							<div className='relative z-10 flex items-center gap-2 pointer-events-none'>
								<item.icon
									className={cn(
										'h-4 w-4 transition-colors',
										isActive
											? 'text-white'
											: 'text-muted-foreground group-hover:text-foreground',
									)}
								/>
								<span
									className={cn(
										'transition-colors',
										isActive
											? 'text-white'
											: 'text-muted-foreground group-hover:text-foreground',
									)}
								>
									{item.label}
								</span>
							</div>
						</>
					)}
				</NavLink>
			))}
		</div>
	);
};
