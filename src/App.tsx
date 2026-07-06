// src/App.tsx
import { RouterProvider } from 'react-router-dom';
import { router } from './router/routes';
import { Toaster } from 'sonner';

export const App = () => {
	return (
		<>
			{/* Global UI elements that persist across all routes */}
			{/* Toaster component */}
			<Toaster position="bottom-center" richColors />
			{/* Routing component */}
			<RouterProvider router={router} />
		</>
	);
};
