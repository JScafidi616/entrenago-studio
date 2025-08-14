'use client';
import { Button } from '@/components/ui/button';
import useDarkMode from '@/lib/hooks/useDarkMode.ts';
import { cn } from '@/lib/utils/utils.ts';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
	const [isDark, toggleDark] = useDarkMode();

	return (
		<>
			<Button
				variant='ghost'
				size='icon'
				className={cn(
					'hover:bg-accent h-10 w-10 rounded-2xl bg-muted/30 dark:bg-neutral-700/30',
				)}
				onClick={toggleDark}
				aria-label='Cambiar tema'
			>
				{isDark ? (
					<Sun
						className={cn(
							'h-[1.2rem] w-[1.2rem] scale-100 transition-all text-gray-800 dark:text-white',
						)}
					/>
				) : (
					<Moon
						className={cn(
							'h-[1.2rem] w-[1.2rem] scale-100 transition-all text-gray-800 dark:text-white',
						)}
					/>
				)}
			</Button>
		</>
	);
}
