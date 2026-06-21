// src/lib/hooks/useDarkMode.ts
import { useEffect, useState } from 'react';

const THEME_KEY = 'theme';

function getInitialDark() {
	// lee de localStorage, o usa preferencia del sistema
	if (typeof window !== 'undefined') {
		const value = localStorage.getItem(THEME_KEY);
		if (value === 'dark') return true;
		if (value === 'light') return false;
		// Preferencia del sistema
		return window.matchMedia('(prefers-color-scheme: dark)').matches;
	}
	return false;
}

export default function useDarkMode() {
	const [dark, setDark] = useState(getInitialDark);

	useEffect(() => {
		if (dark) {
			document.documentElement.classList.add('dark');
			localStorage.setItem(THEME_KEY, 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem(THEME_KEY, 'light');
		}
	}, [dark]);

	const toggle = () => setDark((d) => !d);

	return [dark, toggle] as const;
}
