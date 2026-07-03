'use client';

import { appNavItems } from '@/features/navigation/constants/constantNav';
import { cn } from '@/utils/utils';

interface BottomNavProps {
	currentSection: string;
	handleNavigation: (page: string) => void;
}

export const NavBottomMobile = ({ currentSection, handleNavigation }: BottomNavProps) => {
	return (
		<div className="fixed right-4 bottom-4 left-4 z-50 md:hidden">
			<div
				className={cn(
					'bg-background/95 supports-backdrop-filter:bg-background/60 border-border/50 rounded-2xl border shadow-lg backdrop-blur dark:bg-neutral-800/95 dark:supports-backdrop-filter:bg-neutral-800/60',
				)}
			>
				<div className="flex items-center justify-around px-2 py-3">
					{appNavItems.map((item) => (
						<button
							key={item.id}
							onClick={() => handleNavigation(item.id)}
							className={cn(
								`flex min-w-0 flex-col items-center space-y-1 rounded-xl px-4 py-2 transition-all duration-200 ${
									currentSection === item.id.replace(/^\/+/, '')
										? 'bg-linear-to-r from-cyan-500 to-green-400 text-white shadow-md'
										: 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
								}`,
							)}
						>
							<item.icon className="h-5 w-5" />
							<span className="truncate text-xs font-medium">{item.label}</span>
						</button>
					))}
				</div>
			</div>
		</div>
	);
};
