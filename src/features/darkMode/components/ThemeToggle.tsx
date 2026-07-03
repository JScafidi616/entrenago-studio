'use client';
import { Button } from '@/components/ui/button';
import useDarkMode from '@/features/darkMode/hooks/useDarkMode';
import { cn } from '@/utils/utils';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
	const [isDark, toggleDark] = useDarkMode();

	return (
		<>
			<Button
				variant="ghost"
				size="icon"
				className={cn(
					'hover:bg-accent bg-muted/30 h-10 w-10 cursor-pointer rounded-2xl dark:bg-neutral-700/30',
				)}
				onClick={toggleDark}
				aria-label="Cambiar tema"
			>
				{isDark ? (
					<Sun
						className={cn(
							'h-[1.2rem] w-[1.2rem] scale-100 text-gray-800 transition-all dark:text-white',
						)}
					/>
				) : (
					<Moon
						className={cn(
							'h-[1.2rem] w-[1.2rem] scale-100 text-gray-800 transition-all dark:text-white',
						)}
					/>
				)}
			</Button>
		</>
	);
}
