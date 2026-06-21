// src/App.tsx
import { RouterProvider } from 'react-router-dom';
import { router } from './router/routes';
// import { Toaster } from 'react-hot-toast';

export const App = () => {
	return (
		<>
			{/* Global UI elements that persist across all routes */}
			{/* <Toaster position="top-right" /> */}

			<RouterProvider router={router} />
		</>
	);
};
