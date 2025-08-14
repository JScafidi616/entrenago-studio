'use client';
import useDarkMode from '@/lib/hooks/useDarkMode.ts';
import { cn } from '@/lib/utils/utils.ts';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
	const [isDark, toggleDark] = useDarkMode();

	return (
		<>
			<button
				type='button'
				className={cn(
					'hover:bg-accent  p-2 rounded-full bg-muted/30 dark:bg-neutral-700/30 dark:hover:bg-neutral-700/50 transition-colors',
				)}
				onClick={toggleDark}
				aria-label='Cambiar tema'
			>
				{isDark ? (
					<Sun className='h-[1.2rem] w-[1.2rem] scale-100 transition-all bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white z-51' />
				) : (
					<Moon className='h-[1.2rem] w-[1.2rem] scale-100 transition-all bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white z-51' />
				)}
			</button>
		</>
	);
}
