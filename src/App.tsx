// src/App.tsx
import { RouterProvider } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { router } from './router/routes';
import { Toaster } from 'sonner';

const getInitialTheme = (): 'light' | 'dark' => {
	if (typeof document !== 'undefined' && document.documentElement.classList.contains('dark')) {
		return 'dark';
	}
	return 'light';
};

export const App = () => {
	const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);

	useEffect(() => {
		// 3. Only observe for FUTURE changes
		const observer = new MutationObserver(() => {
			const currentDark = document.documentElement.classList.contains('dark');
			setTheme(currentDark ? 'dark' : 'light');
		});

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class'],
		});

		return () => observer.disconnect();
	}, []);

	return (
		<>
			{/* Toaster component */}
			<Toaster position="bottom-center" richColors theme={theme} />
			{/* Routing component */}
			<RouterProvider router={router} />
		</>
	);
};
